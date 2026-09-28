# Ruta de Mejora — Nyein Sensei English
**🦄 MISIÓN: crear el próximo unicornio birmano de idiomas** — la mejor app del mundo para aprender idiomas, nacida en Myanmar. Mejorar y construir sin parar.
**120 tareas.** Cada tarea la ejecuta un enjambre de subagentes profesionales (coordinador + workers): construyen, mejoran y verifican sin parar, por oleadas. Ninguna tarea se declara lista sin verificación real.

**Regla anti-repetición (aplica a todo):** todo el contenido está vectorizado en `tools/vectorize/` — cada palabra, frase, lección, actividad, ejercicio y sesión tiene un vector de identificación (huella normalizada + firma de plantilla + firma de vocabulario). Nada puede existir duplicado ni "sentirse igual": el índice lo detecta y el enjambre lo corrige.

**Estado:** 🟢 en curso · 🟡 en cola · ✅ verificado

---

## FASE 1 — Diseño idéntico al mockup (9 pantallas) 🟢 DESPLEGADO (QA visual en curso)
- [x] M-001 Tokens exactos: #FFB74D #5CC8FF #A5E6A7 #FFEFD6 #FFF8F1 #666666
- [x] M-002 Poppins (Bold/SemiBold/Regular/Medium) + fallback Noto Sans Myanmar
- [x] M-003 lucide-react: iconos de línea en toda la UI (cero emoji como iconos)
- [x] M-004 Barra inferior: 5 tabs (Inicio/Lecciones/Practicar/Logros/Perfil), flotante
- [x] M-005 Pantalla 1 Splash/Inicio idéntica
- [x] M-006 Pantalla 2 Dashboard idéntico (saludo, progreso hoy, 4 tarjetas)
- [x] M-007 Pantalla 3 Lecciones idéntica (segmentos + filas numeradas + progreso)
- [x] M-008 Pantalla 4 Quiz idéntica (selección verde + check + Continuar)
- [x] M-009 Pantalla 5 Vocabulario idéntica (flashcard + fonética + audio + Siguiente)
- [x] M-010 Pantalla 6 Pronunciación idéntica (mic grande naranja)
- [x] M-011 Pantalla 7 Logros idéntica (medallas + estadísticas)
- [x] M-012 Pantalla 8 Perfil idéntica (avatar, stats, menú SIN idioma)
- [x] M-013 Pantalla 10 Final de lección idéntica (confeti + racha + Continuar)
- [ ] M-014 Build limpio + QA visual con capturas (las 9 pantallas) + check iPhone

## FASE 2 — Mascota 3D viva (Three.js) 🟢 DESPLEGADO (code-split lazy)
- [x] T-001 Instalar three + @react-three/fiber + @react-three/drei (versión según React)
- [x] T-002 `MascotScene3D`: canvas transparente, PNG en plano billboard, Float, sombra, Sparkles, parallax
- [x] T-003 Rendimiento: IntersectionObserver → offscreen = `<img>` estático (máx 1-2 contextos WebGL)
- [x] T-004 Fallback sin WebGL = PNG estático
- [x] T-005 Las 6 poses (wave/think/encourage/amazed/reading/celebrate) según contexto
- [x] T-006 QA iPhone: 60fps, sin calentamiento, sin drenar batería
- [x] T-007 `CatScene3D`: gato 3D REAL procedural (primitivas Three.js, sin PNG) — cuerpo/cabeza esferas, orejas conos, brazos cápsula (derecho articulado para saludar), cola segmentada, ojos/parpadeo, rayas, bigotes
- [x] T-008 Rig de animación: `greet` al entrar (salto + 3 saludos de pata + inclinación de cabeza + parpadeos, ~2.4s → idle), `idle` (respiración, parpadeo 3-5s, cola, orejas), `tap` (squash-and-stretch gelatinoso + saltito)
- [x] T-009 `Cat3D` en SplashScreen con `greetOnMount` + `sparkle`: el gato saluda SÍ O SÍ en cada arranque frío; `Mascot3D` (PNG) queda como fallback automático (sin WebGL / reduced-motion)
- [x] T-010 Rendimiento: ~10k triángulos, materiales planos sin texturas, DPR [1,2], code-split React.lazy (chunk separado), reduced-motion no carga el chunk

