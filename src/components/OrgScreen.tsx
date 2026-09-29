// SCREEN — Organizations (အဖွဲ့အစည်း) management.
// Reached from Profile. One screen with internal section state:
//   (a) my orgs + active-tenant switcher (personal "ကိုယ်ပိုင်" + orgs)
//   (b) create org
//   (c) per-org detail: members (roles), invites (pending list, create, revoke)
// Myanmar-first copy, lucide icons, no emoji.

import { useCallback, useEffect, useState } from 'react';
import {
  Building2,
  Check,
  ChevronRight,
  Copy,
  Link2,
  Loader2,
  Plus,
  Trash2,
  UserMinus,
  UserPlus,
  Users,
} from 'lucide-react';
import type { GoFn, NavParams } from '../routes';
import { PillButton, Screen, TopBar } from './ui';
import { getSession } from '../lib/auth';
import { resyncForTenant } from '../lib/cloudSync';
import {
  canManageMembers,
  createInvite,
  createOrganization,
  describeTenant,
  getActiveTenant,
  inviteLink,
  listInvites,
  listMembers,
  listMyMemberships,
  listMyOrgs,
  removeMember,
  revokeInvite,
  setActiveTenant,
  setMemberRole,
  type ActiveTenant,
  type Membership,
  type Organization,
  type OrgInvite,
  type OrgRole,
} from '../lib/tenant';
import '../screens/w4.css';

const ROLE_LABEL: Record<OrgRole, string> = {
  owner: 'ပိုင်ရှင်',
  admin: 'စီမံခန့်ခွဲသူ',
  member: 'အဖွဲ့ဝင်',
};

const ROLE_ORDER: OrgRole[] = ['owner', 'admin', 'member'];

function errMsg(err: unknown): string {
  return err instanceof Error ? err.message : 'တစ်ခုခု မှားယွင်းနေပါတယ်။ ထပ်စမ်းကြည့်ပါ။';
}

interface OrgDetail {
  members: Membership[];
  invites: OrgInvite[];
  myRole: OrgRole | null;
}

