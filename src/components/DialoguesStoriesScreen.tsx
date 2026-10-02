// DialoguesStoriesScreen (E2-005) — dedicated browser for all dialogues and
// graded stories (the existing src/data/* sets plus the FASE 14 sets).
//
// Myanmar-first: tabs "စကားပြောများ" (dialogues) / "ဇာတ်လမ်းများ"
// (stories), search box, CEFR filter, topic filter (dialogues). Cards use
// PhraseImage: a generated illustration when the title phrase is mapped in
// phrase-images.json, otherwise a brand-palette tile with the initial
// letter (no emoji — project rule).
//
// Dialogue detail: speaker-tagged lines, English tap-to-hear per line,
// Myanmar translation. Story detail: numbered paragraphs, per-paragraph
// tap-to-hear + Myanmar. Back navigation is internal to this screen; the
// top bar goes back to the app only from the list view.
//
// AUDIO_CONTRACT: speak() fires synchronously inside tap handlers only.
// stopSpeaking() on unmount, tab switch, and navigation.
import { useEffect, useMemo, useState } from 'react';
import type * as React from 'react';
import { ArrowLeft, Volume2, Search } from 'lucide-react';
import type { GoFn, NavParams } from '../routes';
import type { CEFR, Dialogue, Story, TopicId } from '../types';
import { topics, loadDialogues, loadStories } from '../data';
import { useCorpus } from '../data/useCorpus';
import { SkeletonList } from './Skeleton';
import { difficultyToCEFR } from '../types';
import { useLang, displayLang, tNum } from '../lib/i18n';
import { speak, stopSpeaking } from '../lib/audio';
import { useWindowing } from '../lib/useWindowing';
import PhraseImage from './PhraseImage';
import {
  Screen, TopBar, Card, W3ErrorBoundary, C, FONT,
} from './w3-shared';

const LEVELS = ['all', 'A1', 'A2', 'B1', 'B2'] as const;
type LevelFilter = (typeof LEVELS)[number];

function levelBadgeStyle(cefr: CEFR): React.CSSProperties {
  switch (cefr) {
    case 'A1':
      return { background: C.green, color: C.greenText };
    case 'A2':
      return { background: C.blue, color: '#fff' };
    case 'B1':
      return { background: C.orange, color: '#fff' };
    case 'B2':
    default:
      return { background: C.red, color: '#fff' };
  }
}

function dialogueCEFR(d: Dialogue): CEFR {
  return difficultyToCEFR[d.level];
}


type Selection =
  | { kind: 'dialogue'; id: string }
  | { kind: 'story'; id: string }
  | null;

