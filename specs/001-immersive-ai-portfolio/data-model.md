# Data Model: Immersive AI Portfolio for Alishba

**Created**: 2026-08-26
**Feature**: specs/001-immersive-ai-portfolio/spec.md

---

## Overview

This document defines the data structures, relationships, and validation rules for the content and entities described in the feature specification. All data is static, type-safe, and lives in `/src/data/` as TypeScript modules.

---

## Entity: Visitor

A person landing on the site. Not persisted; inferred from runtime/browser signals.

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| `deviceType` | enum: `'mobile' \| 'tablet' \| 'desktop'` | Detected viewport category | — |
| `motionPreference` | `'reduce' \| 'no-preference'` | OS-level `prefers-reduced-motion` | — |
| `connectionSpeed` | `'slow' \| 'fast' \| 'unknown'` | Network Information API hint | — |
| `audienceType` | inferred: `'recruiter' \| 'client' \| 'reviewer' \| 'general'` | Best guess from referrer/context | — |

**Usage**: Drives Three.js quality settings, animation gating, and hero fallback rendering. No personal data collected.

---

## Entity: Alishba (Profile)

The portfolio owner — singleton.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | yes | Full display name |
| `role` | string | yes | Job title/positioning label (default: "AI Agent Developer") |
| `positioningStatement` | string | yes | One-sentence mission statement (default: "I build AI-powered intelligent solutions to solve real industry problems") |
| `tagline` | string | no | Short subheadline (≤ 80 chars) |
| `bio` | string | yes | 2–3 sentence bio shown in identity section |
| `skills` | `Skill[]` | yes | List of categorized skills |
| `learningJourney` | `LearningJourneyStage[]` | yes | Ordered progression of growth stages |
| `projects` | `Project[]` | yes | Portfolio pieces |
| `contactOptions` | `ContactOption[]` | yes | Six contact entry points |
| `resumeUrl` | string (URL) | yes | Path or URL to resume PDF |
| `githubUrl` | string (URL) | yes | GitHub profile URL |
| `linkedinUrl` | string (URL) | yes | LinkedIn profile URL |
| `email` | string (email) | yes | Direct email for fallback contact |

### Embedded: Skill

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `category` | string | yes | e.g., "AI/ML", "Frontend", "Backend", "Tools" |
| `name` | string | yes | Skill name |
| `level` | `'core' \| 'supporting'` | no | Visual emphasis tier |

---

## Entity: Learning Journey Stage

One step in Alishba's progression. Ordered by `order` field.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string (slug) | yes | Unique identifier |
| `order` | integer ≥ 1 | yes | Display order (sequential) |
| `title` | string | yes | Stage name (e.g., "Foundations", "First AI Models", "Agent Development") |
| `description` | string | yes | 1–3 sentence narrative of this stage |
| `timePeriod` | string | no | Date range or relative period (e.g., "2023", "Early 2024") |
| `icon` | string (URL) | no | Visual asset for stage |
| `keyLearnings` | string[] | no | Bullet list of takeaways |

**Validation Rules**:
- `order` must be unique across stages
- `id` must be URL-safe slug
- `title` ≤ 60 characters

**State Transitions**: None (static data; ordering is a content concern, not runtime state)

---

## Entity: Project

A portfolio piece shown in Projects section with Problem → Solution → Outcome framing.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string (slug) | yes | Unique identifier |
| `title` | string | yes | Project name |
| `tagline` | string | no | One-line elevator pitch |
| `problem` | string | yes | Problem statement (what was the issue?) |
| `solution` | string | yes | AI solution approach (how was AI used?) |
| `outcome` | string | no | Result/impact (what changed?) |
| `visuals` | `ProjectVisual[]` | no | Screenshots, demos, or videos |
| `technologies` | string[] | no | Stack used (e.g., "LangChain", "Python", "OpenAI") |
| `tags` | string[] | no | Display tags/categories |
| `liveUrl` | string (URL) | no | Live demo link |
| `sourceUrl` | string (URL) | no | Source code link |
| `order` | integer | no | Display order (lower = first) |
| `featured` | boolean | no | Highlight in hero or top of list |

