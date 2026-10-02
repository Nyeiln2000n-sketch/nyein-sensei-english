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
import { useLang, t as tStatic, tNum } from '../lib/i18n';
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

const ROLE_ORDER: OrgRole[] = ['owner', 'admin', 'member'];

function errMsg(err: unknown): string {
  return err instanceof Error ? err.message : tStatic('org.something');
}

interface OrgDetail {
  members: Membership[];
  invites: OrgInvite[];
  myRole: OrgRole | null;
}

export default function OrgScreen({ go, params }: { go: GoFn; params?: NavParams }) {
  void params;
  const { t } = useLang();
  // Role labels via i18n so they follow the active language (Thai is extra).
  const ROLE_LABEL: Record<OrgRole, string> = {
    owner: t('org.owner'),
    admin: t('org.admin'),
    member: t('org.member'),
  };
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
  async function switchTenant(tenant: ActiveTenant, label: string) {
    if (switching) return;
    setSwitching(label);
    setSwitchNote(t('org.restarting'));
    setActiveTenant(tenant);
    setTenant(tenant);
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
      setDetailError(t('org.link_yourself_choose_and'));
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
      <TopBar variant="back" title={t('org.organizations')} onBack={() => go('back')} />
      <div className="w4-wrap">
        {error && (
          <div className="w4-card" role="alert">
            <div className="w4-err">{error}</div>
            <PillButton color="orange" onClick={() => void load()}>
              {t('org.retry')}
            </PillButton>
          </div>
        )}

        {loading ? (
          <div className="w4-card">
            <Loader2 className="spin" size={20} /> {t('org.processing')}
          </div>
        ) : (
          <>
            {/* (a) active tenant switcher */}
            <div className="w4-card">
              <div className="w4-card-title">{t('org.learning_space')}</div>
              <div className="w4-tenant-list">
                <button
                  type="button"
                  className={`w4-tenant-row${isPersonalActive ? ' active' : ''}`}
                  onClick={() => void switchTenant({ kind: 'personal' }, t('org.personal'))}
                  disabled={switching !== null}
                >
                  <span className="w4-tenant-name">{t('org.personal')}</span>
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
              <p className="w4-hint">{t('org.current_tenant_hint', { tenant: describeTenant(tenant, orgs) })}</p>
            </div>

            {/* (b) create org */}
            <div className="w4-card">
              <div className="w4-card-title">
                <Plus size={16} aria-hidden="true" /> {t('org.new_organization')}
              </div>
              <label className="w4-label" htmlFor="org-name">
                {t('org.name')}
              </label>
              <input
                id="org-name"
                className="w4-input"
                value={createName}
                onChange={(e) => setCreateName(e.target.value)}
                placeholder={t('org.example_english')}
                maxLength={80}
              />
              <PillButton color="green" onClick={() => void handleCreate()} disabled={creating || !createName.trim()}>
                {creating ? t('org.creating') : t('org.create')}
              </PillButton>
            </div>

            {/* (c) org list → detail */}
            <div className="w4-card">
              <div className="w4-card-title">
                <Users size={16} aria-hidden="true" />{' '}
                {t('org.my_organizations_count', { count: tNum(orgs.length) })}
              </div>
              {orgs.length === 0 ? (
                <p className="w4-hint">{t('org.organization_from_above')}</p>
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
                                <Loader2 className="spin" size={16} /> {t('org.fetching')}
                              </p>
                            )}
                            {detailError && <div className="w4-err" role="alert">{detailError}</div>}
                            {detail && !detailLoading && (
                              <>
                                {/* members */}
                                <div className="w4-sub-title">
                                  {t('org.members_count', { count: tNum(detail.members.length) })}
                                </div>
                                {detail.members.map((m) => {
                                  const isMe = meId !== null && m.user_id === meId;
                                  return (
                                    <div key={m.user_id} className="w4-member-row">
                                      <span className="w4-member-id" title={m.user_id}>
                                        {isMe ? t('org.me') : m.user_id.slice(0, 8) + '…'}
                                      </span>
                                      {canManage && !isMe ? (
                                        <select
                                          className="w4-select"
                                          value={m.role}
                                          onChange={(e) =>
                                            void handleRoleChange(o.id, m.user_id, e.target.value as OrgRole)
                                          }
                                          aria-label={t('org.role_change')}
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
                                              {t('org.are_you_sure')}
                                            </button>
                                            <button
                                              type="button"
                                              className="w4-ghost-btn"
                                              onClick={() => setConfirmRemoveId(null)}
                                            >
                                              {t('org.cancel')}
                                            </button>
                                          </span>
                                        ) : (
                                          <button
                                            type="button"
                                            className="w4-icon-btn"
                                            onClick={() => setConfirmRemoveId(m.user_id)}
                                            aria-label={t('org.member_remove')}
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
                                      <UserPlus size={14} aria-hidden="true" /> {t('org.invitations')}
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
                                              aria-label={t('org.invitation_cancel')}
                                            >
                                              <Trash2 size={16} />
                                            </button>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                    <label className="w4-label" htmlFor={`invite-email-${o.id}`}>
                                      {t('org.email')}
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
                                        aria-label={t('org.invitation_role')}
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
                                        {inviting ? t('org.inviting') : t('org.invite')}
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
                                          aria-label={t('org.link_copy')}
                                        >
                                          {copied ? <Check size={16} /> : <Copy size={16} />}
                                        </button>
                                      </div>
                                    )}
                                  </>
                                )}
                                {!canManage && (
                                  <p className="w4-hint">
                                    {t('org.var', { role: detail.myRole ? ROLE_LABEL[detail.myRole] : '—' })}{' '}
                                    {t('org.manage_permission')}
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
