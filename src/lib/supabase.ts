// Supabase client with graceful localStorage fallback.
//
// When VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are configured, progress
// is synced to Supabase (see supabase/schema.sql). When they are absent —
// e.g. local dev or a plain static deploy — every call below becomes a safe
// no-op and the app keeps working fully offline on localStorage.
//
// NOTE: this uses the Supabase REST API directly via fetch so the app has
// zero extra dependencies. `npm i @supabase/supabase-js` any time for the
// official client; the table/RLS contract stays the same.

import type { LessonResult, Progress } from '../types';

const URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabaseEnabled = Boolean(URL && ANON_KEY);

function deviceId(): string {
  const KEY = 'nyein-sensei-device-id';
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = `dev_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
    try {
      localStorage.setItem(KEY, id);
    } catch {
      /* ignore */
    }
  }
  return id;
}

async function rest(path: string, init: RequestInit = {}): Promise<Response | null> {
  if (!supabaseEnabled) return null;
  try {
    return await fetch(`${URL}/rest/v1/${path}`, {
      ...init,
      headers: {
        apikey: ANON_KEY as string,
        Authorization: `Bearer ${ANON_KEY}`,
        'Content-Type': 'application/json',
        // resolution=merge-duplicates: upsert on conflict (device_id / profile_id).
        // return=representation: PostgREST returns the upserted row so we can
        // read the profile id — without this the response body is empty.
        Prefer: 'resolution=merge-duplicates,return=representation',
        ...(init.headers ?? {}),
      },
    });
  } catch {
    return null; // offline — stay silent, localStorage remains source of truth
  }
}

/** Best-effort sync of aggregate progress + one lesson completion. */
export async function syncProgressToSupabase(progress: Progress, lesson?: LessonResult): Promise<void> {
  if (!supabaseEnabled) return;

  // Upsert profile row for this device.
  const profileRes = await rest('profiles', {
    method: 'POST',
    body: JSON.stringify({ device_id: deviceId() }),
  });
  if (!profileRes || !profileRes.ok) return;
  const profiles = (await profileRes.json()) as Array<{ id: string }>;
  const profileId = profiles[0]?.id;
  if (!profileId) return;

  await rest('progress', {
    method: 'POST',
    body: JSON.stringify({
      profile_id: profileId,
      xp: progress.xp,
      streak_days: progress.streakDays,
      last_active_date: progress.lastActiveDate,
      best_combo: progress.bestCombo,
      total_correct: progress.totalCorrect,
      total_answered: progress.totalAnswered,
    }),
  });

  if (lesson) {
    await rest('lesson_completions', {
      method: 'POST',
      body: JSON.stringify({
        profile_id: profileId,
        topic_id: lesson.topicId,
        lesson_index: lesson.lessonIndex,
        difficulty: lesson.difficulty,
        score: lesson.score,
        total: lesson.total,
        xp_earned: lesson.xpEarned,
      }),
    });
  }
}