### Embedded: ProjectVisual

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | `'image' \| 'video' \| 'embed'` | yes | Asset type |
| `src` | string (URL) | yes | Asset path/URL |
| `alt` | string | yes | Accessibility text |
| `caption` | string | no | Descriptive caption |

**Validation Rules**:
- `id` must be URL-safe slug and unique
- `problem` and `solution` required (FR-004)
- `outcome` strongly recommended but optional (some projects in progress)
- All visual URLs must be valid and loadable; alt text required (FR-012)

---

## Entity: Contact Option

A single way to reach or follow Alishba. Six required (FR-005).

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | enum | yes | One of: `contact-me`, `lets-work-together`, `lets-solve-problem`, `github`, `linkedin`, `resume` |
| `label` | string | yes | Display text (exact wording from FR-005) |
| `target` | `'form' \| 'email' \| 'externalUrl' \| 'file'` | yes | Channel type |
| `url` | string (URL) | conditional | Required when target is `externalUrl` or `file` |
| `intent` | string | yes | Description of purpose (e.g., "General inquiry", "Hire/collaborate", "Project proposal", "View code", "View profile", "Download CV") |
| `icon` | string | no | Icon identifier |
| `order` | integer | yes | Display order |

**Validation Rules**:
- Exactly 6 options must exist with the 6 required `id` values (FR-005)
- `id` values must match the exact spec: "Contact Me", "Let's Work Together", "Let's Solve a Problem", "GitHub", "LinkedIn", "Resume"
- `label` must match `id` display text (canonical mapping)
- For `file` target, URL must point to PDF
- For `externalUrl` target, must open in new tab (`target="_blank"` with `rel="noopener noreferrer"`)

**Channel Mapping**:
| id | target | behavior |
|----|--------|----------|
| `contact-me` | `form` or `email` | Opens contact form (mailto fallback if no backend) |
| `lets-work-together` | `form` or `email` | Opens hire/collaborate form with intent field |
| `lets-solve-problem` | `form` or `email` | Opens project proposal form with problem-description field |
| `github` | `externalUrl` | Opens GitHub profile in new tab |
| `linkedin` | `externalUrl` | Opens LinkedIn profile in new tab |
| `resume` | `file` | Downloads or opens PDF in new tab |

---

## Entity: Cinematic Scene

A piece of the hero entrance. Designed to be extensible (FR-013).

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string (slug) | yes | Unique scene identifier |
| `order` | integer ≥ 1 | yes | Sequence in hero timeline |
| `type` | `'character-walk' \| 'environment-pan' \| 'text-reveal' \| 'transition' \| 'particles' \| 'lighting'` | yes | Scene type |
| `duration` | number (ms) | yes | Length of this scene |
| `characterState` | string | no | Description of character pose/action (e.g., "walking forward", "turning", "glowing") |
| `environment` | string | no | Description of environment (e.g., "neon corridor", "data void", "starfield") |
| `text` | string | no | On-screen text shown during scene |
| `audioCue` | string (URL) | no | Optional sound effect |
| `reducedMotionFallback` | string | no | Description of static/reduced version |

**Validation Rules**:
- `order` must be unique and sequential (1, 2, 3, ...)
- `duration` must be positive
- All text fields must have alt text equivalents for screen readers
- `reducedMotionFallback` required for any scene involving positional/scale/rotation (vestibular safety)

**Example Default Sequence**:
1. `scene-1-environment`: Dark void reveals itself, particles coalesce (1500ms)
2. `scene-2-character-walk`: Female digital character walks into view (2500ms)
3. `scene-3-identity-reveal`: Text "ALISHBA" and "AI Agent Developer" fades in (2000ms)
4. `scene-4-transition`: Cinematic zooms out to reveal hero section (2000ms)
Total entrance duration: ~8 seconds (matches SC-001/SC-006)

---

## Entity: Visual Theme

The shared design system. Defined as CSS custom properties and Tailwind tokens.

| Field | Type | Description |
|-------|------|-------------|
| `palette` | ColorTokens | Dark futuristic color scheme |
| `typography` | TypographyTokens | Font families, sizes, weights |
| `spacing` | SpacingTokens | Margins, padding scale |
| `effects` | EffectTokens | Shadows, glows, gradients |
| `motion` | MotionTokens | Easing curves, durations |

