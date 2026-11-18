# Portfolio Extensibility & Content Management Guide

> **Feature**: User Story 7 — Future Creative Extensibility  
> **Source of Truth**: `specs/001-immersive-ai-portfolio/spec.md` & `data-model.md`  
> **Architecture**: Modular, schema-validated, rollback-capable singleton registries.

---

## 1. Overview

The Alishba Immersive AI Portfolio is engineered for forward-compatibility. Content is decoupled from rendering components:
- **Projects**: Stored in `src/data/projects.ts` or dynamically registered via `contentRegistry`.
- **Cinematic Scenes**: Stored in `src/data/cinematic-scenes.ts` or managed via `sceneManager`.
- **Learning Journey**: Stored in `src/data/learning-journey.ts`.
- **Skills**: Stored in `src/data/profile.ts`.
- **Theme Palettes**: Configured in `src/styles/dark-futuristic-theme.css` and `src/data/theme.ts`.
- **Plugins**: Registered via `pluginManager`.

---

## 2. How to Add a New Project (Zero Component Code Changes)

Projects follow the **Problem → Solution → Outcome** triad per **FR-004**.

### Step-by-Step

1. Open `src/data/projects.ts`.
2. Append your new `Project` object to the array:

```typescript
{
  id: 'autonomous-financial-analyst',
  title: 'Autonomous SEC Filing Analyst Agent',
  tagline: 'Multi-agent financial report parser with quantitative anomaly detection.',
  problem:
    'Manual audit of quarterly 10-K and 10-Q filings requires 120+ analyst hours and suffers from subtle accounting discrepancies.',
  solution:
    'Engineered a hierarchical LangGraph multi-agent swarm that parses tabular balance sheets, cross-verifies footnotes, and detects revenue inconsistencies.',
  outcome:
    'Reduced filing processing time by 92% and identified 14 overlooked regulatory disclosure discrepancies in pilot deployments.',
  visuals: [
    {
      type: 'image',
      src: '/projects/financial-agent.png',
      alt: 'Financial Agent Workflow Dashboard',
      caption: 'Hierarchical SEC Filing Parsing DAG',
    },
  ],
  technologies: ['LangGraph', 'Python', 'FastAPI', 'pgvector', 'Claude 3.5 Sonnet'],
  tags: ['Finance', 'Multi-Agent', 'Agentic RAG'],
  liveUrl: 'https://demo.example.com',
  sourceUrl: 'https://github.com/alishba-dev/financial-agent',
  order: 5,
  featured: true,
}
```

3. The homepage projects grid automatically renders the new card, filters it by tag, and wires up modal/dialog views without modifying `project-card.tsx`.

---

## 3. How to Add a New Cinematic Hero Scene

Cinematic scenes are sequence-ordered and timed in milliseconds.

### Step-by-Step

1. Open `src/data/cinematic-scenes.ts`.
2. Append or insert your scene into `cinematicScenes`:

```typescript
{
  id: 'scene-neural-synthesis',
  order: 3,
  type: 'particles',
  duration: 2000,
  environment: 'Quantum neural synapses firing in electric neon violet',
  text: 'SYNCHRONIZING AUTONOMOUS REASONING CORES...',
  audioCue: '/audio/warp-hum.mp3',
  reducedMotionFallback: 'Static glowing neural mesh display',
}
```

3. The `CinematicSceneManager` (`src/components/hero/scene-manager.ts`) automatically calculates:
   - Updated cumulative total duration.
   - Interpolated active scene markers.
   - Text reveal timing and sound cues.

---

## 4. How to Register a Custom Extension Plugin

The portfolio supports client plugins via `src/utils/plugin-system.ts`:

```typescript
import { pluginManager } from '@/utils/plugin-system';

pluginManager.register({
  id: 'custom-telemetry',
  name: 'Custom Telemetry Plugin',
  version: '1.0.0',
  hooks: {
    onProjectClick: (project) => {
      console.log('User viewed project:', project.title);
    },
    onThemeChange: (theme) => {
      console.log('Active theme adjusted to:', theme);
    },
  },
});
```

---

## 5. Automated Validation & Rollbacks

Run the automated extensibility test to verify content compliance:

```bash
node scripts/test-extensibility.mjs
```

If dynamic content violates schema constraints (e.g. missing `problem` or duplicate `id`), `ContentManager.validateProject()` rejects the item and `contentRegistry.rollback()` restores the last stable snapshot, preventing runtime downtime.