export default function DialoguesStoriesScreen({
  go,
  params,
}: {
  go: GoFn;
  params?: NavParams;
}) {
  // FASE 15 — corpus loads lazily (dialogues + stories are on-demand chunks).
  const { t, lang } = useLang();
  const allDialogues = useCorpus(loadDialogues) ?? [];
  const allStories = useCorpus(loadStories) ?? [];
  const corpusReady = allDialogues.length > 0 && allStories.length > 0;

  const [tab, setTab] = useState<'dialogues' | 'stories'>('dialogues');
  const [selected, setSelected] = useState<Selection>(null);
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState<LevelFilter>('all');
  const [topicFilter, setTopicFilter] = useState<'all' | TopicId>(() => {
    const t = params?.topic as TopicId | undefined;
    return t && topics.some((x) => x.id === t) ? t : 'all';
  });

  // Stop audio cleanly on unmount.
  useEffect(() => () => stopSpeaking(), []);
  // Stop audio when leaving the screen's detail views / switching tabs.
  useEffect(() => {
    stopSpeaking();
  }, [tab, selected]);

  const filteredDialogues = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allDialogues.filter((d) => {
      if (level !== 'all' && dialogueCEFR(d) !== level) return false;
      if (topicFilter !== 'all' && d.topic !== topicFilter) return false;
      if (!q) return true;
      return (
        d.titleMy.includes(query.trim()) ||
        d.titleEn.toLowerCase().includes(q) ||
        (d.titleTh ?? '').includes(query.trim()) ||
        d.situationMy.includes(query.trim()) ||
        (d.situationTh ?? '').includes(query.trim()) ||
        d.turns.some(
          (t) =>
            t.speaker.includes(query.trim()) ||
            (t.speakerTh ?? '').includes(query.trim()) ||
            t.en.toLowerCase().includes(q) ||
            (t.th ?? '').includes(query.trim()),
        )
      );
    });
  }, [allDialogues, query, level, topicFilter]);

  const filteredStories = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allStories.filter((s) => {
      if (level !== 'all' && s.level !== level) return false;
      if (!q) return true;
      return (
        s.titleMy.includes(query.trim()) ||
        s.titleEn.toLowerCase().includes(q) ||
        (s.titleTh ?? '').includes(query.trim()) ||
        s.paragraphs.some((p) => p.en.toLowerCase().includes(q) || (p.th ?? '').includes(query.trim()))
      );
    });
  }, [allStories, query, level]);

  const { visible: visibleDialogues, sentinelRef: dlgSentinel } = useWindowing(
    filteredDialogues,
    40,
  );
  const { visible: visibleStories, sentinelRef: storySentinel } = useWindowing(
    filteredStories,
    20,
  );

  const selectedDialogue = useMemo(
    () =>
      selected?.kind === 'dialogue'
        ? allDialogues.find((d) => d.id === selected.id)
        : undefined,
    [selected, allDialogues],
  );
  const selectedStory = useMemo(
    () =>
      selected?.kind === 'story'
        ? allStories.find((s) => s.id === selected.id)
        : undefined,
    [selected, allStories],
  );

  const topicMeta = (topic: TopicId) => topics.find((t) => t.id === topic);

  const handleTopBack = () => {
    if (selected) setSelected(null);
    else go('back');
  };

  if (!corpusReady) {
    return (
      <Screen>
        <TopBar left={<span />} center={<div />} right={<span />} />
        <SkeletonList />
      </Screen>
    );
  }

  return (
    <Screen>
      <W3ErrorBoundary>
        <TopBar
          left={
            <button
              type="button"
              onClick={handleTopBack}
              aria-label={t('dialogues.back')}
              style={{
                width: 44, height: 44, borderRadius: '50%', border: 'none',
                background: C.white, color: C.text, display: 'flex',
                alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
              }}
            >
              <ArrowLeft size={20} />
            </button>
          }
          center={
            <span style={{ fontSize: 18, fontWeight: 800, color: C.title }}>
              {selected ? t('dialogues.read_detail') : t('dashboard.dialogue')}
            </span>
          }
        />

        {/* ---------- detail views ---------- */}
        {selectedDialogue && (
          <DialogueDetail
            dialogue={selectedDialogue}
            onBack={() => setSelected(null)}
          />
        )}
        {selectedStory && (
          <StoryDetail story={selectedStory} onBack={() => setSelected(null)} />
        )}

        {/* ---------- list views ---------- */}
        {!selected && (
          <>
            {/* tab toggle */}
            <div
              style={{
                display: 'flex',
                background: C.white,
                borderRadius: 999,
                padding: 4,
                marginBottom: 12,
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              }}
              role="tablist"
            >
              {(
                [
                  ['dialogues', t('dialogues.dialogues')],
                  ['stories', t('dialogues.stories')],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={tab === key}
                  onClick={() => setTab(key)}
                  style={{
                    flex: 1,
                    minWidth: 0 /* FIX-responsive 2026-09-30: pestañas que no se salgan del borde */,
                    border: 'none',
                    borderRadius: 999,
                    padding: '12px 8px',
                    fontFamily: FONT,
                    fontWeight: 800,
                    fontSize: 16,
                    cursor: 'pointer',
                    minHeight: 48,
                    background: tab === key ? C.orange : 'transparent',
                    color: tab === key ? '#fff' : C.text,
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* search */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                minWidth: 0 /* FIX-responsive 2026-09-30 */,
                background: C.white,
                borderRadius: 999,
                padding: '0 16px',
                marginBottom: 10,
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              }}
            >
              <Search size={18} color="#C9BBA0" aria-hidden="true" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={tab === 'dialogues' ? t('dialogues.dialogue_to_search') : t('dialogues.story_to_search')}
                style={{
                  flex: 1,
                  minWidth: 0 /* FIX-responsive 2026-09-30: el input nunca impone su ancho */,
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  padding: '12px 0',
                  fontFamily: FONT,
                  /* 16px minimum: iOS Safari auto-zooms on smaller inputs. */
                  fontSize: 16,
                  color: C.title,
                  minHeight: 44,
                }}
              />
            </div>

            {/* CEFR level filter — FIX-responsive 2026-09-30: píldoras
                compactas para que las 5 (all+A1+A2+B1+B2) quepan sin
                scroll ni corte a 360px. Antes B2 se cortaba en el borde
                derecho del iPhone 16. */}
            <div
              style={{
                display: 'flex',
                gap: 6,
                marginBottom: 10,
                overflowX: 'auto',
                paddingBottom: 2,
                scrollbarWidth: 'none',
              }}
              role="group"
              aria-label={t('dialogues.level_to_choose')}
            >
              {LEVELS.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLevel(l)}
                  aria-pressed={level === l}
                  style={{
                    border: 'none',
                    borderRadius: 999,
                    padding: '8px 13px',
                    fontFamily: FONT,
                    fontWeight: 800,
                    fontSize: 14,
                    cursor: 'pointer',
                    minHeight: 44,
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    background: level === l ? C.blue : C.white,
                    color: level === l ? '#fff' : C.text,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  }}
                >
                  {l === 'all' ? t('dialogues.all') : l}
                </button>
              ))}
            </div>

            {/* topic filter (dialogues only) — FIX-responsive 2026-09-30:
                fade en el borde derecho para que el scroll horizontal se vea
                intencional (antes parecía "cortado" en iPhone 16). */}
            {tab === 'dialogues' && (
              <div
                style={{
                  display: 'flex',
                  gap: 8,
                  marginBottom: 12,
                  overflowX: 'auto',
                  paddingBottom: 2,
                  scrollbarWidth: 'none',
                  WebkitMaskImage:
                    'linear-gradient(to right, #000 88%, transparent 100%)',
                  maskImage:
                    'linear-gradient(to right, #000 88%, transparent 100%)',
                }}
                role="group"
                aria-label={t('dialogues.topic_to_choose')}
              >
                <button
                  type="button"
                  onClick={() => setTopicFilter('all')}
                  aria-pressed={topicFilter === 'all'}
                  style={{
                    border: 'none',
                    borderRadius: 999,
                    padding: '10px 18px',
                    fontFamily: FONT,
                    fontWeight: 800,
                    fontSize: 15,
                    cursor: 'pointer',
                    minHeight: 44,
                    whiteSpace: 'nowrap',
                    background: topicFilter === 'all' ? C.green : C.white,
                    color: topicFilter === 'all' ? C.greenText : C.text,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  }}
                >
                  {t('dialogues.all')}
                </button>
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => setTopicFilter(topic.id)}
                    aria-pressed={topicFilter === topic.id}
                    style={{
                      border: 'none',
                      borderRadius: 999,
                      padding: '10px 18px',
                      fontFamily: FONT,
                      fontWeight: 800,
                      fontSize: 15,
                      cursor: 'pointer',
                      minHeight: 44,
                      whiteSpace: 'nowrap',
                      background: topicFilter === topic.id ? C.green : C.white,
                      color: topicFilter === topic.id ? C.greenText : C.text,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    }}
                  >
                    {topic.icon} {displayLang({ my: topic.nameMy, th: topic.nameTh }, lang)}
                  </button>
                ))}
              </div>
            )}

            {/* result count */}
            <div style={{ fontSize: 13, color: C.text, marginBottom: 8 }}>
              {tab === 'dialogues'
                ? t('dialogues.dialogue_count', { count: tNum(filteredDialogues.length) })
                : t('dialogues.story_count', { count: tNum(filteredStories.length) })}
            </div>

            {/* dialogue cards */}
            {tab === 'dialogues' &&
              (visibleDialogues.length === 0 ? (
                <Card style={{ textAlign: 'center', padding: 24 }}>
                  <div style={{ fontSize: 15, color: C.text }}>
                    {t('dialogues.dialogue_not_found')}
                  </div>
                </Card>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {visibleDialogues.map((d) => {
                    const meta = topicMeta(d.topic);
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setSelected({ kind: 'dialogue', id: d.id })}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 14,
                          background: C.white,
                          border: 'none',
                          borderRadius: 20,
                          padding: '12px 14px',
                          fontFamily: FONT,
                          textAlign: 'left',
                          cursor: 'pointer',
                          minHeight: 76,
                          width: '100%',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                        }}
                      >
                        <PhraseImage phrase={d.titleEn} size={56} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontWeight: 800,
                              fontSize: 16,
                              color: C.title,
                              lineHeight: 1.5,
                            }}
                          >
                            {displayLang({ my: d.titleMy, th: d.titleTh }, lang)}
                          </div>
                          <div style={{ fontSize: 13, color: C.text, marginTop: 2 }}>
                            {d.titleEn}
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 6,
                              marginTop: 6,
                              flexWrap: 'wrap',
                            }}
                          >
                            <span
                              style={{
                                fontSize: 12,
                                fontWeight: 800,
                                padding: '3px 10px',
                                borderRadius: 999,
                                ...levelBadgeStyle(dialogueCEFR(d)),
                              }}
                            >
                              {dialogueCEFR(d)}
                            </span>
                            {meta && (
                              <span style={{ fontSize: 12, color: C.text }}>
                                {meta.icon} {displayLang({ my: meta.nameMy, th: meta.nameTh }, lang)}
                              </span>
                            )}
                            <span style={{ fontSize: 12, color: C.text }}>
                              {t('dialogues.var_times', { count: tNum(d.turns.length) })}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                  <div
                    ref={dlgSentinel as unknown as React.Ref<HTMLDivElement>}
                    aria-hidden="true"
                  />
                </div>
              ))}

            {/* story cards */}
            {tab === 'stories' &&
              (visibleStories.length === 0 ? (
                <Card style={{ textAlign: 'center', padding: 24 }}>
                  <div style={{ fontSize: 15, color: C.text }}>
                    {t('dialogues.story_not_found')}
                  </div>
                </Card>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {visibleStories.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelected({ kind: 'story', id: s.id })}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        background: C.white,
                        border: 'none',
                        borderRadius: 20,
                        padding: '12px 14px',
                        fontFamily: FONT,
                        textAlign: 'left',
                        cursor: 'pointer',
                        minHeight: 76,
                        width: '100%',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      }}
                    >
                      <PhraseImage phrase={s.titleEn} size={56} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontWeight: 800,
                            fontSize: 16,
                            color: C.title,
                            lineHeight: 1.5,
                          }}
                        >
                          {displayLang({ my: s.titleMy, th: s.titleTh }, lang)}
                        </div>
                        <div style={{ fontSize: 13, color: C.text, marginTop: 2 }}>
                          {s.titleEn}
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            marginTop: 6,
                            flexWrap: 'wrap',
                          }}
                        >
                          <span
                            style={{
                              fontSize: 12,
                              fontWeight: 800,
                              padding: '3px 10px',
                              borderRadius: 999,
                              ...levelBadgeStyle(s.level),
                            }}
                          >
                            {s.level}
                          </span>
                          <span style={{ fontSize: 12, color: C.text }}>
                            {t('dialogues.var_paragraphs', { count: tNum(s.paragraphs.length) })}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                  <div
                    ref={storySentinel as unknown as React.Ref<HTMLDivElement>}
                    aria-hidden="true"
                  />
                </div>
              ))}
          </>
        )}
      </W3ErrorBoundary>
    </Screen>
  );
}