### ColorTokens (dark, futuristic, premium)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-primary` | `#0a0a0f` | Page background (deepest) |
| `--color-bg-secondary` | `#12121a` | Section background |
| `--color-bg-tertiary` | `#1a1a24` | Card background |
| `--color-bg-elevated` | `#22222e` | Elevated surfaces |
| `--color-fg-primary` | `#f0f0f5` | Primary text (high contrast) |
| `--color-fg-secondary` | `#a0a0b0` | Secondary text |
| `--color-fg-tertiary` | `#6a6a7a` | Muted text |
| `--color-accent-primary` | `#00d4ff` | Cyan — primary accent, links, buttons |
| `--color-accent-secondary` | `#7c3aed` | Deep purple — secondary accent, gradients |
| `--color-accent-glow` | `rgba(0,212,255,0.5)` | Glow effects, hovers |
| `--color-border` | `#2a2a3a` | Borders, dividers |
| `--color-error` | `#ff4d6d` | Error states |
| `--color-success` | `#00ff88` | Success states |

### TypographyTokens

| Token | Value | Usage |
|-------|-------|-------|
| `--font-heading` | `'Space Grotesk', sans-serif` | Headings, hero text |
| `--font-body` | `'Inter', system-ui, sans-serif` | Body text |
| `--font-mono` | `'JetBrains Mono', monospace` | Code, technical labels |
| `--text-hero` | `clamp(2.5rem, 8vw, 6rem)` | Hero name/title |
| `--text-h1` | `clamp(2rem, 5vw, 3.5rem)` | Section headings |
| `--text-h2` | `clamp(1.5rem, 3vw, 2.25rem)` | Subheadings |
| `--text-body` | `1rem` / `1.125rem` | Body text |
| `--text-small` | `0.875rem` | Captions, metadata |

### MotionTokens

| Token | Value | Usage |
|-------|-------|-------|
| `--ease-cinematic` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Cinematic entrance easing |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Exits, dismissals |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Loops, ambient motion |
| `--duration-fast` | `200ms` | Micro-interactions |
| `--duration-normal` | `400ms` | Standard transitions |
| `--duration-slow` | `800ms` | Cinematic beats |
| `--duration-hero` | `8000ms` | Total hero entrance (SC-006) |

### EffectTokens

| Token | Value | Usage |
|-------|-------|-------|
| `--glow-sm` | `0 0 8px var(--color-accent-glow)` | Subtle interactive glow |
| `--glow-md` | `0 0 16px var(--color-accent-glow)` | Button hover, focus |
| `--glow-lg` | `0 0 32px var(--color-accent-glow)` | Hero accents, highlights |
| `--gradient-futuristic` | `linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)` | Primary gradient |
| `--gradient-dark` | `linear-gradient(180deg, #0a0a0f 0%, #12121a 100%)` | Background gradient |
| `--shadow-card` | `0 8px 32px rgba(0,0,0,0.4)` | Card elevation |
| `--backdrop-blur` | `blur(12px) saturate(180%)` | Glassmorphism effects |

---

## Relationships

```
Profile (Alishba)
├── has many → Skill (embedded)
├── has many → LearningJourneyStage
├── has many → Project
│   └── has many → ProjectVisual (embedded)
└── has many → ContactOption

CinematicScene (independent)
└── referenced by → Hero section timeline

VisualTheme (global singleton)
└── applied to → all components
```

---

## Data Files Location

```
/src/data/
├── profile.ts          // Alishba singleton + Skills
├── learning-journey.ts // LearningJourneyStage[]
├── projects.ts         // Project[]
├── contact-options.ts  // ContactOption[]
├── cinematic-scenes.ts // CinematicScene[]
└── theme.ts            // VisualTheme tokens (or via CSS custom properties)
```

---

## Content Source Constraints

- All content (name, role, projects, bio, journey, URLs) will be provided by Alishba
- Resume will be supplied as PDF in `/public/resume.pdf`
- GitHub and LinkedIn URLs must be verified public profiles
- No fabricated content — fields with `NEEDS CLARIFICATION` will block implementation if missing