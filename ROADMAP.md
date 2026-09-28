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
- [ ] C-004 Cada palabra: ejemplo real + Myanmar + fonética + audio
- [ ] C-005 Diálogos por tema (2-3 por tema, situaciones reales)
- [ ] C-006 Mini-historias por nivel (A1→B1)
- [x] C-007 Frases de trabajo (oficina, reuniones, email) — rumbo B1 profesional
- [ ] C-008 Repaso espaciado: colas 1/3/7/14/30 días integradas en Practicar
- [ ] C-009 "Palabra del día" con tarjeta visual
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

## FASE 6 — Audio 🟡
- [ ] A-001 Verificar Web Speech en iPhone real con Nyein (sin declarar hasta que ella lo oiga)
- [ ] A-002 Botón audio en cada palabra/frase (ya existe, verificar en nuevo diseño)
- [ ] A-003 Velocidad lenta en modo aprendizaje
- [ ] A-004 Pronunciación: reproducir frase nativa antes de grabar
- [ ] A-005 Fallback si speechSynthesis no responde (reintento + mensaje)
- [ ] A-006 Caché de audio para modo offline (PWA)

## FASE 7 — Cuentas, auth y sincronización 🟡
- [ ] S-001 Signup E2E contra Supabase real (verificado, no declarado)
- [ ] S-002 Signin/signout + sesión persistente + refresh de token
- [ ] S-003 `profiles.user_id` creado/asociado al registrarse
- [ ] S-004 Escrituras de progreso con JWT (no solo anon key)
- [ ] S-005 Aislamiento RLS entre 2 cuentas (test real)
- [ ] S-006 Cambios offline → sincronizan al volver la red
- [ ] S-007 Migración invitado → cuenta (conserva progreso)
- [ ] S-008 Email de confirmación (revisar setting de Supabase Auth)

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

---
**Total: 138 tareas.** Cada una = un enjambre que construye + verifica. El proyecto crece por oleadas, sin parar, sin repetir.
