# Quickstart: Immersive AI Portfolio for Alishba

**Created**: 2026-08-26
**Feature**: specs/001-immersive-ai-portfolio/spec.md

---

## Prerequisites

| Requirement | Version/Details |
|-------------|-----------------|
| Node.js | 18.0+ (LTS recommended) |
| Package manager | npm (bundled with Node), pnpm, or yarn |
| Git | Latest version |
| Browser | Chrome 120+, Firefox 121+, Safari 17+, Edge 120+ (for full 3D/animation support) |
| Text editor / IDE | VS Code recommended with recommended extensions listed below |

### Recommended VS Code Extensions

- `dbaeumer.vscode-eslint` — ESLint
- `esbenp.prettier-vscode` — Prettier formatter
- `bradlc.vscode-tailwindcss` — Tailwind CSS IntelliSense
- `ms-vscode.vscode-typescript-next` — TypeScript support
- `christian-kohler.path-intellisense` — Path IntelliSense

---

## Setup

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd <repository-name>
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs all packages including Next.js, React Three Fiber, GSAP, Tailwind CSS, and development tools.

### Step 3: Configure Environment (Optional)

If using contact forms with email delivery:

```bash
# Create .env.local in project root
cp .env.example .env.local
```

Add required environment variables:
```bash
RESEND_API_KEY=re_your_key_here
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_key
RECAPTCHA_SECRET_KEY=your_secret_key
```

### Step 4: Add Content Data

Populate the content files in `/src/data/`:

1. **`/src/data/profile.ts`** — Add Alishba's name, role, bio, skills, contact URLs
2. **`/src/data/projects.ts`** — Add portfolio projects with Problem → Solution → Outcome
3. **`/src/data/learning-journey.ts`** — Add learning journey stages
4. **`/src/data/contact-options.ts`** — Configure the six contact options
5. **`/src/data/cinematic-scenes.ts`** — Define the hero cinematic sequence
6. **`/public/resume.pdf`** — Place Alishba's resume PDF in public folder

### Step 5: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Validation Scenarios

Run through these scenarios to validate the portfolio is working correctly. Each scenario maps to a functional requirement from the spec.

### Scenario 1: Cinematic Hero Entrance (FR-001, SC-001)

**Prerequisites**: Modern browser with WebGL support, sound enabled (optional)

**Steps**:
1. Open `http://localhost:3000`
2. Observe the cinematic entrance loading
3. Confirm a female digital character walks into a futuristic AI digital universe
4. Confirm the entrance resolves to hero headline, tagline, and navigation within 8 seconds
5. Check browser console for any WebGL errors

**Expected Outcome**: Cinematic entrance plays automatically; identity (Alishba, AI Agent Developer) is communicated within 5 seconds.

**Failure Indicators**: Black screen, WebGL errors in console, animation freezes, text unreadable.

---

### Scenario 2: Reduced Motion Fallback (FR-010, SC-005)

**Prerequisites**: OS-level reduced motion preference enabled, or use browser DevTools

**Steps**:
1. Enable OS reduced motion preference (System Preferences → Accessibility → Display → Reduce motion) OR in Chrome DevTools: `Esc` → `...` → More tools → Sensors → Emulate reduced motion
2. Reload `http://localhost:3000`
3. Confirm cinematic animations are reduced or replaced with static equivalents
4. Confirm identity and theme are still communicated

**Expected Outcome**: Site is fully functional with reduced animations; AI digital universe identity is still conveyed; no positional/scale vestibular triggers.

**Failure Indicators**: Full cinematic animations still play, identity/theme lost, accessibility violation.

---

### Scenario 3: Identity & Skills (FR-002, SC-001)

**Steps**:
1. Scroll past the hero section
2. Locate the Identity section
3. Confirm Alishba's name is displayed
4. Confirm her role is "AI Agent Developer"
5. Confirm the positioning statement: "I build AI-powered intelligent solutions to solve real industry problems" (or equivalent)
6. Scan the Skills section and count visible skills

**Expected Outcome**: Within 30 seconds, a first-time visitor can state name, role, and at least 5 core skills.

**Failure Indicators**: Missing name, role, or positioning statement; skills section empty or unreadable.

---

### Scenario 4: Learning Journey (FR-003)

**Steps**:
1. Scroll to the Learning Journey section (or navigate via nav)
2. Identify at least three distinct stages
3. Confirm the narrative follows a clear chronological or thematic progression
4. If interactive: click a stage to expand details

**Expected Outcome**: Clear story-driven narrative of Alishba's AI development journey with at least 3 stages.

**Failure Indicators**: No clear progression, stages out of order, no narrative framing.

---

### Scenario 5: Projects Showcase (FR-004, SC-002)

**Steps**:
1. Navigate to the Projects section
2. For each visible project card, verify:
   - Project title is present
   - Problem statement is visible (what was the issue?)
   - AI Solution is described (how was AI used?)
   - Outcome is stated (what changed?)
3. Click on one project to open the detail view
4. Confirm the expanded view has the same Problem → Solution → Outcome structure plus supporting visuals

**Expected Outcome**: Every project card clearly shows the Problem → Solution → Outcome triad. 90% of visitors can recall at least 2 projects after 60 seconds.

**Failure Indicators**: Project missing problem, solution, or outcome; cards are generic/descriptions without framing; recall test fails.

---

### Scenario 6: Contact Hub — All Six Options (FR-005, FR-007, FR-008, SC-003)

**Steps**:
1. Locate the Contact Hub (footer or dedicated section)
2. Verify all six options are present and labeled:
   - [ ] Contact Me
   - [ ] Let's Work Together
   - [ ] Let's Solve a Problem
   - [ ] GitHub
   - [ ] LinkedIn
   - [ ] Resume
