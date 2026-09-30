-- NOTIF-PUSH — Tabla de suscripciones Web Push (recordatorio diario estilo Duolingo).
--
-- CÓMO APLICAR: pegar en el SQL Editor del dashboard de Supabase y ejecutar.
-- (Ver supabase/PUSH_SETUP.md para la guía paso a paso en español.)
--
-- La Edge Function `send-daily-reminder` lee esta tabla con service_role
-- (bypasea RLS); la app solo toca sus propias filas vía RLS.

create table if not exists public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  -- Endpoint del push service (único por dispositivo/navegador).
  endpoint text not null unique,
  -- Claves de cifrado Web Push (p256dh, auth) en base64url.
  p256dh text not null,
  auth text not null,
  -- Zona horaria IANA del dispositivo (p. ej. 'Asia/Yangon').
  timezone text not null default 'Asia/Yangon',
  -- Hora local del recordatorio en formato 'HH:MM' (24h).
  reminder_time text not null default '20:00',
  enabled boolean not null default true,
  last_sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists push_subscriptions_user_id_idx
  on public.push_subscriptions (user_id);

create index if not exists push_subscriptions_due_idx
  on public.push_subscriptions (enabled, reminder_time)
  where enabled = true;

alter table public.push_subscriptions enable row level security;

drop policy if exists "users manage own push subscriptions"
  on public.push_subscriptions;

-- Cada usuario solo ve, crea, edita y borra SUS propias suscripciones.
create policy "users manage own push subscriptions"
  on public.push_subscriptions
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Mantiene updated_at al día en cada PATCH desde la app.
create or replace function public.push_subscriptions_touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists push_subscriptions_touch_updated_at
  on public.push_subscriptions;

create trigger push_subscriptions_touch_updated_at
  before update on public.push_subscriptions
  for each row
  execute function public.push_subscriptions_touch_updated_at();