export default function OrgScreen({ go, params }: { go: GoFn; params?: NavParams }) {
  void params;
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tenant, setTenant] = useState<ActiveTenant>(() => getActiveTenant());
  const [switching, setSwitching] = useState<string | null>(null); // tenant label
  const [switchNote, setSwitchNote] = useState<string | null>(null);

  // create-org
  const [createName, setCreateName] = useState('');
  const [creating, setCreating] = useState(false);

  // detail section
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);
  const [detail, setDetail] = useState<OrgDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  // invite form
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<OrgRole>('member');
  const [inviting, setInviting] = useState(false);
  const [newInviteLink, setNewInviteLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // remove-member confirm
  const [confirmRemoveId, setConfirmRemoveId] = useState<string | null>(null);

  const myRoleFor = useCallback(
    (orgId: string): OrgRole | null =>
      memberships.find((m) => m.org_id === orgId)?.role ?? null,
    [memberships],
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [o, m] = await Promise.all([listMyOrgs(), listMyMemberships()]);
      setOrgs(o);
      setMemberships(m);
    } catch (err) {
      setError(errMsg(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const loadDetail = useCallback(async (orgId: string) => {
    setDetailLoading(true);
    setDetailError(null);
    try {
      const [members, invites] = await Promise.all([listMembers(orgId), listInvites(orgId)]);
      const mine = members.find((m) => m.user_id === getSession()?.user?.id);
      setDetail({ members, invites, myRole: mine?.role ?? null });
    } catch (err) {
      setDetailError(errMsg(err));
      setDetail(null);
    } finally {
      setDetailLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedOrgId) void loadDetail(selectedOrgId);
    else setDetail(null);
  }, [selectedOrgId, loadDetail]);

  // --- tenant switching --------------------------------------------------
  // resyncForTenant flushes pending ops, then REPLACES the local cache with
  // the new tenant's cloud data (never merges — the cache held the previous
  // tenant's rows). No page reload — ever.
  async function switchTenant(t: ActiveTenant, label: string) {
    if (switching) return;
    setSwitching(label);
    setSwitchNote('ပြန်လည်စတင်နေပါတယ်…');
    setActiveTenant(t);
    setTenant(t);
    try {
      await resyncForTenant();
    } catch (err) {
      setError(errMsg(err));
    } finally {
      setSwitching(null);
      setSwitchNote(null);
    }
  }

  // --- create org ---------------------------------------------------------
  async function handleCreate() {
    const name = createName.trim();
    if (!name || creating) return;
    setCreating(true);
    setError(null);
    try {
      const org = await createOrganization(name);
      setCreateName('');
      await load();
      setSelectedOrgId(org.id);
    } catch (err) {
      setError(errMsg(err));
    } finally {
      setCreating(false);
    }
  }

  // --- invites ------------------------------------------------------------
  async function handleInvite(orgId: string) {
    const email = inviteEmail.trim();
    if (!email || inviting) return;
    setInviting(true);
    setDetailError(null);
    setNewInviteLink(null);
    try {
      const invite = await createInvite(orgId, email, inviteRole);
      setNewInviteLink(inviteLink(invite.token));
      setInviteEmail('');
      void loadDetail(orgId);
    } catch (err) {
      setDetailError(errMsg(err));
    } finally {
      setInviting(false);
    }
  }

  async function handleRevoke(orgId: string, inviteId: string) {
    try {
      await revokeInvite(inviteId);
      void loadDetail(orgId);
    } catch (err) {
      setDetailError(errMsg(err));
    }
  }

  async function copyLink(link: string) {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setDetailError('လင့်ခ် ကူးယူမရပါ။ ကိုယ်တိုင် ရွေးပြီး ကူးယူပါ။');
    }
  }

  // --- member management ---------------------------------------------------
  async function handleRoleChange(orgId: string, userId: string, role: OrgRole) {
    try {
      await setMemberRole(orgId, userId, role);
      void loadDetail(orgId);
      void load();
    } catch (err) {
      setDetailError(errMsg(err));
    }
  }

  async function handleRemove(orgId: string, userId: string) {
    setConfirmRemoveId(null);
    try {
      await removeMember(orgId, userId);
      void loadDetail(orgId);
      void load();
    } catch (err) {
      setDetailError(errMsg(err));
    }
  }

  const isPersonalActive = tenant.kind === 'personal';
  const canManage = detail?.myRole ? canManageMembers(detail.myRole) : false;
  const meId = getSession()?.user?.id ?? null;

  return (
    <Screen>
      <TopBar variant="back" title="အဖွဲ့အစည်းများ" onBack={() => go('back')} />
      <div className="w4-wrap">
        {error && (
          <div className="w4-card" role="alert">
            <div className="w4-err">{error}</div>
            <PillButton color="orange" onClick={() => void load()}>
              ထပ်စမ်းမယ်
            </PillButton>
          </div>
        )}

        {loading ? (
          <div className="w4-card">
            <Loader2 className="spin" size={20} /> လုပ်ဆောင်နေပါတယ်…
          </div>
        ) : (
          <>
            {/* (a) active tenant switcher */}
            <div className="w4-card">
              <div className="w4-card-title">သင်ယူနေသည့် နေရာ</div>
              <div className="w4-tenant-list">
                <button
                  type="button"
                  className={`w4-tenant-row${isPersonalActive ? ' active' : ''}`}
                  onClick={() => void switchTenant({ kind: 'personal' }, 'ကိုယ်ပိုင်')}
                  disabled={switching !== null}
                >
                  <span className="w4-tenant-name">ကိုယ်ပိုင်</span>
                  {isPersonalActive && <Check size={18} />}
                </button>
                {orgs.map((o) => {
                  const active = tenant.kind === 'org' && tenant.orgId === o.id;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      className={`w4-tenant-row${active ? ' active' : ''}`}
                      onClick={() => void switchTenant({ kind: 'org', orgId: o.id }, o.name)}
                      disabled={switching !== null}
                    >
                      <span className="w4-tenant-name">
                        <Building2 size={16} aria-hidden="true" /> {o.name}
                      </span>
                      {active && <Check size={18} />}
                    </button>
                  );
                })}
              </div>
              {switchNote && <p className="w4-hint">{switchNote}</p>}
              <p className="w4-hint">လက်ရှိ: {describeTenant(tenant, orgs)}</p>
            </div>

            {/* (b) create org */}
            <div className="w4-card">
              <div className="w4-card-title">
                <Plus size={16} aria-hidden="true" /> အဖွဲ့အစည်း အသစ်
              </div>
              <label className="w4-label" htmlFor="org-name">
                အမည်
              </label>
              <input
                id="org-name"
                className="w4-input"
                value={createName}
                onChange={(e) => setCreateName(e.target.value)}
                placeholder="ဥပမာ — မိသားစု အင်္ဂလိပ်စာ"
                maxLength={80}
              />
              <PillButton color="green" onClick={() => void handleCreate()} disabled={creating || !createName.trim()}>
                {creating ? 'ဖန်တီးနေပါတယ်…' : 'ဖန်တီးမယ်'}
              </PillButton>
            </div>

            {/* (c) org list → detail */}
            <div className="w4-card">
              <div className="w4-card-title">
                <Users size={16} aria-hidden="true" /> ကျွန်ုပ်၏ အဖွဲ့အစည်းများ ({orgs.length})
              </div>
              {orgs.length === 0 ? (
                <p className="w4-hint">အဖွဲ့အစည်း မရှိသေးပါ။ အပေါ်ကနေ အသစ်ဖန်တီးနိုင်ပါတယ်။</p>
              ) : (
                <div className="w4-org-list">
                  {orgs.map((o) => {
                    const role = myRoleFor(o.id);
                    const open = selectedOrgId === o.id;
                    return (
                      <div key={o.id} className="w4-org-item">
                        <button
                          type="button"
                          className="w4-org-row"
                          onClick={() => setSelectedOrgId(open ? null : o.id)}
                        >
                          <span className="w4-tenant-name">{o.name}</span>
                          {role && <span className="w4-chip">{ROLE_LABEL[role]}</span>}
                          <ChevronRight size={18} className={open ? 'rot' : ''} />
                        </button>

                        {open && (
                          <div className="w4-org-detail">
                            {detailLoading && (
                              <p className="w4-hint">
                                <Loader2 className="spin" size={16} /> ရယူနေပါတယ်…
                              </p>
                            )}
                            {detailError && <div className="w4-err" role="alert">{detailError}</div>}
                            {detail && !detailLoading && (
                              <>
                                {/* members */}
                                <div className="w4-sub-title">အသင်းဝင်များ ({detail.members.length})</div>
                                {detail.members.map((m) => {
                                  const isMe = meId !== null && m.user_id === meId;
                                  return (
                                    <div key={m.user_id} className="w4-member-row">
                                      <span className="w4-member-id" title={m.user_id}>
                                        {isMe ? 'ကျွန်ုပ်' : m.user_id.slice(0, 8) + '…'}
                                      </span>
                                      {canManage && !isMe ? (
                                        <select
                                          className="w4-select"
                                          value={m.role}
                                          onChange={(e) =>
                                            void handleRoleChange(o.id, m.user_id, e.target.value as OrgRole)
                                          }
                                          aria-label="အခန်းကဏ္ဍ ပြောင်းရန်"
                                        >
                                          {ROLE_ORDER.map((r) => (
                                            <option key={r} value={r}>
                                              {ROLE_LABEL[r]}
                                            </option>
                                          ))}
                                        </select>
                                      ) : (
                                        <span className="w4-chip">{ROLE_LABEL[m.role]}</span>
                                      )}
                                      {canManage && !isMe && (
                                        confirmRemoveId === m.user_id ? (
                                          <span className="w4-confirm-inline">
                                            <button
                                              type="button"
                                              className="w4-danger-btn"
                                              onClick={() => void handleRemove(o.id, m.user_id)}
                                            >
                                              သေချာလား
                                            </button>
                                            <button
                                              type="button"
                                              className="w4-ghost-btn"
                                              onClick={() => setConfirmRemoveId(null)}
                                            >
                                              မလုပ်တော့ဘူး
                                            </button>
                                          </span>
                                        ) : (
                                          <button
                                            type="button"
                                            className="w4-icon-btn"
                                            onClick={() => setConfirmRemoveId(m.user_id)}
                                            aria-label="အဖွဲ့ဝင် ထုတ်ပစ်ရန်"
                                          >
                                            <UserMinus size={16} />
                                          </button>
                                        )
                                      )}
                                    </div>
                                  );
                                })}

                                {/* invites */}
                                {canManage && (
                                  <>
                                    <div className="w4-sub-title">
                                      <UserPlus size={14} aria-hidden="true" /> ဖိတ်စာများ
                                    </div>
                                    {detail.invites.length > 0 && (
                                      <div className="w4-invite-list">
                                        {detail.invites.map((inv) => (
                                          <div key={inv.id} className="w4-invite-row">
                                            <span className="w4-member-id">{inv.email}</span>
                                            <span className="w4-chip">{ROLE_LABEL[inv.role]}</span>
                                            <button
                                              type="button"
                                              className="w4-icon-btn"
                                              onClick={() => void handleRevoke(o.id, inv.id)}
                                              aria-label="ဖိတ်စာ ပယ်ဖျက်ရန်"
                                            >
                                              <Trash2 size={16} />
                                            </button>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                    <label className="w4-label" htmlFor={`invite-email-${o.id}`}>
                                      ဖိတ်မည့် အီးမေးလ်
                                    </label>
                                    <input
                                      id={`invite-email-${o.id}`}
                                      className="w4-input"
                                      type="email"
                                      value={inviteEmail}
                                      onChange={(e) => setInviteEmail(e.target.value)}
                                      placeholder="name@example.com"
                                    />
                                    <div className="w4-row">
                                      <select
                                        className="w4-select"
                                        value={inviteRole}
                                        onChange={(e) => setInviteRole(e.target.value as OrgRole)}
                                        aria-label="ဖိတ်စာ အခန်းကဏ္ဍ"
                                      >
                                        {ROLE_ORDER.map((r) => (
                                          <option key={r} value={r}>
                                            {ROLE_LABEL[r]}
                                          </option>
                                        ))}
                                      </select>
                                      <PillButton
                                        color="blue"
                                        onClick={() => void handleInvite(o.id)}
                                        disabled={inviting || !inviteEmail.trim()}
                                      >
                                        {inviting ? 'ဖိတ်နေပါတယ်…' : 'ဖိတ်မယ်'}
                                      </PillButton>
                                    </div>
                                    {newInviteLink && (
                                      <div className="w4-invite-link">
                                        <Link2 size={14} aria-hidden="true" />
                                        <span className="w4-link-text">{newInviteLink}</span>
                                        <button
                                          type="button"
                                          className="w4-icon-btn"
                                          onClick={() => void copyLink(newInviteLink)}
                                          aria-label="လင့်ခ် ကူးယူရန်"
                                        >
                                          {copied ? <Check size={16} /> : <Copy size={16} />}
                                        </button>
                                      </div>
                                    )}
                                  </>
                                )}
                                {!canManage && (
                                  <p className="w4-hint">
                                    သင့်အခန်းကဏ္ဍ: {detail.myRole ? ROLE_LABEL[detail.myRole] : '—'} —
                                    အသင်းဝင်များကို စီမံခန့်ခွဲခွင့် မရှိပါ။
                                  </p>
                                )}
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
        <div className="tab-pad-end" aria-hidden="true" />
      </div>
    </Screen>
  );
}
