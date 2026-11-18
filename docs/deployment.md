# Production Deployment Guide: Alishba Immersive AI Portfolio

> **Feature**: Phase 10 Polish & Cross-Cutting Concerns (T100)  
> **Supported Targets**: Vercel (Recommended), Netlify, Docker, Node.js Server, Static HTML Export

---

## 1. Zero-Configuration Deployment (Vercel)

1. Push your repository to GitHub or GitLab.
2. Import the project into your [Vercel Dashboard](https://vercel.com).
3. Framework Preset: **Next.js**.
4. Root Directory: `./`.
5. Environment Variables (optional, configure as needed):
   - `NEXT_PUBLIC_SITE_URL`: e.g. `https://alishba.dev`
   - `RESEND_API_KEY`: e.g. `re_123456789`
   - `CONTACT_EMAIL`: e.g. `alishba@example.com`
   - `NEXT_PUBLIC_ENABLE_ANALYTICS`: `true`
6. Click **Deploy**. Vercel will automatically build the Next.js production bundle with edge optimization.

---

## 2. Docker Container Deployment

Create a containerized deployment for self-hosted Kubernetes or cloud environments:

```dockerfile
# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t alishba-portfolio:latest .
docker run -p 3000:3000 alishba-portfolio:latest
```

---

## 3. Production Verification Checklist

Before launch, verify:
- [x] TypeScript compilation: `npm run typecheck` (0 errors)
- [x] ESLint linting: `npm run lint` (0 errors)
- [x] Extensibility automated suite: `node scripts/test-extensibility.mjs` (5/5 passed)
- [x] Production build: `npm run build`
- [x] Robots & Sitemap: inspect `https://<domain>/sitemap.xml` and `https://<domain>/robots.txt`
- [x] Health Check: verify `GET https://<domain>/api/health` returns HTTP 200 `{ status: "ok" }`
- [x] Resume availability: ensure `/resume.pdf` is accessible and downloads properly