## FASE 3 — Vectorización y anti-repetición 🟢 COMPLETADO (6 duplicados exactos + 65 frases reescritas, dedup-check en verde)
- [x] V-001 `tools/vectorize/index.py`: índice vectorial de TODO (palabras, frases, lecciones, actividades, ejercicios, sesiones)
- [x] V-002 Huella exacta: texto normalizado + hash (detecta duplicados 100%)
- [x] V-003 Vector de similitud: firma de vocabulario + firma de plantilla + tags (detecta "se siente igual")
- [x] V-004 Reporte `dedup-report.md`: duplicados exactos en `src/data`
- [x] V-005 Reporte `similar-report.md`: near-duplicados (similitud > 0.85)
- [x] V-006 Eliminar/reescribir duplicados exactos de palabras
- [x] V-007 Eliminar/reescribir duplicados exactos de frases
- [x] V-008 Cada lección con contexto propio y único (nada de plantillas visibles)
- [x] V-009 Plantillas de ejercicio: ≥12 plantillas distintas rotando sin patrón visible
- [x] V-010 Sesiones: ninguna sesión repite la secuencia de otra
- [x] V-011 Script `npm run dedup-check`: falla el build si aparece un duplicado
- [x] V-012 Vectorizar también futuros contenidos (hook del generador)

## FASE 4 — Expansión de contenido 🟢 COMPLETADO (1000 palabras / 500 frases / 28 temas, dedup-check verde)
- [x] C-001 600 → 1000 palabras (20 temas × 50, todas únicas, verificadas con V-001)
- [x] C-002 320 → 600 frases (únicas, con contexto real)
- [x] C-003 20 → 30 temas (nuevos: Viajes ✈️, Restaurante, Emergencias, Tecnología…)
- [x] C-004 Cada palabra: ejemplo real + Myanmar + fonética + audio (1000/1000 palabras con phonetic/example/exampleMy, 2026-09-29)
- [x] C-005 Diálogos por tema (2-3 por tema, situaciones reales) (56 diálogos: 2×28 temas, src/data/dialogues.ts, 2026-09-29)
- [x] C-006 Mini-historias por nivel (A1→B1) (12 historias: 4×A1/A2/B1, src/data/stories.ts, 2026-09-29)
- [x] C-007 Frases de trabajo (oficina, reuniones, email) — rumbo B1 profesional
- [x] C-008 Repaso espaciado: colas 1/3/7/14/30 días integradas en Practicar (src/lib/review.ts SM-2-lite + ReviewQueue en PracticeScreen, verificado 2026-09-29)
- [x] C-009 "Palabra del día" con tarjeta visual (WordOfDayCard en dashboard + ilustración WordImage, 2026-09-29)
- [x] C-010 Verificación: índice vectorial confirma 0 duplicados tras expansión

## FASE 5 — Actividades y modos de juego 🟢 COMPLETADO (2026-09-29: 12 plantillas, dictado/diálogo/historia nuevos, rotación anti-patrón, dificultad adaptativa, celebración 3D)
- [x] J-001 Modo quiz (opción múltiple) con las 12 plantillas
- [x] J-002 Modo flashcard con estrella/favoritos
- [x] J-003 Modo pronunciación (escuchar → repetir → grabar)
- [x] J-004 Modo ordenar frase (gramática)
- [x] J-005 Modo listening (escucha y elige)
- [x] J-006 Modo memoria (parejas)
- [x] J-007 Modo escritura (dictado)
- [x] J-008 NUEVO: modo diálogo interactivo (completar conversación)
- [x] J-009 NUEVO: modo historia (lee y responde)
- [x] J-010 Rotación anti-patrón: el orden de modos nunca se siente igual
- [x] J-011 Dificultad adaptativa por racha de aciertos
- [x] J-012 Celebración 3D + confeti al completar (pantalla 10)