/* ---------- dialogue detail ---------- */

function DialogueDetail({
  dialogue,
  onBack,
}: {
  dialogue: Dialogue;
  onBack: () => void;
}) {
  const { t, lang } = useLang();
  return (
    <div>
      <Card style={{ marginBottom: 12 }}>
        <div style={{ fontWeight: 800, fontSize: 19, color: C.title, lineHeight: 1.5 }}>
          {displayLang({ my: dialogue.titleMy, th: dialogue.titleTh }, lang)}
        </div>
        <div style={{ fontSize: 14, color: C.text, marginTop: 4 }}>{dialogue.titleEn}</div>
        <div style={{ fontSize: 14, color: C.text, marginTop: 8, lineHeight: 1.6 }}>
          {displayLang({ my: dialogue.situationMy, th: dialogue.situationTh }, lang)}
        </div>
        <span
          style={{
            display: 'inline-block',
            fontSize: 12,
            fontWeight: 800,
            padding: '4px 12px',
            borderRadius: 999,
            marginTop: 10,
            ...levelBadgeStyle(dialogueCEFR(dialogue)),
          }}
        >
          {dialogueCEFR(dialogue)}
        </span>
      </Card>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {dialogue.turns.map((turn, i) => (
          <Card key={i} style={{ padding: '14px 16px' }}>
            <div
              style={{
                display: 'inline-block',
                background: '#FFF3D6',
                color: C.title,
                fontWeight: 800,
                fontSize: 14,
                padding: '4px 14px',
                borderRadius: 999,
                marginBottom: 8,
              }}
            >
              {turn.speaker}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 16,
                    color: C.title,
                    lineHeight: 1.6,
                  }}
                >
                  {turn.en}
                </div>
                <div style={{ fontSize: 14, color: C.text, marginTop: 4, lineHeight: 1.6 }}>
                  {displayLang(turn, lang)}
                </div>
              </div>
              {/* Tap-to-hear: speak() fires synchronously in the tap handler
                  (AUDIO_CONTRACT). 44px target. */}
              <button
                type="button"
                onClick={() => speak(turn.en)}
                aria-label={t('dialogues.listen_aria_with_english', { w: turn.en })}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  border: 'none',
                  background: '#E8F4FF',
                  color: C.blueDark,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                <Volume2 size={20} />
              </button>
            </div>
          </Card>
        ))}
      </div>

      <div style={{ marginTop: 16, marginBottom: 8 }}>
        <BackButton onBack={onBack} />
      </div>
    </div>
  );
}

