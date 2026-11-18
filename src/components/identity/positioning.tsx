'use client';

/**
 * Positioning & Architectural Identity Component
 * High-Tech Virtual World Cybernetic Aesthetic with Neon Gradients & Animations
 */

import React from 'react';
import {
  Sparkles,
  Cpu,
  Layers,
  ShieldCheck,
  ArrowDown,
  Terminal,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import { profile as defaultProfile } from '@/data/profile';
import { trackEvent } from '@/utils/analytics';
import type { Profile } from '@/types/portfolio';

export interface PositioningProps {
  profile?: Profile;
}

export function Positioning({ profile }: PositioningProps) {
  const profileData = profile || defaultProfile;

  const handleSkillsClick = () => {
    trackEvent('positioning_cta_click', { action: 'evaluate_skills' });
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToSection = (sectionId: string) => {
    trackEvent('positioning_cta_click', { action: `navigate_${sectionId}` });
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="identity"
      aria-labelledby="identity-heading"
      className="relative z-10 w-full overflow-hidden border-t border-cyan-500/20 bg-[#02040a] px-4 py-24 sm:px-6 lg:px-8"
    >
      {/* Background Volumetric Glows */}
      <div
        className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-transparent blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 -right-20 h-[500px] w-[500px] rounded-full bg-gradient-to-bl from-purple-500/15 via-fuchsia-500/10 to-transparent blur-[140px]"
        aria-hidden="true"
      />

      {/* Cyber Grid Lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0, 240, 255, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Top Status & Specialization Pill */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-gradient-to-r from-cyan-950/40 via-purple-950/30 to-slate-900/60 px-4 py-1.5 font-mono text-xs tracking-wider text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.2)] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
              </span>
              AI AGENT DEVELOPER // AI AUTOMATION
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/20 bg-[#060c22]/70 px-3.5 py-1.5 text-xs font-medium text-gray-300 backdrop-blur-md">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 animate-pulse" aria-hidden="true" />
              <span>Open to AI Internships &amp; Opportunities</span>
            </div>
          </div>
        </div>

        {/* Main Identity & Role Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Name, Role, Positioning Statement */}
          <div className="lg:col-span-7">
            <h1
              id="identity-heading"
              className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl font-sans"
            >
              <span className="mb-2 block font-mono text-base tracking-normal text-cyan-400/90 sm:text-lg">
                &lt;Hello, I am /&gt;
              </span>
              <span className="bg-gradient-to-r from-cyan-300 via-sky-100 to-fuchsia-400 bg-clip-text text-transparent">
                {profileData.name}
              </span>
            </h1>

            <div className="mt-3 flex items-center gap-3">
              <span className="inline-block font-mono text-xl font-bold text-gray-200 sm:text-2xl">
                {profileData.role}
              </span>
              <span className="rounded bg-cyan-500/10 px-2 py-0.5 font-mono text-xs text-cyan-300 border border-cyan-400/30">
                BUILDING AI SOLUTIONS
              </span>
            </div>

            {/* Positioning Statement Callout with Holographic Glow */}
            <div className="group relative mt-8 overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-[#060c22]/90 via-[#0a1435]/70 to-[#030714]/90 p-6 shadow-[0_8px_32px_rgba(0,240,255,0.12)] backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/60 hover:shadow-[0_12px_40px_rgba(0,240,255,0.2)] sm:p-8">
              {/* Corner brackets */}
              <div className="cyber-corner-tl" />
              <div className="cyber-corner-tr" />
              <div className="cyber-corner-bl" />
              <div className="cyber-corner-br" />

              {/* Animated glowing vertical spine */}
              <div
                className="absolute -left-1 bottom-6 top-6 w-1 rounded-full bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-500 shadow-[0_0_12px_#00f0ff]"
                aria-hidden="true"
              />

              <blockquote className="pl-4 font-sans text-lg font-medium leading-snug text-white sm:text-xl">
                &ldquo;{profileData.positioningStatement}&rdquo;
              </blockquote>
              {profileData.tagline && (
                <p className="mt-4 pl-4 font-mono text-xs leading-relaxed text-cyan-300/80 sm:text-sm">
                  // {profileData.tagline}
                </p>
              )}
            </div>

            {/* Executive Bio Narrative */}
            <p className="mt-8 text-base leading-relaxed text-gray-300 sm:text-lg">
              {profileData.bio}
            </p>

            {/* Primary Action Buttons with Neon Virtual World Styling */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handleSkillsClick}
                className="group relative inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 px-7 py-3.5 text-sm font-bold text-black shadow-[0_0_35px_rgba(0,240,255,0.4)] transition-all duration-200 hover:shadow-[0_0_45px_rgba(0,240,255,0.65)] hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-cyan-300"
                aria-label="Scan core AI skills and competencies"
              >
                <Sparkles
                  className="h-4 w-4 transition-transform group-hover:rotate-45"
                  aria-hidden="true"
                />
                <span>Evaluate Core Skills</span>
                <ArrowDown
                  className="h-4 w-4 transition-transform group-hover:translate-y-1"
                  aria-hidden="true"
                />
              </button>

              <button
                type="button"
                onClick={() => handleScrollToSection('projects')}
                className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-[#060c22]/80 px-7 py-3.5 text-sm font-semibold text-cyan-200 backdrop-blur-xl transition-all duration-200 hover:border-cyan-400 hover:bg-cyan-500/20 hover:text-white hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-cyan-400"
                aria-label="Navigate to projects showcase"
              >
                <Terminal className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                <span>View Virtual Projects</span>
              </button>

              {profileData.resumeUrl && (
                <a
                  href={profileData.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-5 py-3.5 text-sm font-medium text-gray-300 transition-colors hover:border-cyan-400/40 hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  aria-label="Open Alishba's Resume PDF in a new tab"
                >
                  <span>Resume (PDF)</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Key Architectural Pillars with Neon Holographic Animations */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            {/* Interactive Terminal Bar */}
            <div className="flex items-center justify-between rounded-xl border border-cyan-500/30 bg-[#060c22]/90 p-3.5 font-mono text-xs text-gray-300 shadow-[0_0_20px_rgba(0,240,255,0.08)]">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-cyan-400">$</span>
                <span>alishba --ai-agents --workflows</span>
              </div>
              <span className="rounded bg-cyan-950/60 px-2 py-0.5 text-[10px] text-cyan-300 border border-cyan-500/30">
                ACTIVE
              </span>
            </div>

            {/* Pillar 1: AI Agent Workflows (Cyan / Blue Accent) */}
            <div className="group relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-[#060c22]/85 to-[#030714]/90 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/60 hover:shadow-[0_0_35px_rgba(0,240,255,0.22)]">
              <div className="cyber-corner-tr" />
              <div className="flex items-start gap-4">
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/40 bg-cyan-950/40 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-500/20">
                  <Cpu className="h-6 w-6 text-cyan-400 animate-pulse" aria-hidden="true" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-white group-hover:text-cyan-200 transition-colors">
                      AI Agent Workflows
                    </h2>
                    <span className="rounded bg-cyan-500/10 px-1.5 py-0.5 font-mono text-[9px] text-cyan-400 border border-cyan-500/30">
                      AGENTS
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-gray-300 sm:text-sm">
                    Designing goal-directed AI agents, structured prompt engineering, and automated
                    multi-step task workflows with Gemini and LLM APIs.
                  </p>
                </div>
              </div>
            </div>

            {/* Pillar 2: Full-Stack AI Applications (Purple / Magenta Accent) */}
            <div className="group relative overflow-hidden rounded-2xl border border-purple-500/30 bg-gradient-to-br from-[#0b0826]/85 to-[#030714]/90 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/60 hover:shadow-[0_0_35px_rgba(168,85,247,0.22)]">
              <div className="cyber-corner-tr" />
              <div className="flex items-start gap-4">
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-purple-400/40 bg-purple-950/40 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300 group-hover:scale-110 group-hover:bg-purple-500/20">
                  <Layers className="h-6 w-6 text-purple-400" aria-hidden="true" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-white group-hover:text-purple-200 transition-colors">
                      Full-Stack AI Applications
                    </h2>
                    <span className="rounded bg-purple-500/10 px-1.5 py-0.5 font-mono text-[9px] text-purple-400 border border-purple-500/30">
                      WEB &amp; PY
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-gray-300 sm:text-sm">
                    Building interactive web interfaces and Python applications with Next.js,
                    React, TypeScript, Tailwind CSS, and Streamlit.
                  </p>
                </div>
              </div>
            </div>

            {/* Pillar 3: Spec-Driven Development (Emerald / Green Accent) */}
            <div className="group relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-[#041a12]/85 to-[#030714]/90 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/60 hover:shadow-[0_0_35px_rgba(16,185,129,0.22)]">
              <div className="cyber-corner-tr" />
              <div className="flex items-start gap-4">
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-400/40 bg-emerald-950/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-500/20">
                  <ShieldCheck className="h-6 w-6 text-emerald-400" aria-hidden="true" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-white group-hover:text-emerald-200 transition-colors">
                      Spec-Driven Development
                    </h2>
                    <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[9px] text-emerald-400 border border-emerald-500/30">
                      SPEC
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-gray-300 sm:text-sm">
                    Structuring reliable AI solutions with clear specifications, JSON schemas,
                    Git &amp; GitHub version control, and iterative evaluation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