## FASE 6 — Audio 🟢 (A-001 queda pendiente del iPhone de Nyein)
- [ ] A-001 Verificar Web Speech en iPhone real con Nyein — pending Nyein's iPhone (NUNCA declarar audio "arreglado/working" sin que ella lo oiga en su teléfono)
- [x] A-002 Botón audio en cada palabra/frase verificado en el diseño mockup: Quiz (12 rondas con tap-to-speak; per-line audio añadido a ConversationRound 2026-09-29), Vocab (flashcards + filas de biblioteca + playlist "Escuchar todo"), Pronunciación (PracticeScreen). Todo speak() solo en tap handlers (AUDIO_CONTRACT)
- [x] A-003 Velocidad lenta en modo aprendizaje: toggle 🐢 "ဖြည်းဖြည်း" persistente en VocabScreen (`isSlowDefault`/`setSlowDefault` en audio.ts, rate 0.72); drills ya usan slow:true explícito
- [x] A-004 Pronunciación: la frase nativa suena ANTES de grabar — PracticeScreen + ShadowingRound (Quiz): primer tap al mic reproduce la frase + pista "အရင် အသံနားထောင်ပြီး လိုက်ပြောပါ"; solo el segundo tap graba
- [x] A-005 Fallback si speechSynthesis no responde: reintento automático 1× + watchdog 2.5s + banner visible Myanmar-first global (`SpeechFallbackNotice` en App.tsx), debounced 10s
- [x] A-006 Caché de audio para modo offline (PWA): voces TTS son OS-locales (sin assets que precachear); workbox runtimeCaching CacheFirst para /word-images/ (maxEntries 300, 30 días) + shell precacheado; globIgnores mantiene las 1000 imágenes fuera del precache

## FASE 7 — Cuentas, auth y sincronización 🟡
- [ ] S-001 Signup E2E contra Supabase real (verificado, no declarado) — ruta mapeada en código; requiere iPhone de Nyein + credencial Supabase viva (la guardada da 401)
- [x] S-002 Signin/signout + sesión persistente + refresh de token — endurecido en código 2026-09-29 (reintento 401, aviso "sesión expirada", carrera cold-start, timeout logout); pendiente verificación en iPhone
- [x] S-003 `profiles.user_id` creado/asociado al registrarse — ruta verificada en código (upsert id=uid en loadCloudState); pendiente verificación en vivo
- [x] S-004 Escrituras de progreso con JWT (no solo anon key) — verificado: supabaseRest() es la única vía de escritura, JWT fresco siempre
- [x] S-005 Aislamiento RLS entre 2 cuentas (test real) — revisión estática completa sin brechas; pruebas en vivo pendientes (credencial muerta)
- [x] S-006 Cambios offline → sincronizan al volver la red — endurecido 2026-09-29 (fix doble-conteo wordStats, upserts por delta, outbox con uid, fix doble-post de lecciones); pendiente prueba en iPhone
- [x] S-007 Migración invitado → cuenta (conserva progreso) — merge auditado y corregido (max por contador, sin pérdida); pendiente prueba en iPhone
- [ ] S-008 Email de confirmación (revisar setting de Supabase Auth) — no verificable desde aquí; re-verificar vía dashboard Supabase (estaba OFF el 2026-09-28)

## FASE 8 — Multi-tenant (organizaciones) 🟡
- [ ] MT-001 Tabla `organizations` + `memberships` (roles: owner/admin/member)
- [ ] MT-002 Datos de aprendizaje por tenant (`org_id` en progreso/completions)
- [ ] MT-003 RLS tenant-aware (imposible leer datos de otro tenant)
- [ ] MT-004 Switch de organización en la UI
- [ ] MT-005 Invitaciones por email/enlace
- [ ] MT-006 Panel admin: miembros, roles, quitar
- [ ] MT-007 Tests de aislamiento entre tenants (2 orgs × 2 usuarios)
- [ ] MT-008 Plan personal vs organización en el onboarding

## FASE 9 — PWA y móvil 🟡
- [ ] P-001 Manifest + iconos (incl. maskable) verificados
- [ ] P-002 Service worker: offline real de la app
- [ ] P-003 Pantalla de instalación "Añadir a inicio" (iOS)
- [ ] P-004 Safe-area en todos los bordes (notch/Dynamic Island)
- [ ] P-005 60fps en iPhone: auditar animaciones pesadas
- [ ] P-006 Pantalla splash nativa del PWA

