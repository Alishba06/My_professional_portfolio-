# Architecture Documentation: Immersive AI Portfolio for Alishba

> **Target Role**: AI Agent Developer  
> **Positioning**: "I build AI-powered intelligent solutions to solve real industry problems"  
> **Tech Stack**: Next.js 15 (App Router), React 19, TypeScript 5, Tailwind CSS, Three.js, React Three Fiber, GSAP

---

## 1. System Overview

The portfolio is architected as an immersive, highly performant web application engineered to demonstrate technical depth in AI agent orchestration, autonomous workflows, and creative computing.

```
┌────────────────────────────────────────────────────────┐
│                   Next.js 15 Client                    │
├───────────────────┬───────────────────┬────────────────┤
│  Virtual World    │  Identity & Skill │  Projects Hub  │
│  (Three.js/GSAP)  │  Showcase (React) │  (Problem/Sol) │
└───────────────────┴───────────────────┴────────────────┘
                            │
┌───────────────────────────┴────────────────────────────┐
│         Modular Data Registry & Theme Engine           │
│   (profile.ts, projects.ts, dark-futuristic-theme.css) │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────┴────────────────────────────┐
│              Edge / Server Route Handlers              │
│       (/api/contact with Resend & /api/health)         │
└────────────────────────────────────────────────────────┘
```

---

## 2. Core Architectural Pillars

### Pillar 1: Cinematic Virtual World (User Story 1)
- **Three.js & R3F**: Procedural particle starfields (`AmbientEffects`), cyber horizon grids, dynamic camera tracking.
- **Dynamic Import with SSR Disabled**: Heavy 3D modules are dynamically loaded (`ssr: false`) to ensure initial HTML load remains lightweight and instantaneous.
- **GSAP MatchMedia**: Seamless integration with `(prefers-reduced-motion: no-preference)`. Visitors with motion sensitivities immediately receive a static, accessible hero without jarring shifts.

### Pillar 2: Problem → Solution → Outcome Project Framing (User Story 4)
- Every project strictly adheres to the triad structure, presenting tangible enterprise challenges, autonomous agent architectures (LangGraph, CrewAI swarms, Agentic RAG), and quantifiable outcomes.

### Pillar 3: Purposeful 6-Channel Contact Station (User Story 5)
- Clear intent routing: Contact Me, Let's Work Together, Let's Solve a Problem, GitHub, LinkedIn, and Resume PDF download.
- Full fallback resilience: mailto links, clipboard copy, and optional Resend server dispatch with Google reCAPTCHA bot defenses.

### Pillar 4: Immersive Dark Futuristic Aesthetic (User Story 6)
- Cohesive cyber aesthetic driven by tailored HSL/hex design tokens.
- Live theme variant switcher (`cyber`, `deep-space`, `matrix`) synchronized with both DOM elements and Three.js canvas shaders via custom event messaging.

### Pillar 5: Future Creative Extensibility (User Story 7)
- Decentralized content registries (`src/data/registry.ts`, `src/utils/content-manager.ts`).
- Plug-and-play scene management (`CinematicSceneManager`) allowing new 3D acts to be sequenced with automatic cumulative duration calculation.

---

## 3. Directory Layout

```text
src/
├── 3d/                 # Three.js scenes, digital avatars, and ambient effects
│   ├── characters/     # Digital character components
│   ├── effects/        # Starfields, grids, and atmospheric fog
│   └── scenes/         # Hero scene canvas orchestrator
├── app/                # Next.js App Router (pages, layouts, error boundaries, routes)
│   ├── api/            # Route handlers (/api/contact, /api/health)
│   ├── layout.tsx      # Root layout with fonts, SEO, and ThemeToggle
│   └── page.tsx        # Homepage composing US1-US5 sections
├── components/         # React presentation components
│   ├── common/         # Error boundaries, section containers
│   ├── contact/        # Contact hub & purposeful options
│   ├── hero/           # Cinematic entrance & walking character
│   ├── identity/       # Positioning & skills showcase
│   ├── learning-journey# Interactive narrative stages
│   ├── projects/       # Project cards & detail dialogues
│   └── theme/          # Theme switcher HUD
├── data/               # Static type-safe content sources
├── styles/             # CSS design tokens & theme sheets
├── types/              # Domain interfaces & type guards
└── utils/              # Analytics, audio synthesis, env, logger
```