/* ---------- story detail ---------- */

function StoryDetail({ story, onBack }: { story: Story; onBack: () => void }) {
  const { t, lang } = useLang();
  return (
    <div>
      <Card style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <PhraseImage phrase={story.titleEn} size={64} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{ fontWeight: 800, fontSize: 19, color: C.title, lineHeight: 1.5 }}
            >
              {displayLang({ my: story.titleMy, th: story.titleTh }, lang)}
            </div>
            <div style={{ fontSize: 14, color: C.text, marginTop: 4 }}>
              {story.titleEn}
            </div>
            <span
              style={{
                display: 'inline-block',
                fontSize: 12,
                fontWeight: 800,
                padding: '4px 12px',
                borderRadius: 999,
                marginTop: 8,
                ...levelBadgeStyle(story.level),
              }}
            >
              {story.level}
            </span>
          </div>
        </div>
      </Card>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {story.paragraphs.map((p, i) => (
          <Card key={i} style={{ padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 16,
                    color: C.title,
                    lineHeight: 1.7,
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      minWidth: 26,
                      textAlign: 'center',
                      background: '#FFF3D6',
                      color: C.title,
                      fontWeight: 800,
                      fontSize: 13,
                      borderRadius: 8,
                      padding: '2px 6px',
                      marginRight: 8,
                    }}
                  >
                    {i + 1}
                  </span>
                  {p.en}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: C.text,
                    marginTop: 6,
                    lineHeight: 1.7,
                  }}
                >
                  {displayLang(p, lang)}
                </div>
              </div>
              {/* Tap-to-hear per paragraph: speak() fires synchronously in
                  the tap handler (AUDIO_CONTRACT). 44px target. */}
              <button
                type="button"
                onClick={() => speak(p.en)}
                aria-label={t('dialogues.listen_aria_paragraph', { w: p.en.slice(0, 40) })}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  border: 'none',
                  background: '#E8F4FF',
                  color: C.blueDark,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                <Volume2 size={20} />
              </button>
            </div>
          </Card>
        ))}
      </div>

      <div style={{ marginTop: 16, marginBottom: 8 }}>
        <BackButton onBack={onBack} />
      </div>
    </div>
  );
}

/* ---------- shared in-screen back button ---------- */

function BackButton({ onBack }: { onBack: () => void }) {
  const { t } = useLang();
  return (
    <button
      type="button"
      onClick={onBack}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        width: '100%',
        minHeight: 52,
        border: 'none',
        borderRadius: 999,
        background: C.white,
        color: C.title,
        fontFamily: FONT,
        fontWeight: 800,
        fontSize: 16,
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
      }}
    >
      <ArrowLeft size={20} />
      {t('dialogues.back')}
    </button>
  );
}
