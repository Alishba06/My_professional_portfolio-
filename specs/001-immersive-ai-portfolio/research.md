# Research: Immersive AI Portfolio for Alishba

**Created**: 2026-08-26
**Feature**: specs/001-immersive-ai-portfolio/spec.md

---

## Phase 0: Research Summary

This document consolidates findings from research into the technical unknowns identified in the planning phase. Each decision is documented with rationale and alternatives considered.

---

## Decision 1: Frontend Framework

**Decision**: **Next.js 15+ (App Router) with React 19**

**Rationale**:
- Industry standard for static portfolio sites with excellent SSG/ISR support via `output: 'export'`
- Native Server Components + Server Actions enable contact forms without API routes
- Zero-config deployment to Vercel; static export works on GitHub Pages, Cloudflare Pages, Netlify
- Built-in image optimization, font optimization, and script loading strategies
- React 19 brings concurrent features, use(), and improved hydration
- App Router enables hybrid rendering (static for pages, server for contact form)
- Strong ecosystem for Three.js integration via React Three Fiber

**Alternatives Considered**:
| Option | Pros | Cons | Rejected Because |
|--------|------|------|------------------|
| Vite + React SPA | Simpler build, no framework lock-in | No SSG/ISR, manual routing, no Server Components | Lacks native contact form handling without backend |
| Astro | Excellent static performance, islands architecture | Smaller ecosystem, less Three.js/GSAP integration examples | Limited React Three Fiber community support |
| SvelteKit | Great performance, simple | Smaller 3D/animation ecosystem | React Three Fiber/GSAP patterns are React-centric |
| Remix | Good SSR, data loading | Overkill for static portfolio | Not needed for purely static site |

---

## Decision 2: 3D / WebGL Library

**Decision**: **Three.js via React Three Fiber (R3F) + @react-three/drei**

**Rationale**:
- React Three Fiber is the de facto standard for Three.js in React ecosystems
- Declarative, component-based API aligns with React patterns
- @react-three/drei provides 50+ production-ready helpers (OrbitControls, Html, Text, Effects, etc.)
- Excellent TypeScript support
- Proven in production cinematic portfolios (VertexFlow, K-Kaitezidis, Mountain Portfolio)
- Decouples 3D render loop from React DOM updates for 60fps performance
- Built-in instancing, frustum culling, and performance optimizations

**Alternatives Considered**:
| Option | Pros | Cons | Rejected Because |
|--------|------|------|------------------|
| Raw Three.js | Full control, smaller bundle | Imperative, manual state sync with React | Higher maintenance, error-prone |
| Babylon.js | Powerful engine, good TS | Different paradigm, less React integration | R3F is purpose-built for React |
| Threlte (Svelte) | Native Svelte integration | Requires Svelte | Framework mismatch |
| WebGL raw / regl | Maximum control | Massive boilerplate | Unnecessary complexity |

---

## Decision 3: Animation Library

**Decision**: **GSAP (GreenSock) + ScrollTrigger + Lenis**

**Rationale**:
- GSAP is the industry standard for complex, timeline-based web animations
- ScrollTrigger enables scroll-driven cinematic sequences (parallax, pinning, scrub)
- Lenis provides smooth, physics-based scrolling that works with GSAP ScrollTrigger
- Both handle `prefers-reduced-motion` via `gsap.matchMedia()` natively
- Used in all major cinematic portfolio references (VertexFlow, K-Kaitezidis, Mountain Portfolio)
- Timeline-based approach suits cinematic entrance sequences
- Plugin ecosystem (ScrollTo, Draggable, MotionPath, Flip)

**Alternatives Considered**:
| Option | Pros | Cons | Rejected Because |
|--------|------|------|------------------|
| Framer Motion | React-native, great for layout animations | Less powerful for scroll-driven cinematic timelines | GSAP superior for narrative/sequential animations |
| CSS Animations | Zero dependency, hardware accelerated | Cannot orchestrate complex sequences, no scroll-scrub | Too limited for cinematic entrance |
| Motion One (WAAPI) | Small, standards-based | Limited scroll integration | GSAP ScrollTrigger unmatched for this use case |

---

## Decision 4: Accessibility & Reduced Motion

**Decision**: **Multi-layered approach using gsap.matchMedia(), manual UI toggle, and semantic fallbacks**

**Implementation Pattern**:
```javascript
// 1. OS-level detection via gsap.matchMedia()
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  // Full cinematic animations
});
mm.add("(prefers-reduced-motion: reduce)", () => {
  // Simplified: opacity fades only, no positional/scale/rotation
});

// 2. Manual user toggle (persists in localStorage)
// Allows user to override OS setting per-site

// 3. Three.js: gate requestAnimationFrame and camera tweens
// 4. Provide semantic HTML fallbacks for all cinematic content
// 5. Ensure all interactive elements remain keyboard-navigable
```

**Rationale**:
- GSAP's matchMedia is the canonical pattern for reduced motion in animation
- Manual toggle addresses users who want motion but OS says otherwise (or vice versa)
- Three.js render loop must be explicitly gated — it doesn't auto-respect CSS motion
- Cinematic content (walking character, particle systems) must have static equivalents
- Vestibular disorder triggers (large swipes, flashing) must be avoided in reduced mode

---

## Decision 5: Styling & Design System

