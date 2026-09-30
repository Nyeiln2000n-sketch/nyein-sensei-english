-- NOTIF-PUSH — Programación del recordatorio diario.
--
-- ⚠️  NO EJECUTAR automáticamente: este archivo es para aplicarlo a mano en el
-- dashboard de Supabase (SQL Editor) o con psql. Ver supabase/PUSH_SETUP.md.
--
-- La función filtra por timezone + reminder_time de cada suscripción, así que
-- el cron corre UNA vez por hora y la función decide a quién le toca.

-- 1) Extensiones (una sola vez por proyecto):
create extension if not exists pg_cron;
create extension if not exists pg_net;

-- 2) Secreto compartido: genera uno y úsalo también como secreto CRON_SECRET
--    de la Edge Function. Ejemplo (NO uses este valor, genera el tuyo):
--    openssl rand -hex 32

-- 3) Programa el job (reemplaza <PROJECT_REF> y <CRON_SECRET>):
select cron.schedule(
  'send-daily-reminder',
  '0 * * * *',  -- cada hora en punto
  $$
  select net.http_post(
    url := 'https://<PROJECT_REF>.supabase.co/functions/v1/send-daily-reminder',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-cron-secret', '<CRON_SECRET>'
    ),
    body := '{}'::jsonb,
    timeout_milliseconds := 55000
  );
  $$
);

-- 4) Verificar que quedó programado:
-- select jobid, jobname, schedule, active from cron.job;

-- 5) Si algún día hay que pausarlo/borrarlo:
-- select cron.alter_job((select jobid from cron.job where jobname = 'send-daily-reminder'), active := false);
-- select cron.unschedule('send-daily-reminder');
