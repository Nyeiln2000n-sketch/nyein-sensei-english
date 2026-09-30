# Notificaciones push nativas — guía de activación

Las notificaciones diarias estilo Duolingo ya están programadas en la app.
Falta activar 3 cosas en Supabase (una sola vez). Sigue los pasos en orden.

## Lo que ya está hecho ✅

- La app pide permiso una vez (en birmano), guarda la suscripción push y
  tiene ajustes de hora (20:00 por defecto) en el perfil.
- El service worker muestra la notificación con el gato 🐱 y abre la app al tocarla.
- La clave VAPID **pública** ya está en la app (`src/lib/push.ts`).
- La clave VAPID **privada** está guardada en un archivo seguro del servidor
  (ruta: `goals/nyein-sensei-english-app-expansion/hidden_files/vapid-private.key`).
  **No está en el repo ni en ningún chat.** Pídela por un canal seguro y no la
  compartas.

## Paso 1 — Crear la tabla (2 minutos)

1. Abre tu proyecto en https://supabase.com/dashboard
2. Ve a **SQL Editor** → **New query**
3. Copia TODO el contenido de `supabase/migrations/20261001_push_subscriptions.sql`
   de este repo, pégalo y pulsa **Run**
4. Verifica: ve a **Table Editor** → debe existir `push_subscriptions`

## Paso 2 — Desplegar la función (5 minutos)

En tu computador, con Supabase CLI instalado y logueado:

```bash
cd nyein-sensei-english
supabase functions deploy send-daily-reminder
```

(Si prefieres el dashboard: **Edge Functions** → **Deploy new function** →
sube la carpeta `supabase/functions/send-daily-reminder/`.)

## Paso 3 — Guardar los secretos (2 minutos)

La función necesita 2 secretos. En el dashboard: **Edge Functions** →
`send-daily-reminder` → **Secrets** → añade:

| Nombre              | Valor                                            |
| ------------------- | ------------------------------------------------ |
| `VAPID_PRIVATE_KEY` | la clave privada (pídela por canal seguro)       |
| `CRON_SECRET`       | un texto largo aleatorio que inventes (p. ej. `openssl rand -hex 32`) |

**Guarda el valor de `CRON_SECRET`** — lo necesitas en el paso 4.

## Paso 4 — Programar el envío diario (2 minutos)

1. En **SQL Editor** → **New query**
2. Copia el contenido de `supabase/scheduling-setup.sql`
3. Reemplaza `<PROJECT_REF>` por tu referencia del proyecto
   (la parte antes de `.supabase.co` en tu URL) y `<CRON_SECRET>` por el valor
   del paso 3. **Borra el paso 2 comentado** (es solo ejemplo).
4. Pulsa **Run**
5. Verifica: `select jobname, schedule, active from cron.job;`
   debe mostrar `send-daily-reminder` activo

## Paso 5 — Probar

1. En tu iPhone (con la PWA instalada, ver abajo), entra a la app →
   **Perfil** → activa **နေ့စဉ် သတိပေးချက်** y acepta el permiso
2. En el dashboard: **Table Editor** → `push_subscriptions` debe tener una fila
   con tu `endpoint`
3. Para probar sin esperar a mañana: en **Edge Functions** →
   `send-daily-reminder` → **Invoke** (pon la cabecera
   `x-cron-secret: <tu CRON_SECRET>`) — debe devolver `{"sent":1,...}`
   y llegarte la notificación

## Requisitos en iPhone ⚠️

- **La PWA debe estar instalada** en la pantalla de inicio
  (Safari → Compartir → "Añadir a pantalla de inicio"). En Safari sin instalar,
  iOS no permite notificaciones web.
- **iOS 16.4 o superior**.
- El permiso se pide UNA vez con un botón dentro de la app (iOS lo exige).

## Cómo funciona (resumen)

Cada hora, `pg_cron` llama a la Edge Function. La función revisa las
suscripciones activas, calcula la hora local de cada estudiante con su
`timezone`, y si coincide con su `reminder_time` le envía el push con un
mensaje motivador en birmano (rotan cada día). Si una suscripción murió
(PWA desinstalada), se borra sola.