**Decision**: **Tailwind CSS v4 + CSS Custom Properties for theming**

**Rationale**:
- Tailwind v4 has zero-config, Rust-based engine, native CSS cascade
- Dark mode via `media` or `class` strategy supports the dark futuristic theme
- CSS Custom Properties enable dynamic theming (futuristic color tokens)
- Works seamlessly with Three.js canvas overlays
- No runtime CSS-in-JS overhead

**Design Tokens (CSS Custom Properties)**:
```css
:root {
  --color-bg-primary: #0a0a0f;
  --color-bg-secondary: #12121a;
  --color-bg-tertiary: #1a1a24;
  --color-fg-primary: #f0f0f5;
  --color-fg-secondary: #a0a0b0;
  --color-accent-primary: #00d4ff;  /* Futuristic cyan */
  --color-accent-secondary: #7c3aed; /* Deep purple */
  --color-accent-glow: #00d4ff80;
  --font-heading: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', system-ui;
  --easing-cinematic: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

---

## Decision 6: Contact Form Handling

**Decision**: **Next.js Server Actions + Resend (email) + reCAPTCHA v3**

**Rationale**:
- Server Actions run on server without API routes — zero additional infrastructure
- Resend provides developer-friendly email API with queue/retry/deliverability
- reCAPTCHA v3 is invisible to users, scores submissions server-side
- Rate limiting via Upstash Redis (or in-memory for low traffic) prevents abuse
- Works with static export (Server Actions compile to lambda functions on Vercel)
- Alternative: Formspree/Netlify Forms for even simpler setup if email is sufficient

**Three Contact Intents Mapped**:
| Contact Option | Intent | Server Action |
|----------------|--------|---------------|
| Contact Me | General inquiry | `submitContactForm()` |
| Let's Work Together | Hire/collaborate | `submitHireForm()` |
| Let's Solve a Problem | Project proposal | `submitProblemForm()` |

All three can share one form component with intent field; Resend templates differentiate emails.

---

## Decision 7: Content Management & Data

**Decision**: **TypeScript/JSON data files in `/src/data/`**

**Rationale**:
- No CMS needed for single-portfolio, single-user site
- Type-safe, version-controlled, no external dependency
- Easy to extend for "future creative improvements"
- Static import enables build-time validation and optimization
- Projects, Learning Journey, Profile data all follow this pattern

**Structure**:
```
/src/data/
├── profile.ts          // Alishba's identity, skills, links, resume path
├── projects.ts         // Array of Project objects (Problem/Solution/Outcome)
├── learning-journey.ts // Array of Stage objects
└── contact-options.ts  // Contact hub configuration
```

---

## Decision 8: Deployment & Performance

**Decision**: **Static export (`output: 'export'`) to Vercel or Cloudflare Pages**

**Rationale**:
- True static files — fastest possible delivery, zero server cost
- Works globally on edge CDN
- No server-side rendering complexity
- Image optimization via `images: { unoptimized: true }` or remotePatterns
- Font optimization via `next/font` (Google Fonts self-hosted)
- Script loading strategy: `next/script` with `strategy="lazyOnload"` for 3D libs

**Performance Budget**:
- First Contentful Paint: < 1.5s (target)
- Largest Contentful Paint: < 2.5s
- Total Blocking Time: < 200ms
- Cumulative Layout Shift: < 0.1
- JS bundle (gzipped): < 150KB initial + 3D libs lazy-loaded

---

## Research Summary Table

| Area | Decision | Key Library/Tool |
|------|----------|------------------|
| Framework | Next.js 15+ App Router | next@latest, react@19 |
| 3D Engine | Three.js via R3F | @react-three/fiber, @react-three/drei, three@latest |
| Animation | GSAP + ScrollTrigger + Lenis | gsap@latest, @gsap/react, lenis@latest |
| Styling | Tailwind CSS v4 | tailwindcss@latest, @tailwindcss/postcss |
| Forms | Next.js Server Actions + Resend | resend@latest, reCAPTCHA v3 |
| Deployment | Static export to Vercel/Cloudflare | next.config.js output: 'export' |
| Accessibility | gsap.matchMedia + manual toggle + semantic HTML | Native browser APIs |

---

## Open Questions (Resolved in Phase 1 Design)

1. **Character animation approach**: 3D model (GLTF) vs 2D sprite sheets vs CSS/SVG animation — will be decided in data-model/design phase based on asset availability
2. **Scene composition**: Single long canvas vs multiple section canvases — determined by performance testing
3. **Audio handling**: Web Audio API vs simple `<audio>` — spec says audio is enhancement only, so minimal implementation

---

## Sources

- [Modern React & Next.js Fundamentals (Strapi, 2025)](https://strapi.io/blog/react-best-practices)
- [VertexFlow: Immersive 3D Portfolio (salonyranjan)](https://github.com/salonyranjan/VertexFlow)
- [K-Kaitezidis Portfolio (KlawsFX)](https://klawsfx.com/work/kaitezidis-portfolio)
- [Priyanshu-Upadhyay Portfolio](https://github.com/Priyanshu-Upadhyay-27/priyanshu-portfolio)
- [Mountain Portfolio (ArthurTorres75)](https://github.com/ArthurTorres75/mountain-portfolio)
- [GSAP Accessible Animation Guide](https://gsap.com/resources/a11y/)
- [Next.js Static Export Documentation](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)