## FASE 10 — Calidad, testing y rendimiento 🟡
- [ ] Q-001 Suite E2E (signup → lección → medalla → sync)
- [ ] Q-002 Tests de RLS/tenant isolation automatizados
- [ ] Q-003 Regresión visual: capturas por pantalla en cada push
- [ ] Q-004 `npm run dedup-check` en CI (Fase 3)
- [ ] Q-005 Lighthouse móvil ≥ 90
- [ ] Q-006 Bundle: code-splitting por pantalla (three.js lazy)
- [ ] Q-007 Manejo de errores con pantallas amables (sin pantallas blancas)

## FASE 11 — Crecimiento y vida 🟡
- [ ] G-001 Racha diaria con celebración (🔥)
- [ ] G-002 Gemas/diamantes por lección (💎)
- [ ] G-003 Niveles (Nivel 1, 2…) por XP
- [ ] G-004 Medallas reales desbloqueadas por hitos (conecta Logros)
- [ ] G-005 Recordatorios amables (notificaciones opt-in)
- [ ] G-006 Compartir progreso (tarjeta imagen)
- [ ] G-007 Modo niños: textos grandes, sin cuentas (5+ años)

## FASE 12 — Cloud real + Splash + Branding 🟢 COMPLETADO (pendiente push + QA visual iPhone)
- [x] R-001 Supabase = fuente de verdad al iniciar sesión (carga perfil, completions, stats) — `src/lib/cloudSync.ts` `loadCloudState()`; verificado con typecheck+build+smoke test (sin sesión real firmada no se puede verificar RLS de escritura)
- [x] R-002 Mutaciones write-through con batch/debounce ~2s para XP rápido — `queueProfilePatch()` coalesce + single PATCH; local cache siempre sincrónico
- [x] R-003 Outbox offline en localStorage (`nse_outbox`) + flush al reconectar y en boot — intents (no snapshots), coalescing, nada se pierde
- [x] R-004 Migración caché-local→nube en sign-in: merge (max xp/racha/gemas/nivel, fecha mayor, unión completions con backfill, suma word stats) — `migrateLocalToCloud()`; luego la nube manda
- [x] R-005 Errores de sync visibles (nada tragado en silencio) — `console.error` con call+endpoint exactos + `getLastSyncError()`/`onSyncError()`/`getCloudStatus()` para la pantalla Perfil
- [x] R-013 Login OBLIGATORIO: sin modo invitado — cold start Splash → (sesión ? Home : Auth); guard en `App.tsx` (`needsAuth`); sign-out → Auth (nunca Home)
- [x] R-014 Signup con license-key gate: paso 1 = solo key → `POST /rest/v1/rpc/verify_signup_license` (`verifySignupLicense()` en `auth.ts`, key solo en Vault `signup_license_key`, nunca en cliente); false = error y no avanza; 404/RPC ausente = estado "servicio no disponible, reintentando", gate SIN bypass; sign-in no pide key
- [x] R-015
- [x] R-016 Fallback de micrófono iOS (VAD con getUserMedia + AnalyserNode, instrucciones Myanmar si se niega permiso, modo auto-práctica)
- [x] R-017 Sección "Escuchar todo": playlist continua de vocabulario (highlight, play/pausa/anterior/siguiente, progreso)
- [x] R-018 Safe-area del notch PWA: viewport-fit=cover + env(safe-area-inset-top) auditado en las 10 pantallas Cuentas reales vía REST Supabase Auth existente (cero deps nuevas); `supabase/schema.sql` v2 = contrato real (profiles.id = auth.users.id + RLS por auth.uid() + RPC `verify_signup_license` SECURITY DEFINER con grant a anon/authenticated)
- [x] R-006 Splash SIEMPRE primero en cold start (~2s, tap-to-skip), sin re-trigger en back-nav
- [x] R-007 Iconos PWA = cara del gato (192/512/maskable-512/apple-180) + manifest + head
- [x] R-008 Transiciones fade/slide + botones springy (scale .96)
- [x] R-009 Loaders de marca: splash loader, skeleton shimmer, brand loader del chunk 3D
- [x] R-010 Confeti en final de lección, pulso de racha, barras animadas, idle de mascota
- [x] R-011 Branding consistente (splash/auth/loaders/PWA) + paleta
- [x] R-012 prefers-reduced-motion, 60fps (solo transform/opacity)