3. Click GitHub — verify it opens Alishba's GitHub in a new tab
4. Click LinkedIn — verify it opens Alishba's LinkedIn in a new tab
5. Click Resume — verify it downloads or opens the PDF
6. Click Contact Me / Let's Work Together / Let's Solve a Problem — verify each routes to an appropriate form or email

**Expected Outcome**: All 6 contact options are present, labeled correctly, and route to the correct destination. All external links open in new tabs with proper security attributes.

**Failure Indicators**: Fewer than 6 options; labels incorrect; links broken; wrong destination; no new-tab security attributes.

---

### Scenario 7: Mobile Responsiveness (FR-011, SC-004)

**Steps**:
1. Open DevTools (F12) → Toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M)
2. Set viewport to mobile (e.g., iPhone 12: 390×844)
3. Reload the page
4. Check:
   - [ ] Hero entrance adapts (cinematic character visible or gracefully replaced)
   - [ ] Navigation is accessible (hamburger menu or scrollable nav)
   - [ ] All sections are readable (text doesn't overflow, images scale)
   - [ ] Contact hub is usable (all 6 options tappable, minimum 44px touch targets)
   - [ ] No horizontal scroll
5. Test on tablet viewport (e.g., iPad: 768×1024)

**Expected Outcome**: Site is fully usable on mobile (≤ 480px) and tablet viewports. All content readable, navigation functional, hero entrance adapts gracefully.

**Failure Indicators**: Horizontal overflow; text too small; hero unusable; contact options inaccessible.

---

### Scenario 8: Accessibility Audit (FR-012, SC-007)

**Steps**:
1. Use keyboard only (Tab, Shift+Tab, Enter, Space, Escape) to navigate:
   - [ ] All interactive elements are reachable via Tab
   - [ ] Focus order is logical
   - [ ] Focus indicators are visible
   - [ ] Skip-to-content link exists
2. Use a screen reader (NVDA on Windows, VoiceOver on Mac, or ChromeVox extension):
   - [ ] Page has proper landmark regions (`<header>`, `<main>`, `<nav>`, `<footer>`)
   - [ ] Heading hierarchy is logical (one `<h1>`, nested `<h2>`, `<h3>`)
   - [ ] Images have alt text (decorative images have `alt=""` or `role="presentation"`)
   - [ ] Form inputs have labels
   - [ ] Buttons have accessible names
3. Run automated accessibility check (axe DevTools extension or Lighthouse):
   - [ ] Zero critical/high violations
   - [ ] Contrast ratios meet WCAG AA (4.5:1 for body text, 3:1 for large text)

**Expected Outcome**: Site passes basic accessibility checks. Semantic landmarks, alt text, contrast, keyboard navigation all functional.

**Failure Indicators**: Missing landmarks; missing alt text; low contrast; keyboard traps; screen reader inaccessible content.

---

### Scenario 9: Performance Budget (SC-006)

**Steps**:
1. Open DevTools → Lighthouse tab
2. Select "Navigation" mode, "Mobile" device, check "Performance"
3. Run audit
4. Check results:
   - [ ] First Contentful Paint < 1.5s
   - [ ] Largest Contentful Paint < 2.5s
   - [ ] Total Blocking Time < 200ms
   - [ ] Cumulative Layout Shift < 0.1
5. Check bundle size:
   ```bash
   npm run build
   # Check output: initial JS bundle should be < 150KB gzipped
   ```

**Expected Outcome**: Performance metrics meet targets. First contentful paint conveys identity within 3s on typical broadband.

**Failure Indicators**: Metrics red on Lighthouse; long blocking time; layout shifts; oversized bundles.

---

### Scenario 10: Modular Extensibility (FR-013, SC-008)

**Steps**:
1. Add a new project to `/src/data/projects.ts`:
   ```typescript
   {
     id: 'example-project',
     title: 'Example Project',
     problem: 'A sample problem statement',
     solution: 'An AI-powered solution approach',
     outcome: 'Measurable result',
     technologies: ['Python', 'LangChain'],
     featured: true
   }
   ```
2. Run `npm run dev`
3. Navigate to Projects section
4. Confirm the new project appears correctly formatted

**Expected Outcome**: New project added without structural redesign; Problem → Solution → Outcome format preserved; existing projects unaffected.

**Failure Indicators**: New project breaks layout; format inconsistent; requires code changes outside data layer.

---

## Troubleshooting

| Issue | Likely Cause | Solution |
|-------|--------------|----------|
| Black screen on load | WebGL not supported or blocked | Check browser supports WebGL; try Chrome |
| Cinematic entrance missing | Missing GLTF/3D assets | Check `/public/models/` or `/public/scenes/` for assets |
| Contact form not sending | Missing `RESEND_API_KEY` env var | Add to `.env.local` |
| Slow build times | Large 3D assets | Lazy-load Three.js; compress textures |
| Reduced motion not working | `prefers-reduced-motion` query not wired | Check `gsap.matchMedia()` setup in code |
| Mobile hero broken | Canvas sizing issues | Check R3F `Canvas` props (`camera`, `dpr`, sizing) |

---

## Next Steps

After validating all scenarios:

1. **Customize content**: Replace placeholder data with Alishba's real information
2. **Add 3D assets**: Commission or create the female digital character model and virtual world scenes
3. **Configure deployment**: Set up Vercel, Cloudflare Pages, or GitHub Pages
4. **Add analytics**: Integrate privacy-friendly analytics (Plausible, Fathom, or Umami)
5. **SEO optimization**: Add metadata, OG images, sitemap
6. **Future creative improvements**: Add new cinematic scenes per FR-013

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript compiler (no emit) |