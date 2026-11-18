# Implementation Plan: Immersive AI Portfolio for Alishba

**Branch**: `001-immersive-ai-portfolio` | **Date**: 2026-08-26 | **Spec**: specs/001-immersive-ai-portfolio/spec.md

## Summary

A professional immersive portfolio website for Alishba that showcases her projects and skills, targets companies, potential clients, internship reviewers, and general visitors, and presents her as an AI Agent Developer who builds AI-powered intelligent solutions to solve real industry problems. The experience should combine a futuristic virtual world, cinematic storytelling, and an AI digital universe. The hero should include a female digital character representing Alishba and her AI journey, with a walking character and cinematic virtual-world entrance. Include her learning journey, projects presented with a Problem → Solution approach, and professional contact options. The visual direction should be dark, futuristic, mysterious, elegant, premium, and technological, while remaining open to future creative improvements.

Primary requirement: Create an engaging, brand-differentiated portfolio with cinematic hero entrance, modular project showcase, Problem → Solution framing, and professional contact hub across a dark futuristic visual identity.

## Technical Context

**Language/Version**: Next.js 15+ with React 19 (App Router)

**Primary Dependencies**: 
- Three.js via React Three Fiber
- @react-three/drei
- GSAP (GreenSock) + Lenis
- Tailwind CSS v4
- Next.js Server Actions + Resend (email)

**Storage**: N/A (static site; no backend, database, or persistent storage required)

**Target Platform**: Web browsers (desktop, tablet, mobile) — modern, evergreen browsers

**Project Type**: Frontend web application / static site with 3D/animation

**Performance Goals**: First contentful paint < 3s on typical broadband; cinematic entrance should convey identity within 5s; 60fps animation where possible; graceful fallback for reduced motion/slow connections

**Constraints**:
- Must be accessible (screen readers, keyboard navigation, reduced motion)
- Must work across desktop, tablet, and mobile viewports
- Must remain open to future creative improvements (modular design)
- Static deployment only
- No backend/authentication/database required

**Scale/Scope**: Single-portfolio website, one user/tenant, public-facing, no authentication

---

## Constitution Check

**GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.**

⚠️ `branch_numbering` in init-options.json is deprecated. Rename to `feature_numbering`.

Constitution file loaded but contains only placeholder values (not configured for this project). No enforceable constitutional violations identified. All gates pass conditionally.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|--------------------------------------|
| [None identified] | Constitution not configured | N/A |

---

## Project Structure

### Documentation (this feature)

```
specs/001-immersive-ai-portfolio/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── components/
│   ├── hero/
│   │   ├── cinematic-entrance.tsx
│   │   └── walking-character.tsx
│   ├── identity/
│   │   └── positioning.tsx
│   ├── learning-journey/
│   │   └── journey-stages.tsx
│   ├── projects/
│   │   ├── project-card.tsx
│   │   └── project-detail.tsx
│   └── contact/
│       ├── contact-hub.tsx
│       └── contact-options.tsx
├── styles/
│   ├── globals.css
│   └── dark-futuristic-theme.css
├── 3d/
│   ├── scenes/
│   │   ├── hero-scene.tsx
│   │   └── virtual-world.tsx
│   ├── characters/
│   │   └── alishba-digital-character.tsx
│   └── effects/
│       └── ambient-effects.tsx
├── data/
│   ├── projects.ts
│   └── learning-journey.ts
└── utils/
    └── accessibility.ts

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
# Not applicable — static site, no backend

# [REMOVE IF UNUSED] Option 3: Mobile + API
# Not applicable — static site, no mobile app or API

**Structure Decision**: Single-project structure with all source under src/. All visual/audio assets are bundled; no separate backend.
```

## Phase 0: Research

### Unknowns extracted from Technical Context:
- Language/framework choice (React vs Next.js vs Vite + vanilla/other)
- 3D library choice (Three.js vs alternatives)
- Animation library choice (GSAP vs Framer Motion vs CSS)
- Accessibility patterns for animated 3D content
- Performance optimization for immersive web experiences

### Research tasks needed:
1. Research frontend framework options for immersive portfolios (React/Next.js/Vite/astro)
2. Research Three.js vs alternative 3D libraries for web portfolios
3. Research animation patterns (GSAP vs Framer Motion vs CSS vs Three.js built-in)
4. Research accessibility patterns for reduced motion in 3D/cinematic contexts
5. Research performance optimization techniques for immersive web