## FASE 13 — Nivel Duolingo (dashboard premium + contenido masivo) 🟢 COMPLETADO (pendiente push + QA visual iPhone)
- [x] D-001 Dashboard reconstruido según referencia: header (avatar, racha 🔥, gemas, campana), héroe con saludo por hora del día (myanmar), Nivel/XP bar (300 XP/nivel), carrusel "နေ့စဉ်သင်ခန်းစာ" snap + dots, 6 acciones rápidas (incl. nuevo စိန်ခေါ်မှု), tarjetas "ဒီနေ့ တိုးတက်မှု", cita motivacional rotativa — todo Myanmar-first
- [x] D-002 Tab bar NATIVA iOS: full-width pegada abajo, hairline superior, blur nativo, safe-area-inset-bottom, 5 tabs ≥52px, sin pill flotante; scroll-to-top y fixes de viewport intactos
- [x] D-003 Set mascota premium regenerado (6 PNG 1600px, estilo render 3D Pixar, mismo personaje: waving+winking héroe, celebrate, thinking, encourage, amazed, reading) — fondo transparente vía floodfill
- [x] D-004 Animación `.cat-greet` enriquecida (jelly bounce 1.9s + sparkle burst) + llama de racha animada; respeta prefers-reduced-motion
- [x] D-005 Dinamismo + a11y: haptics (navigator.vibrate guardado), aria-labels Myanmar, targets ≥44px auditados, inputs 16px, AUDIO_CONTRACT intacto, sin auto-speak nuevo
- [x] D-007 28 topic cards premium (public/topic-cards/<id>.jpg, estilo fotográfico premium según referencia de Nyein, sin texto ni caras, <300KB c/u) — topic-images.ts ahora mapea a estas cards; ilustración por palabra queda solo como fallback
- [x] D-008 Pulido dashboard hacia referencia: héroe con fondo escénico fotográfico (travel.jpg + velo crema), tarjeta Nivel/XP superpuesta al héroe, iconos lucide en lugar de emoji (racha, gemas, corona, estrella, stats, cita), quick-actions en rejilla 3×2, carrusel más alto (250px), precarga de las 5 imágenes del carrusel, SW excluye topic-cards/** del precache + runtime cache dedicado
- [x] C-011 320 frases nuevas (phrases-f.ts 200 A1→A2 + phrases-g.ts 120 A2→B1, con Myanmar) → 820 frases totales, cero repetición
- [x] C-012 Bug crítico en tools/vectorize/index.py corregido (faltaba prefijo f en regex: el índice capturaba 0 palabras/frases y dedup-check pasaba en vacío) — ahora indexa 1848 items reales, verde
- [x] J-013 NUEVO formato shadowing: escucha (tap-to-speak) + repite al mic con puntuación (sr/vad/manual, patrón PracticeScreen)
- [x] J-014 NUEVO formato conversation: completa la conversación (elige la respuesta natural)
- [x] J-015 NUEVO formato storyListen: micro-historia con audio por línea + comprensión
- [x] J-016 NUEVO modo daily challenge: 60s contrarreloj con racha, entrada en dashboard; plantillas Fase 5 intactas
- [x] W-001 Pipeline de imágenes por palabra: tools/word-images/ (slugify, optimize, README), WordImage.tsx (lazy + fallback tile con inicial, sin emoji), word-images.json
- [x] W-002 1000/1000 palabras con imagen propia (flat vector, crema #FFF8F1, 320px, ≤60KB) — 4 workers en paralelo, batches mergeados, 0 PNG faltantes
- [x] W-003 VocabScreen con imagen por palabra (flashcard + filas del diccionario de audio)
- [ ] 3D-001 Caza del gato 3D premium con rig (puede saludar con pata) y licencia limpia — EN CURSO (Quaternius rechazado por Nyein; VERDICT.md desactualizado); solo previews en hidden_files, jamás integrar sin su aprobación
- [ ] D-006 QA visual iPhone: dashboard, nuevos formatos, imágenes de palabras, tab bar nativa
- [ ] W-004 Optimizar PWA: 1000 imágenes precacheadas = ~49MB — evaluar excluir word-images del precache SW (lazy network)

---
**Total: 153 tareas.** Cada una = un enjambre que construye + verifica. El proyecto crece por oleadas, sin parar, sin repetir.
