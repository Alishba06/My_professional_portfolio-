'use client';

import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Zap,
  RotateCcw,
  ArrowRight,
  Cpu,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Terminal,
  Radio,
  Sliders,
} from 'lucide-react';
import { skills as defaultSkills } from '@/data/profile';
import type { Skill } from '@/types/portfolio';
import { AppErrorBoundary } from '@/components/common/error-boundary';
import OrbitingSkills, {
  defaultSkillsConfig,
  type SkillConfig,
  type GlowColor,
} from '@/components/ui/orbiting-skills';

export interface SkillsShowcaseProps {
  skillsList?: Skill[];
}

const CATEGORIES = [
  'All',
  'AI & Agent Orchestration',
  'Engineering & Frameworks',
  'Systems & Reliability',
] as const;

type CategoryType = (typeof CATEGORIES)[number];

export function SkillsShowcase({ skillsList = defaultSkills }: SkillsShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [isTop5Active, setIsTop5Active] = useState(false);
  const [selectedSkillId, setSelectedSkillId] = useState<string>('ai_agent');

  // Filter skills for the orbit based on active category / Top 5
  const visibleOrbitSkills = useMemo(() => {
    let result = [...defaultSkillsConfig];

    if (isTop5Active) {
      const top5Ids = ['ai_agent', 'gemini', 'python', 'react', 'digital_fte'];
      return result.filter((s) => top5Ids.includes(s.id));
    }

    if (selectedCategory !== 'All') {
      return result.filter((s) => s.category === selectedCategory);
    }

    return result;
  }, [selectedCategory, isTop5Active]);

  // Find currently inspected skill
  const activeSkill = useMemo(() => {
    const foundInOrbit = defaultSkillsConfig.find((s) => s.id === selectedSkillId);
    if (foundInOrbit) return foundInOrbit;
    return defaultSkillsConfig[0];
  }, [selectedSkillId]);

  const handleSelectSkill = (skill: SkillConfig) => {
    setSelectedSkillId(skill.id);
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setIsTop5Active(false);
  };

  const getCategoryStyles = (category?: string) => {
    switch (category) {
      case 'AI & Agent Orchestration':
        return {
          icon: <Cpu className="h-4 w-4 text-[#00f0ff]" aria-hidden="true" />,
          color: '#00f0ff',
          badgeClass: 'border-[#00f0ff]/40 bg-[#00f0ff]/10 text-[#00f0ff]',
        };
      case 'Engineering & Frameworks':
        return {
          icon: <Layers className="h-4 w-4 text-[#ff2a85]" aria-hidden="true" />,
          color: '#ff2a85',
          badgeClass: 'border-[#ff2a85]/40 bg-[#ff2a85]/10 text-[#ff2a85]',
        };
      case 'Systems & Reliability':
        return {
          icon: <ShieldCheck className="h-4 w-4 text-[#a855f7]" aria-hidden="true" />,
          color: '#a855f7',
          badgeClass: 'border-[#a855f7]/40 bg-[#a855f7]/10 text-[#a855f7]',
        };
      default:
        return {
          icon: <Zap className="h-4 w-4 text-[#f59e0b]" aria-hidden="true" />,
          color: '#f59e0b',
          badgeClass: 'border-[#f59e0b]/40 bg-[#f59e0b]/10 text-[#f59e0b]',
        };
    }
  };

  const getGlowBorder = (glowColor: GlowColor) => {
    switch (glowColor) {
      case 'pink':
        return 'border-[#ff2a85]/50 shadow-[0_0_35px_rgba(255,42,133,0.2)]';
      case 'purple':
        return 'border-[#a855f7]/50 shadow-[0_0_35px_rgba(168,85,247,0.2)]';
      case 'orange':
        return 'border-[#f59e0b]/50 shadow-[0_0_35px_rgba(245,158,11,0.2)]';
      case 'cyan':
      default:
        return 'border-[#00f0ff]/50 shadow-[0_0_35px_rgba(0,240,255,0.2)]';
    }
  };

  const activeCategoryMeta = getCategoryStyles(activeSkill.category);

  return (
    <AppErrorBoundary componentName="SkillsShowcase">
      <section
        id="skills"
        aria-labelledby="skills-heading"
        className="relative z-10 w-full overflow-hidden border-t border-cyan-500/20 bg-[#02040a] px-4 py-24 sm:px-6 lg:px-8"
      >
        {/* Animated Cyber Scanning Beam */}
        <div className="animate-cyber-scan" />

        {/* Cyber Grid Pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(0, 240, 255, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.08) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Volumetric Cyber Nebula Glows */}
        <div
          className="pointer-events-none absolute -top-40 right-10 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[150px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-10 left-10 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[150px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-1/2 left-1/3 h-[400px] w-[400px] rounded-full bg-pink-500/10 blur-[140px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl">
          {/* Header & Subtitle */}
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-gradient-to-r from-cyan-950/40 via-purple-950/30 to-slate-900/60 px-4 py-1.5 font-mono text-xs tracking-wider text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.2)] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
              </span>
              <span>QUANTUM SKILLS GALAXY // 3D ORBITAL MATRIX</span>
            </div>

            <h2
              id="skills-heading"
              className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Core Capabilities &amp;{' '}
              <span className="bg-gradient-to-r from-[#00f0ff] via-[#a855f7] to-[#ff2a85] bg-clip-text text-transparent">
                Agentic Stack
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-base text-gray-300 sm:text-lg">
              Interactive quantum orbit representing Alishba&apos;s technical skills across AI
              agents, automation workflows, web development, and spec-driven engineering.
            </p>
          </div>

          {/* Recruiter Fast-Track & Filter Controls Card */}
          <div className="relative mt-10 rounded-2xl border border-cyan-500/30 bg-[#060c1e]/80 p-5 shadow-[0_8px_32px_rgba(0,240,255,0.08)] backdrop-blur-xl sm:p-6">
            {/* Cyber Corner Accents */}
            <div className="cyber-corner-tl" />
            <div className="cyber-corner-br" />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <Zap className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                  <span>30-Second Recruiter Fast-Track Evaluation</span>
                </div>
                <p className="mt-1 text-xs text-gray-300 sm:text-sm">
                  Evaluating candidates on a deadline? Instantly focus the orbit on Alishba&apos;s 5
                  flagship skills in AI Agents, Python &amp; Web Development.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsTop5Active(!isTop5Active);
                  if (!isTop5Active) {
                    setSelectedCategory('All');
                  }
                }}
                className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00f0ff] sm:text-sm ${
                  isTop5Active
                    ? 'bg-gradient-to-r from-[#00f0ff] via-[#a855f7] to-[#ff2a85] text-slate-950 font-black shadow-[0_0_25px_rgba(0,240,255,0.8)]'
                    : 'border border-cyan-500/40 bg-cyan-950/30 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-900/40 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                }`}
                aria-pressed={isTop5Active}
                aria-label="Toggle Top 5 Core Skills view for rapid evaluation"
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                <span>
                  {isTop5Active ? '⚡ TOP 5 FLAGSHIP SKILLS ACTIVATED' : 'Quick Scan: Top 5 Core Skills'}
                </span>
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-cyan-500/20 pt-4">
              <span className="font-mono text-xs font-semibold text-gray-400">Filter Galaxy:</span>
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat && !isTop5Active;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsTop5Active(false);
                    }}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                      isSelected
                        ? 'border border-cyan-400 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-200 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                        : 'border border-white/10 bg-[#040817]/60 text-gray-400 hover:border-cyan-500/40 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}

              {(selectedCategory !== 'All' || isTop5Active) && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="ml-auto inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-200 hover:underline"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset Orbit
                </button>
              )}
            </div>
          </div>

          {/* MAIN INTERACTIVE SHOWCASE CARD: Quantum Galaxy + Live Telemetry HUD */}
          <div className="relative mt-10 rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#060d26]/90 via-[#040817]/90 to-[#02040a]/90 p-6 shadow-[0_0_50px_rgba(0,240,255,0.08)] backdrop-blur-2xl sm:p-8 overflow-hidden">
            {/* Corner Tech Brackets */}
            <div className="cyber-corner-tl" />
            <div className="cyber-corner-tr" />
            <div className="cyber-corner-bl" />
            <div className="cyber-corner-br" />

            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              {/* Left Column (7 cols): The Interactive Orbiting Skills Galaxy */}
              <div className="flex flex-col items-center justify-center lg:col-span-7">
                <OrbitingSkills
                  skills={visibleOrbitSkills}
                  activeSkillId={selectedSkillId}
                  onSkillSelect={handleSelectSkill}
                />
              </div>

              {/* Right Column (5 cols): The "WOW" Telemetry & Inspected Skill HUD */}
              <div
                className={`relative flex flex-col justify-between rounded-2xl border bg-[#060b1e]/95 p-6 shadow-2xl backdrop-blur-xl transition-all duration-500 lg:col-span-5 ${getGlowBorder(
                  activeSkill.glowColor
                )}`}
              >
                {/* Tech HUD Corner Accents */}
                <div className="cyber-corner-tl" />
                <div className="cyber-corner-br" />

                <div>
                  {/* Top Status Header */}
                  <div className="flex items-center justify-between gap-2 border-b border-cyan-500/20 pb-3.5">
                    <div className="flex items-center gap-2">
                      {activeCategoryMeta.icon}
                      <span className="font-mono text-xs font-bold text-gray-200">
                        {activeSkill.category ?? 'Core Competency'}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-cyan-950/60 px-3 py-1 font-mono text-[10px] font-bold text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                      <span className="h-1.5 w-1.5 animate-ping rounded-full bg-cyan-400" />
                      SKILL INSPECTOR
                    </span>
                  </div>

                  {/* Active Skill Title & Level */}
                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-mono text-2xl font-black text-white sm:text-3xl">
                        {activeSkill.label}
                      </h3>
                      {activeSkill.level && (
                        <div className="mt-1 font-mono text-xs font-bold tracking-wider text-pink-400">
                          {`// FOCUS: ${activeSkill.level.toUpperCase()}`}
                        </div>
                      )}
                    </div>

                    {/* Skill Category Badge */}
                    <div className="flex flex-col items-center justify-center rounded-xl border border-cyan-500/30 bg-[#020512] px-2.5 py-1.5 shadow-sm">
                      <span className="font-mono text-xs font-black text-cyan-300">
                        {activeSkill.category === 'AI & Agent Orchestration' ? 'AI' : 'DEV'}
                      </span>
                      <span className="font-mono text-[8px] text-gray-400">SKILL</span>
                    </div>
                  </div>

                  {/* FEATURE A: Real-Time Neural Frequency Equalizer */}
                  <div className="my-4 rounded-xl border border-cyan-500/20 bg-[#020512]/90 p-3 shadow-inner">
                    <div className="flex items-center justify-between font-mono text-[10px] text-cyan-300/80 mb-2">
                      <span className="flex items-center gap-1.5">
                        <Activity className="h-3 w-3 animate-pulse text-cyan-400" />
                        SKILL SPECTRUM VISUALIZER
                      </span>
                      <span className="text-gray-400">INTERACTIVE // ACTIVE</span>
                    </div>

                    {/* 16 Animated Equalizer Spectrum Bars */}
                    <div className="flex h-10 items-end justify-between gap-1 px-1">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-full rounded-t-sm bg-gradient-to-t from-[#00f0ff] via-[#a855f7] to-[#ff2a85]"
                          style={{
                            animation: `equalizer-dance ${0.7 + (i % 5) * 0.22}s ease-in-out infinite alternate`,
                            animationDelay: `${i * 0.07}s`,
                            opacity: 0.9,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* FEATURE B: Focus Area Indicator Bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between font-mono text-[11px]">
                      <span className="text-gray-400">CAPABILITY DOMAIN</span>
                      <span className="font-bold text-cyan-300">
                        {activeSkill.level?.toUpperCase() || 'CORE'}
                      </span>
                    </div>
                    <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-900 border border-cyan-500/30">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 transition-all duration-700 shadow-[0_0_12px_rgba(0,240,255,0.7)]"
                        style={{
                          width: activeSkill.category === 'AI & Agent Orchestration' ? '100%' : '85%',
                        }}
                      />
                    </div>
                  </div>

                  {/* Description & Honest Practical Capability */}
                  <p className="mt-4 text-sm leading-relaxed text-gray-300">
                    {activeSkill.description}
                  </p>

                  {/* Highlight Metric Pill */}
                  {activeSkill.highlightMetric && (
                    <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-purple-500/30 bg-purple-950/30 px-3 py-1 font-mono text-xs text-purple-300">
                      <Radio className="h-3 w-3 text-pink-400 animate-pulse" />
                      <span>{activeSkill.highlightMetric}</span>
                    </div>
                  )}

                  {/* Terminal Stack Summary */}
                  <div className="mt-3 flex items-center gap-2 font-mono text-[10px] text-gray-500">
                    <Terminal className="h-3 w-3 text-cyan-400" />
                    <span>
                      DOMAIN: {(activeSkill.category ?? 'CORE').toUpperCase()} // PORTFOLIO STACK
                    </span>
                  </div>
                </div>

                {/* Quick Switcher Chips: Click any skill to focus */}
                <div className="mt-6 border-t border-cyan-500/20 pt-4">
                  <span className="block font-mono text-[11px] font-bold text-gray-400">
                    Quick Node Switcher (Click to inspect):
                  </span>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {defaultSkillsConfig.map((s) => {
                      const isCurrent = s.id === selectedSkillId;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setSelectedSkillId(s.id)}
                          className={`rounded-lg px-2.5 py-1 font-mono text-[11px] font-semibold transition-all duration-200 ${
                            isCurrent
                              ? 'border border-[#00f0ff] bg-[#00f0ff]/20 text-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.5)]'
                              : 'border border-cyan-900/40 bg-[#04081a]/70 text-gray-400 hover:border-pink-500/40 hover:text-gray-200'
                          }`}
                        >
                          {s.label.split(' ')[0]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recruiter Evaluation Callout Footer */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-purple-500/30 bg-gradient-to-r from-[#060c22]/90 via-[#0e1136]/90 to-[#060c22]/90 p-6 text-center sm:flex-row sm:text-left shadow-xl backdrop-blur-xl">
            <div>
              <div className="inline-flex items-center gap-2 text-sm font-bold text-white">
                <CheckCircle2 className="h-4 w-4 text-[#00f0ff]" />
                <span>Need a customized capability evaluation?</span>
              </div>
              <p className="mt-1 text-xs text-gray-300">
                Explore Alishba&apos;s case studies, architecture overviews, and video demos in the
                projects section.
              </p>
            </div>
            <a
              href="#projects"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-[#00f0ff]/40 bg-gradient-to-r from-[#00f0ff]/20 to-[#ff2a85]/20 px-5 py-2.5 text-xs font-bold text-cyan-200 transition-all hover:border-[#ff2a85] hover:text-white hover:shadow-[0_0_20px_rgba(255,42,133,0.5)]"
            >
              <span>Explore Projects</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </AppErrorBoundary>
  );
}
