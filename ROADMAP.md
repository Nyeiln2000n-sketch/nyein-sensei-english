# Ruta de Mejora — Nyein Sensei English
**🦄 MISIÓN: crear el próximo unicornio birmano de idiomas** — la mejor app del mundo para aprender idiomas, nacida en Myanmar. Mejorar y construir sin parar.
**120 tareas.** Cada tarea la ejecuta un enjambre de subagentes profesionales (coordinador + workers): construyen, mejoran y verifican sin parar, por oleadas. Ninguna tarea se declara lista sin verificación real.

**Regla anti-repetición (aplica a todo):** todo el contenido está vectorizado en `tools/vectorize/` — cada palabra, frase, lección, actividad, ejercicio y sesión tiene un vector de identificación (huella normalizada + firma de plantilla + firma de vocabulario). Nada puede existir duplicado ni "sentirse igual": el índice lo detecta y el enjambre lo corrige.

**Estado:** 🟢 en curso · 🟡 en cola · ✅ verificado

---

## FASE 1 — Diseño idéntico al mockup (9 pantallas) 🟢 EN CURSO
- [ ] M-001 Tokens exactos: #FFB74D #5CC8FF #A5E6A7 #FFEFD6 #FFF8F1 #666666
- [ ] M-002 Poppins (Bold/SemiBold/Regular/Medium) + fallback Noto Sans Myanmar
- [ ] M-003 lucide-react: iconos de línea en toda la UI (cero emoji como iconos)
- [ ] M-004 Barra inferior: 5 tabs (Inicio/Lecciones/Practicar/Logros/Perfil), flotante
- [ ] M-005 Pantalla 1 Splash/Inicio idéntica
- [ ] M-006 Pantalla 2 Dashboard idéntico (saludo, progreso hoy, 4 tarjetas)
- [ ] M-007 Pantalla 3 Lecciones idéntica (segmentos + filas numeradas + progreso)
- [ ] M-008 Pantalla 4 Quiz idéntica (selección verde + check + Continuar)
- [ ] M-009 Pantalla 5 Vocabulario idéntica (flashcard + fonética + audio + Siguiente)
- [ ] M-010 Pantalla 6 Pronunciación idéntica (mic grande naranja)
- [ ] M-011 Pantalla 7 Logros idéntica (medallas + estadísticas)
- [ ] M-012 Pantalla 8 Perfil idéntica (avatar, stats, menú SIN idioma)
- [ ] M-013 Pantalla 10 Final de lección idéntica (confeti + racha + Continuar)
- [ ] M-014 Build limpio + QA visual con capturas (las 9 pantallas) + check iPhone

## FASE 2 — Mascota 3D viva (Three.js) 🟢 EN CURSO
- [ ] T-001 Instalar three + @react-three/fiber + @react-three/drei (versión según React)
- [ ] T-002 `MascotScene3D`: canvas transparente, PNG en plano billboard, Float, sombra, Sparkles, parallax
- [ ] T-003 Rendimiento: IntersectionObserver → offscreen = `<img>` estático (máx 1-2 contextos WebGL)
- [ ] T-004 Fallback sin WebGL = PNG estático
- [ ] T-005 Las 6 poses (wave/think/encourage/amazed/reading/celebrate) según contexto
- [ ] T-006 QA iPhone: 60fps, sin calentamiento, sin drenar batería

## FASE 3 — Vectorización y anti-repetición 🟡 SIGUIENTE OLEADA
- [ ] V-001 `tools/vectorize/index.py`: índice vectorial de TODO (palabras, frases, lecciones, actividades, ejercicios, sesiones)
- [ ] V-002 Huella exacta: texto normalizado + hash (detecta duplicados 100%)
- [ ] V-003 Vector de similitud: firma de vocabulario + firma de plantilla + tags (detecta "se siente igual")
- [ ] V-004 Reporte `dedup-report.md`: duplicados exactos en `src/data`
- [ ] V-005 Reporte `similar-report.md`: near-duplicados (similitud > 0.85)
- [ ] V-006 Eliminar/reescribir duplicados exactos de palabras
- [ ] V-007 Eliminar/reescribir duplicados exactos de frases
- [ ] V-008 Cada lección con contexto propio y único (nada de plantillas visibles)
- [ ] V-009 Plantillas de ejercicio: ≥12 plantillas distintas rotando sin patrón visible
- [ ] V-010 Sesiones: ninguna sesión repite la secuencia de otra
- [ ] V-011 Script `npm run dedup-check`: falla el build si aparece un duplicado
- [ ] V-012 Vectorizar también futuros contenidos (hook del generador)

## FASE 4 — Expansión de contenido 🟡
- [ ] C-001 600 → 1000 palabras (20 temas × 50, todas únicas, verificadas con V-001)
- [ ] C-002 320 → 600 frases (únicas, con contexto real)
- [ ] C-003 20 → 30 temas (nuevos: Viajes ✈️, Restaurante, Emergencias, Tecnología…)
- [ ] C-004 Cada palabra: ejemplo real + Myanmar + fonética + audio
- [ ] C-005 Diálogos por tema (2-3 por tema, situaciones reales)
- [ ] C-006 Mini-historias por nivel (A1→B1)
- [ ] C-007 Frases de trabajo (oficina, reuniones, email) — rumbo B1 profesional
- [ ] C-008 Repaso espaciado: colas 1/3/7/14/30 días integradas en Practicar
- [ ] C-009 "Palabra del día" con tarjeta visual
- [ ] C-010 Verificación: índice vectorial confirma 0 duplicados tras expansión

## FASE 5 — Actividades y modos de juego 🟡
- [ ] J-001 Modo quiz (opción múltiple) con las 12 plantillas
- [ ] J-002 Modo flashcard con estrella/favoritos
- [ ] J-003 Modo pronunciación (escuchar → repetir → grabar)
- [ ] J-004 Modo ordenar frase (gramática)
- [ ] J-005 Modo listening (escucha y elige)
- [ ] J-006 Modo memoria (parejas)
- [ ] J-007 Modo escritura (dictado)
- [ ] J-008 NUEVO: modo diálogo interactivo (completar conversación)
- [ ] J-009 NUEVO: modo historia (lee y responde)
- [ ] J-010 Rotación anti-patrón: el orden de modos nunca se siente igual
- [ ] J-011 Dificultad adaptativa por racha de aciertos
- [ ] J-012 Celebración 3D + confeti al completar (pantalla 10)

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

---
**Total: 120 tareas.** Cada una = un enjambre que construye + verifica. El proyecto crece por oleadas, sin parar, sin repetir.