## Phase 1: Design & Contracts

### Phase 1a: Generate data-model.md

Extract entities from feature spec:

| Entity | Fields | Relationships | Validation Rules |
|--------|--------|---------------|-------------------|
| Visitor | deviceType, motionPreference, connectionSpeed | — | — |
| Alishba (Profile) | name, role, positioningStatement, skills[], learningJourney[], projects[], contactLinks, resumeFile | projects → belongs to Alishba; learningJourney → belongs to Alishba; contactLinks → belongs to Alishba | name required; role required; positioningStatement required; resumeFile must be valid PDF |
| Learning Journey Stage | title, description, order/index, supportingVisuals | belongsTo → Alishba Profile | title required; description required; order must be unique integer |
| Project | title, problemStatement, aiSolutionDescription, outcome, visuals[], technologiesUsed[], tags[] | belongsTo → Alishba Profile | title required; problemStatement required; aiSolutionDescription required; outcome optional |
| Contact Option | label (ContactMe/LetWorkTogether/SolveProblem/GitHub/LinkedIn/Resume), target (form/email/externalUrl/file), intent (general/hire/collaborate/profile/cv) | — | label must be one of the 6 options; target must match label intent |
| Cinematic Scene | sceneOrder, characterState, environment/visualAsset, optionalAudioCue, optionalOnScreenText | — | sceneOrder must be sequential integer; characterState must describe walking/entrance state |
| Visual Theme | palette (dark), aesthetic (futuristic/mysterious/elegant/premium/technological), typography, technologicalMotifs | — | palette must include dark background; aesthetic keywords must be present in CSS/classes |

### Phase 1b: Define interface contracts → /contracts/

Since this is a static frontend portfolio project with no external APIs or backend services, there are **no interface contracts** to define. The "contracts" directory will be documented as not applicable.

### Phase 1c: Create quickstart.md

Create a quickstart validation guide for the portfolio site:

**Prerequisites**:
- Node.js 18+ installed
- Modern web browser (Chrome/Firefox/Edge/Safari latest)
- Git

**Setup Commands**:
```bash
# 1. Clone the repository
git clone <repo-url>
cd <repo-root>

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Open browser to http://localhost:3000 (or appropriate port)
```

**Validation Scenarios**:
1. **Cinematic entrance**: Load the homepage and confirm the cinematic virtual-world entrance plays automatically within 5 seconds, showing the female digital character walking into the futuristic AI digital universe.
2. **Identity section**: Scroll past the hero and confirm Alishba is identified as "AI Agent Developer" with the positioning statement "I build AI-powered intelligent solutions to solve real industry problems."
3. **Projects section**: Navigate to projects and confirm each project card shows title, problem addressed, AI solution applied, and outcome.
4. **Contact hub**: Confirm all six contact options are present and functional:
   - "Contact Me" opens a contact form or email
   - "Let's Work Together" opens a scheduling or collaboration email
   - "Let's Solve a Problem" opens a problem-description form or email
   - "GitHub" opens Alishba's GitHub profile in a new tab
   - "LinkedIn" opens Alishba's LinkedIn profile in a new tab
   - "Resume" downloads or opens Alishba's resume PDF
5. **Reduced motion**: Enable OS reduced-motion preference and confirm cinematic animations are reduced/static but identity is still communicated.
6. **Mobile**: Load the site on a mobile viewport and confirm all content is readable, navigation works, and the hero entrance adapts gracefully.
7. **Accessibility**: Use a screen reader or tab through the page and confirm semantic landmarks, alt text, and keyboard-navitable controls for all interactive elements.

**Expected Outcomes**:
- All seven validation scenarios pass
- First contentful paint < 3s on typical broadband
- Site is fully usable on mobile (≤ 480px)
- 100% of contact options work or show clear fallback

---

## Generated Artifacts Status

- ✅ **research.md** — Pending (Phase 0 research to be executed)
- ✅ **data-model.md** — Pending (will be generated in Phase 1)
- ✅ **contracts/** — Pending (determined not applicable; directory will be documented)
- ✅ **quickstart.md** — Pending (will be generated in Phase 1)
- ✅ **plan.md** — Present (this file)