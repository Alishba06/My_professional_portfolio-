'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Code2,
  Cpu,
  Bot,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Calendar,
  ArrowUpDown,
  Filter,
  Layers,
  Search,
  RotateCcw,
  Globe,
  Terminal,
  Award,
  Clock,
  Radio,
  Zap,
  ArrowRight,
  Compass,
} from 'lucide-react';
import { learningJourneyStages as defaultStages } from '@/data/learning-journey';
import type { LearningJourneyStage } from '@/types/portfolio';
import { AppErrorBoundary } from '@/components/common/error-boundary';

export interface JourneyStagesProps {
  stages?: LearningJourneyStage[];
}

/**
 * Stage-specific theme definitions for the holographic "WOW" experience.
 * Each era in Alishba's evolution has a distinctive neon signature:
 * - Stage 1 (Genesis / Foundation): Emerald & Teal Neon
 * - Stage 2 (Interface / Web Systems): Electric Cyan & Sky Blue
 * - Stage 3 (Computation / Python Core): Cyber Amber & Warm Gold
 * - Stage 4 (Cognition / Generative AI): Quantum Purple & Violet
 * - Stage 5 (Frontier / Agentic AI & FDE): Cosmic Hot Pink & Fuchsia
 */
interface StageThemeMeta {
  color: string;
  glowColor: string;
  borderClass: string;
  borderExpandedClass: string;
  bgGradient: string;
  topLaserGradient: string;
  eraBadgeClass: string;
  nodeGlowClass: string;
  badgeGlowClass: string;
  era: string;
  status: string;
  accentTextClass: string;
  chipBorderClass: string;
  checkIconClass: string;
}

const STAGE_THEMES: Record<string, StageThemeMeta> = {
  'early-foundation': {
    color: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    borderClass: 'border-emerald-500/20 hover:border-emerald-500/50',
    borderExpandedClass: 'border-emerald-500/60 shadow-[0_0_40px_rgba(16,185,129,0.18)]',
    bgGradient: 'from-emerald-950/25 via-[#061118]/80 to-[#02050b]/95',
    topLaserGradient: 'from-emerald-500 via-teal-400 to-cyan-400',
    eraBadgeClass: 'border-emerald-500/30 bg-emerald-950/40 text-emerald-300',
    nodeGlowClass: 'border-emerald-400 bg-emerald-950/90 text-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.45)]',
    badgeGlowClass: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    era: 'GENESIS // ERA 01',
    status: 'FOUNDATION MASTERED',
    accentTextClass: 'text-emerald-400',
    chipBorderClass: 'border-emerald-500/25 bg-emerald-950/30 hover:border-emerald-400/60 hover:bg-emerald-900/40 text-emerald-200',
    checkIconClass: 'text-emerald-400',
  },
  'web-development': {
    color: '#00f0ff',
    glowColor: 'rgba(0, 240, 255, 0.4)',
    borderClass: 'border-cyan-500/20 hover:border-cyan-500/50',
    borderExpandedClass: 'border-cyan-500/60 shadow-[0_0_40px_rgba(0,240,255,0.18)]',
    bgGradient: 'from-cyan-950/25 via-[#061122]/80 to-[#02050b]/95',
    topLaserGradient: 'from-cyan-400 via-sky-400 to-blue-500',
    eraBadgeClass: 'border-cyan-500/30 bg-cyan-950/40 text-cyan-300',
    nodeGlowClass: 'border-cyan-400 bg-cyan-950/90 text-cyan-300 shadow-[0_0_25px_rgba(0,240,255,0.45)]',
    badgeGlowClass: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    era: 'INTERFACE // ERA 02',
    status: 'PRODUCTION ECOSYSTEM',
    accentTextClass: 'text-cyan-400',
    chipBorderClass: 'border-cyan-500/25 bg-cyan-950/30 hover:border-cyan-400/60 hover:bg-cyan-900/40 text-cyan-200',
    checkIconClass: 'text-cyan-400',
  },
  'python-application-building': {
    color: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    borderClass: 'border-amber-500/20 hover:border-amber-500/50',
    borderExpandedClass: 'border-amber-500/60 shadow-[0_0_40px_rgba(245,158,11,0.18)]',
    bgGradient: 'from-amber-950/25 via-[#181108]/80 to-[#02050b]/95',
    topLaserGradient: 'from-amber-400 via-orange-400 to-yellow-500',
    eraBadgeClass: 'border-amber-500/30 bg-amber-950/40 text-amber-300',
    nodeGlowClass: 'border-amber-400 bg-amber-950/90 text-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.45)]',
    badgeGlowClass: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    era: 'COMPUTATION // ERA 03',
    status: 'OPERATIONAL LOGIC',
    accentTextClass: 'text-amber-400',
    chipBorderClass: 'border-amber-500/25 bg-amber-950/30 hover:border-amber-400/60 hover:bg-amber-900/40 text-amber-200',
    checkIconClass: 'text-amber-400',
  },
  'ai-generative-ai': {
    color: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    borderClass: 'border-purple-500/20 hover:border-purple-500/50',
    borderExpandedClass: 'border-purple-500/60 shadow-[0_0_40px_rgba(168,85,247,0.18)]',
    bgGradient: 'from-purple-950/25 via-[#130b22]/80 to-[#02050b]/95',
    topLaserGradient: 'from-purple-400 via-violet-400 to-indigo-500',
    eraBadgeClass: 'border-purple-500/30 bg-purple-950/40 text-purple-300',
    nodeGlowClass: 'border-purple-400 bg-purple-950/90 text-purple-300 shadow-[0_0_25px_rgba(168,85,247,0.45)]',
    badgeGlowClass: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    era: 'COGNITION // ERA 04',
    status: 'INTELLIGENCE DEPLOYED',
    accentTextClass: 'text-purple-400',
    chipBorderClass: 'border-purple-500/25 bg-purple-950/30 hover:border-purple-400/60 hover:bg-purple-900/40 text-purple-200',
    checkIconClass: 'text-purple-400',
  },
  'agentic-ai-advanced': {
    color: '#ff2a85',
    glowColor: 'rgba(255, 42, 133, 0.45)',
    borderClass: 'border-pink-500/25 hover:border-pink-500/60',
    borderExpandedClass: 'border-pink-500/70 shadow-[0_0_45px_rgba(255,42,133,0.22)]',
    bgGradient: 'from-pink-950/30 via-[#180918]/85 to-[#02050b]/95',
    topLaserGradient: 'from-pink-500 via-rose-400 to-fuchsia-500',
    eraBadgeClass: 'border-pink-500/40 bg-pink-950/50 text-pink-300',
    nodeGlowClass: 'border-pink-400 bg-pink-950/90 text-pink-300 shadow-[0_0_30px_rgba(255,42,133,0.5)]',
    badgeGlowClass: 'bg-pink-500/10 text-pink-300 border-pink-500/30',
    era: 'FRONTIER // ERA 05',
    status: 'ACTIVE EXPEDITION // 2026',
    accentTextClass: 'text-pink-400',
    chipBorderClass: 'border-pink-500/30 bg-pink-950/35 hover:border-pink-400/70 hover:bg-pink-900/40 text-pink-200',
    checkIconClass: 'text-pink-400',
  },
};

const DEFAULT_STAGE_THEME: StageThemeMeta = {
  color: '#00f0ff',
  glowColor: 'rgba(0, 240, 255, 0.4)',
  borderClass: 'border-cyan-500/20 hover:border-cyan-500/50',
  borderExpandedClass: 'border-cyan-500/60 shadow-[0_0_40px_rgba(0,240,255,0.18)]',
  bgGradient: 'from-cyan-950/25 via-[#061122]/80 to-[#02050b]/95',
  topLaserGradient: 'from-cyan-400 via-sky-400 to-blue-500',
  eraBadgeClass: 'border-cyan-500/30 bg-cyan-950/40 text-cyan-300',
  nodeGlowClass: 'border-cyan-400 bg-cyan-950/90 text-cyan-300 shadow-[0_0_25px_rgba(0,240,255,0.45)]',
  badgeGlowClass: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
  era: 'EVOLUTION ERA',
  status: 'MILESTONE RECORDED',
  accentTextClass: 'text-cyan-400',
  chipBorderClass: 'border-cyan-500/25 bg-cyan-950/30 hover:border-cyan-400/60 text-cyan-200',
  checkIconClass: 'text-cyan-400',
};

/**
 * Next-Gen Immersive Learning Journey Component
 * Tasks: T035, T036, T037, T038, T039, T040, T041, T042, T043, T044 [US3]
 *
 * Provides a cinematic, story-driven chronological progression of Alishba's evolution into
 * an AI Agent Developer, with:
 * - Dynamic stage-specific holographic color coding & neon aura
 * - Interactive timeline spine with flowing cyber laser effect
 * - Fast-Jump Stage Stepper with instant highlight & smooth scroll
 * - Hologram metrics bar (Stages, Years, Technologies, Agentic Focus)
 * - Stage expansion / collapse with accordion ease
 * - Stage sorting & Milestone bookmarking with localStorage persistence
 * - Full ARIA compliance, high-contrast & reduced-motion friendly
 */
export function JourneyStages({ stages = defaultStages }: JourneyStagesProps) {
  // Expansion state: set of stage IDs that are currently expanded (Stage 1 & 5 expanded by default for maximum impact)
  const [expandedStageIds, setExpandedStageIds] = useState<Set<string>>(
    () => new Set([defaultStages[0]?.id ?? 'early-foundation', defaultStages[defaultStages.length - 1]?.id ?? 'agentic-ai-advanced'])
  );

  // Sorting: ascending (order 1 -> 5) or descending (order 5 -> 1)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Bookmarks: set of stage IDs saved by user
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  // Filter: show bookmarked only
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);

  // Text search query
  const [searchQuery, setSearchQuery] = useState('');

  // Active highlighted stage for fast jumping
  const [highlightedStageId, setHighlightedStageId] = useState<string | null>(null);

  // Stage DOM references for smooth navigation
  const stageRefs = useRef<Record<string, HTMLElement | null>>({});

  // Hydrate bookmarks from localStorage safely on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('alishba_journey_bookmarks');
      if (saved) {
        setBookmarkedIds(new Set(JSON.parse(saved)));
      }
    } catch {
      // Graceful fallback for restricted environments
    }
  }, []);

  // Save bookmarks to localStorage
  const toggleBookmark = (stageId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(stageId)) {
        next.delete(stageId);
      } else {
        next.add(stageId);
      }
      try {
        localStorage.setItem('alishba_journey_bookmarks', JSON.stringify(Array.from(next)));
      } catch {
        // Local storage unavailable
      }
      return next;
    });
  };

  // Toggle stage expansion
  const toggleStage = (stageId: string) => {
    setExpandedStageIds((prev) => {
      const next = new Set(prev);
      if (next.has(stageId)) {
        next.delete(stageId);
      } else {
        next.add(stageId);
      }
      return next;
    });
  };

  // Expand all / Collapse all
  const handleExpandAll = () => {
    setExpandedStageIds(new Set(stages.map((s) => s.id)));
  };

  const handleCollapseAll = () => {
    setExpandedStageIds(new Set());
  };

  // Jump directly to a stage
  const handleJumpToStage = (stageId: string) => {
    setExpandedStageIds((prev) => new Set([...prev, stageId]));
    setHighlightedStageId(stageId);

    const targetElement = stageRefs.current[stageId];
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    setTimeout(() => {
      setHighlightedStageId(null);
    }, 2200);
  };

  // Computed and filtered stages
  const filteredStages = useMemo(() => {
    let result = [...stages];

    // Filter by bookmarks if active
    if (showBookmarkedOnly) {
      result = result.filter((s) => bookmarkedIds.has(s.id));
    }

    // Filter by search query
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(query) ||
          s.description.toLowerCase().includes(query) ||
          (s.milestone && s.milestone.toLowerCase().includes(query)) ||
          s.keyLearnings?.some((k) => k.toLowerCase().includes(query)) ||
          s.technologies?.some((t) => t.toLowerCase().includes(query))
      );
    }

    // Sort order
    result.sort((a, b) => (sortOrder === 'asc' ? a.order - b.order : b.order - a.order));

    return result;
  }, [stages, showBookmarkedOnly, bookmarkedIds, searchQuery, sortOrder]);

  const getStageIcon = (iconName?: string, themeClass?: string) => {
    switch (iconName) {
      case 'code':
        return <Code2 className={`h-5 w-5 ${themeClass || 'text-emerald-400'}`} aria-hidden="true" />;
      case 'globe':
        return <Globe className={`h-5 w-5 ${themeClass || 'text-cyan-400'}`} aria-hidden="true" />;
      case 'terminal':
        return <Terminal className={`h-5 w-5 ${themeClass || 'text-amber-400'}`} aria-hidden="true" />;
      case 'cpu':
        return <Cpu className={`h-5 w-5 ${themeClass || 'text-cyan-400'}`} aria-hidden="true" />;
      case 'bot':
        return <Bot className={`h-5 w-5 ${themeClass || 'text-purple-400'}`} aria-hidden="true" />;
      case 'sparkles':
        return <Sparkles className={`h-5 w-5 ${themeClass || 'text-pink-400'}`} aria-hidden="true" />;
      default:
        return <Layers className={`h-5 w-5 ${themeClass || 'text-cyan-400'}`} aria-hidden="true" />;
    }
  };

  return (
    <AppErrorBoundary componentName="JourneyStages" fallbackTitle="Learning Journey Offline">
      <section
        id="journey"
        aria-labelledby="journey-heading"
        className="relative z-10 w-full overflow-hidden border-t border-cyan-500/20 bg-[#02040a] px-4 py-24 sm:px-6 lg:px-8"
      >
        {/* Multi-spectrum Ambient Nebula Lighting */}
        <div
          className="pointer-events-none absolute -left-20 top-1/4 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.04] blur-[150px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-20 top-1/2 h-[550px] w-[550px] rounded-full bg-purple-600/[0.05] blur-[160px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute left-1/3 bottom-10 h-[450px] w-[450px] rounded-full bg-pink-500/[0.04] blur-[140px]"
          aria-hidden="true"
        />

        {/* Cyber Coordinate Grid Overlay */}
        <div
          className="dark-futuristic-grid pointer-events-none absolute inset-0 opacity-25"
          style={{
            maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, transparent 80%)',
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-5xl">
          {/* Header Section */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-gradient-to-r from-cyan-950/60 to-purple-950/40 px-4 py-1.5 font-mono text-xs font-semibold text-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.15)] backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400"></span>
                </span>
                <span>CHRONOLOGICAL TRAJECTORY // 2023 → 2026+</span>
              </div>

              {/* Title with Gradient Text */}
              <h2
                id="journey-heading"
                className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                The AI Agent{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,240,255,0.3)]">
                  Evolution
                </span>
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg">
                A story-driven trajectory showing my step-by-step learning progression: from core programming logic and modern web frameworks to Python automation, generative AI, and autonomous agentic workflows.
              </p>
            </div>

            {/* Quick Action Controls */}
            <div className="flex shrink-0 items-center gap-2.5">
              <button
                type="button"
                onClick={handleExpandAll}
                className="rounded-xl border border-slate-700/80 bg-slate-900/80 px-3.5 py-2 font-mono text-xs font-semibold text-gray-200 transition-all duration-200 hover:border-cyan-400/60 hover:bg-cyan-950/40 hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-sm"
              >
                Expand All
              </button>
              <button
                type="button"
                onClick={handleCollapseAll}
                className="rounded-xl border border-slate-700/80 bg-slate-900/80 px-3.5 py-2 font-mono text-xs font-semibold text-gray-200 transition-all duration-200 hover:border-cyan-400/60 hover:bg-cyan-950/40 hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-sm"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Hologram Metrics Strip */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            <div className="relative overflow-hidden rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-emerald-950/30 via-slate-950/60 to-slate-950/90 p-4 backdrop-blur-xl shadow-lg">
              <div className="h-0.5 w-full bg-gradient-to-r from-emerald-400 to-teal-400" />
              <div className="mt-3 flex items-center justify-between">
                <span className="font-mono text-2xl font-black text-white">05</span>
                <Compass className="h-4 w-4 text-emerald-400" aria-hidden="true" />
              </div>
              <p className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
                Evolution Stages
              </p>
              <span className="text-[11px] text-gray-400">Genesis to Autonomous</span>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-cyan-500/25 bg-gradient-to-br from-cyan-950/30 via-slate-950/60 to-slate-950/90 p-4 backdrop-blur-xl shadow-lg">
              <div className="h-0.5 w-full bg-gradient-to-r from-cyan-400 to-sky-400" />
              <div className="mt-3 flex items-center justify-between">
                <span className="font-mono text-2xl font-black text-white">4+ Yrs</span>
                <Clock className="h-4 w-4 text-cyan-400" aria-hidden="true" />
              </div>
              <p className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
                Continuous Mastery
              </p>
              <span className="text-[11px] text-gray-400">2023 – 2026+ Trajectory</span>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-purple-500/25 bg-gradient-to-br from-purple-950/30 via-slate-950/60 to-slate-950/90 p-4 backdrop-blur-xl shadow-lg">
              <div className="h-0.5 w-full bg-gradient-to-r from-purple-400 to-indigo-400" />
              <div className="mt-3 flex items-center justify-between">
                <span className="font-mono text-2xl font-black text-white">30+</span>
                <Layers className="h-4 w-4 text-purple-400" aria-hidden="true" />
              </div>
              <p className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-purple-300">
                Core Technologies
              </p>
              <span className="text-[11px] text-gray-400">Full Spectrum Stack</span>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-pink-500/25 bg-gradient-to-br from-pink-950/30 via-slate-950/60 to-slate-950/90 p-4 backdrop-blur-xl shadow-lg">
              <div className="h-0.5 w-full bg-gradient-to-r from-pink-400 to-fuchsia-400" />
              <div className="mt-3 flex items-center justify-between">
                <span className="font-mono text-2xl font-black text-white">100%</span>
                <Zap className="h-4 w-4 text-pink-400" aria-hidden="true" />
              </div>
              <p className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-pink-300">
                Agentic Systems
              </p>
              <span className="text-[11px] text-gray-400">Digital FTE &amp; FDE Focus</span>
            </div>
          </div>

          {/* Interactive Fast-Jump Stage Stepper */}
          <div className="mt-6 flex flex-wrap items-center gap-2 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-2.5 backdrop-blur-xl">
            <span className="px-2 font-mono text-[11px] font-bold uppercase tracking-wider text-gray-400">
              FAST JUMP:
            </span>
            {stages.map((stg) => {
              const theme = STAGE_THEMES[stg.id] ?? DEFAULT_STAGE_THEME;
              const isSelected = expandedStageIds.has(stg.id);

              return (
                <button
                  key={stg.id}
                  type="button"
                  onClick={() => handleJumpToStage(stg.id)}
                  className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 font-mono text-xs font-semibold transition-all duration-200 ${
                    isSelected
                      ? `${theme.badgeGlowClass} shadow-[0_0_12px_${theme.glowColor}]`
                      : 'border-slate-800 bg-slate-900/60 text-gray-400 hover:border-slate-700 hover:text-gray-200'
                  }`}
                  aria-label={`Jump to Stage 0${stg.order}`}
                >
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: theme.color }}
                  />
                  <span>0{stg.order}</span>
                  <span className="hidden sm:inline font-sans font-normal opacity-80">
                    {stg.title.split('—')[1]?.trim() || stg.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Filter, Sort & Search Control Center */}
          <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-slate-800/90 bg-gradient-to-r from-slate-950/90 via-[#070e1c]/80 to-slate-950/90 p-3.5 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
            {/* Search filter input */}
            <div className="relative max-w-sm flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <Search className="h-4 w-4 text-cyan-400" aria-hidden="true" />
              </div>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search milestone, framework, or skill..."
                aria-label="Filter journey stages by milestone, technology, or topic"
                className="min-h-[40px] w-full rounded-xl border border-slate-700/80 bg-slate-900/90 py-2 pl-10 pr-3 text-xs text-white placeholder-gray-400 transition-all focus:border-cyan-400 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-cyan-400 sm:text-sm"
              />
            </div>

            {/* Sort & Bookmark Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/90 px-3.5 py-2 text-xs font-semibold text-gray-200 transition-all hover:border-cyan-400/60 hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                aria-label={`Toggle sort order. Currently ${sortOrder === 'asc' ? 'Chronological' : 'Latest First'}`}
              >
                <ArrowUpDown className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
                <span>
                  {sortOrder === 'asc'
                    ? `Chronological (1 → ${stages.length})`
                    : `Latest First (${stages.length} → 1)`}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
                className={`inline-flex min-h-[40px] items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                  showBookmarkedOnly
                    ? 'border-cyan-400 bg-cyan-950/70 text-cyan-200 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                    : 'border-slate-700/80 bg-slate-900/90 text-gray-200 hover:border-cyan-400/60 hover:text-cyan-300'
                }`}
                aria-pressed={showBookmarkedOnly}
                aria-label="Filter stages to show bookmarked milestones only"
              >
                <Bookmark className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
                <span>Saved ({bookmarkedIds.size})</span>
              </button>

              {(searchQuery || showBookmarkedOnly) && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setShowBookmarkedOnly(false);
                  }}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-2 text-gray-400 transition-colors hover:border-cyan-500/40 hover:text-cyan-300"
                  aria-label="Reset timeline filters"
                  title="Reset Filters"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          {/* Timeline Spine & Interactive Stage Cards */}
          <div className="relative mt-12">
            {/* Holographic Glowing Multi-stop Vertical Spine */}
            <div
              className="absolute bottom-6 left-6 top-6 w-1 rounded-full bg-gradient-to-b from-[#10b981] via-[#00f0ff] via-[#f59e0b] via-[#a855f7] to-[#ff2a85] shadow-[0_0_15px_rgba(0,240,255,0.4)] sm:left-8"
              aria-hidden="true"
            />

            {filteredStages.length > 0 ? (
              <div className="space-y-10">
                {filteredStages.map((stage) => {
                  const isExpanded = expandedStageIds.has(stage.id);
                  const isBookmarked = bookmarkedIds.has(stage.id);
                  const isHighlighted = highlightedStageId === stage.id;
                  const theme = STAGE_THEMES[stage.id] ?? DEFAULT_STAGE_THEME;

                  return (
                    <article
                      key={stage.id}
                      ref={(el) => {
                        stageRefs.current[stage.id] = el;
                      }}
                      className={`relative flex items-start gap-4 transition-all duration-500 sm:gap-6 ${
                        isHighlighted ? 'scale-[1.01]' : ''
                      }`}
                      aria-labelledby={`stage-heading-${stage.id}`}
                    >
                      {/* Timeline Multi-Ring Quantum Node */}
                      <button
                        type="button"
                        onClick={() => toggleStage(stage.id)}
                        className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-all duration-300 focus:outline-none focus:ring-2 sm:h-16 sm:w-16 ${
                          isExpanded
                            ? `${theme.nodeGlowClass} scale-105`
                            : 'border-slate-800 bg-[#060a16] text-gray-400 hover:border-slate-600 hover:text-gray-200'
                        } ${isHighlighted ? 'ring-4 ring-cyan-400 animate-pulse' : ''}`}
                        aria-label={`Stage ${String(stage.order).padStart(2, '0')}: ${stage.title}. Click to ${isExpanded ? 'collapse' : 'expand'}`}
                      >
                        {/* Outer pulse wave when expanded */}
                        {isExpanded && (
                          <div
                            className="pointer-events-none absolute inset-0 -m-1.5 animate-pulse-ring rounded-2xl opacity-60"
                            style={{ border: `1px solid ${theme.color}` }}
                            aria-hidden="true"
                          />
                        )}

                        <div className="flex flex-col items-center">
                          <span
                            className="font-mono text-[10px] font-bold tracking-tight sm:text-xs"
                            style={{ color: theme.color }}
                          >
                            0{stage.order}
                          </span>
                          {getStageIcon(stage.icon, theme.accentTextClass)}
                        </div>
                      </button>

                      {/* Main Card Content with Glassmorphism & Cyber HUD styling */}
                      <div
                        className={`relative flex-1 overflow-hidden rounded-2xl border bg-gradient-to-br backdrop-blur-2xl transition-all duration-300 ${
                          theme.bgGradient
                        } ${
                          isExpanded
                            ? `${theme.borderExpandedClass}`
                            : `${theme.borderClass} hover:bg-slate-950/70`
                        } ${isHighlighted ? 'ring-2 ring-cyan-400' : ''}`}
                      >
                        {/* Top Laser Line with stage specific gradient */}
                        <div
                          className={`h-0.5 w-full bg-gradient-to-r ${theme.topLaserGradient}`}
                          aria-hidden="true"
                        />

                        {/* Top Shimmer Sheen */}
                        <div
                          className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/[0.04] to-transparent opacity-80"
                          aria-hidden="true"
                        />

                        {/* Header: Clickable trigger for expansion */}
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => toggleStage(stage.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              toggleStage(stage.id);
                            }
                          }}
                          aria-expanded={isExpanded}
                          aria-controls={`stage-content-${stage.id}`}
                          className="relative flex cursor-pointer flex-col gap-3 rounded-2xl p-5 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-400 sm:flex-row sm:items-center sm:justify-between sm:p-6"
                        >
                          <div className="space-y-1.5">
                            {/* Badges Bar: Era, Time, Milestone */}
                            <div className="flex flex-wrap items-center gap-2">
                              {/* Era Badge */}
                              <span
                                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider sm:text-[11px] ${theme.eraBadgeClass}`}
                              >
                                <Radio className="h-2.5 w-2.5 animate-pulse" aria-hidden="true" />
                                {theme.era}
                              </span>

                              {/* Time period pill */}
                              {stage.timePeriod && (
                                <span className="inline-flex items-center gap-1 rounded-full border border-slate-700/80 bg-slate-900/90 px-2.5 py-0.5 font-mono text-[10px] text-gray-300 sm:text-[11px]">
                                  <Calendar className="h-3 w-3 text-cyan-400" aria-hidden="true" />
                                  {stage.timePeriod}
                                </span>
                              )}

                              {/* Milestone tag */}
                              {stage.milestone && (
                                <span
                                  className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold sm:text-[11px] ${theme.badgeGlowClass}`}
                                >
                                  <Award className="h-3 w-3" aria-hidden="true" />
                                  {stage.milestone}
                                </span>
                              )}
                            </div>

                            {/* Stage Title */}
                            <h3
                              id={`stage-heading-${stage.id}`}
                              className="text-xl font-black tracking-tight text-white transition-colors hover:text-cyan-300 sm:text-2xl"
                            >
                              {stage.title}
                            </h3>
                          </div>

                          {/* Action icons: Bookmark & Accordion indicator */}
                          <div className="flex shrink-0 items-center gap-2.5 self-end sm:self-center">
                            {/* Bookmark button */}
                            <button
                              type="button"
                              onClick={(e) => toggleBookmark(stage.id, e)}
                              className={`flex min-h-[38px] min-w-[38px] items-center justify-center rounded-xl border p-2 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                                isBookmarked
                                  ? `${theme.badgeGlowClass} shadow-[0_0_15px_${theme.glowColor}]`
                                  : 'border-slate-800 bg-slate-900/60 text-gray-400 hover:border-slate-700 hover:bg-slate-900 hover:text-white'
                              }`}
                              aria-label={
                                isBookmarked
                                  ? `Remove ${stage.title} from saved milestones`
                                  : `Save ${stage.title} to saved milestones`
                              }
                              title={isBookmarked ? 'Milestone Saved' : 'Save Milestone'}
                            >
                              {isBookmarked ? (
                                <BookmarkCheck className="h-4 w-4" aria-hidden="true" />
                              ) : (
                                <Bookmark className="h-4 w-4" aria-hidden="true" />
                              )}
                            </button>

                            {/* Accordion chevron indicator */}
                            <div
                              className={`flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 transition-transform duration-300 ${
                                isExpanded ? 'rotate-180 border-cyan-500/40 text-cyan-300' : 'text-gray-400'
                              }`}
                            >
                              <ChevronDown className="h-4 w-4" aria-hidden="true" />
                            </div>
                          </div>
                        </div>

                        {/* Summary description (always visible) */}
                        <div className="px-5 pb-5 pt-0 sm:px-6 sm:pb-6">
                          <p className="text-sm leading-relaxed text-neutral-300 sm:text-base">
                            {stage.description}
                          </p>
                        </div>

                        {/* Expanded Detail Panel */}
                        {isExpanded && (
                          <div
                            id={`stage-content-${stage.id}`}
                            className="animate-in fade-in space-y-6 rounded-b-2xl border-t border-slate-800/80 bg-slate-950/60 p-5 duration-300 sm:p-6"
                          >
                            {/* In-depth architectural narrative (Terminal Card) */}
                            {stage.expandedDetails && (
                              <div className="overflow-hidden rounded-2xl border border-slate-800 bg-black/40 p-4 shadow-inner backdrop-blur-md">
                                <div className="mb-3 flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                                  <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1.5">
                                      <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                                      <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                                    </div>
                                    <span className="font-mono text-[11px] font-semibold text-gray-400">
                                      // ARCHITECTURAL CONTEXT &amp; DEEP-DIVE
                                    </span>
                                  </div>
                                  <span
                                    className="font-mono text-[10px] font-bold uppercase tracking-wider"
                                    style={{ color: theme.color }}
                                  >
                                    {theme.status}
                                  </span>
                                </div>
                                <p className="text-xs leading-relaxed text-gray-300 sm:text-sm">
                                  {stage.expandedDetails}
                                </p>
                              </div>
                            )}

                            {/* Key Learnings & Takeaways list */}
                            {stage.keyLearnings && stage.keyLearnings.length > 0 && (
                              <div>
                                <div className="mb-3 flex items-center gap-2">
                                  <Sparkles
                                    className="h-3.5 w-3.5"
                                    style={{ color: theme.color }}
                                    aria-hidden="true"
                                  />
                                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-gray-200">
                                    Core Competencies &amp; Focus Areas
                                  </h4>
                                </div>
                                <div className="grid gap-2.5 sm:grid-cols-2">
                                  {stage.keyLearnings.map((learning, idx) => (
                                    <div
                                      key={idx}
                                      className="flex items-start gap-2.5 rounded-xl border border-slate-800/80 bg-slate-900/40 p-3 transition-colors hover:border-slate-700/90"
                                    >
                                      <CheckCircle2
                                        className={`mt-0.5 h-4 w-4 shrink-0 ${theme.checkIconClass}`}
                                        aria-hidden="true"
                                      />
                                      <span className="text-xs leading-relaxed text-gray-300 sm:text-sm">
                                        {learning}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Technologies utilized in this stage */}
                            {stage.technologies && stage.technologies.length > 0 && (
                              <div>
                                <h4 className="mb-2.5 font-mono text-xs font-bold uppercase tracking-wider text-gray-400">
                                  Stack &amp; Ecosystem Tools
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {stage.technologies.map((tech) => (
                                    <span
                                      key={tech}
                                      className={`rounded-xl border px-3 py-1 font-mono text-xs font-medium transition-all duration-200 ${theme.chipBorderClass}`}
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Milestone Achievement Footer */}
                            {stage.milestone && (
                              <div
                                className="flex items-center justify-between rounded-xl border p-3 backdrop-blur-md"
                                style={{
                                  borderColor: `${theme.color}40`,
                                  background: `${theme.color}08`,
                                }}
                              >
                                <div className="flex items-center gap-2">
                                  <Award className="h-4 w-4" style={{ color: theme.color }} />
                                  <span className="font-mono text-xs font-semibold text-gray-200">
                                    Milestone Completed:
                                  </span>
                                  <span
                                    className="font-mono text-xs font-bold"
                                    style={{ color: theme.color }}
                                  >
                                    {stage.milestone}
                                  </span>
                                </div>
                                <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400">
                                  {stage.timePeriod}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              /* Empty state for search/bookmark filter */
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-950/40 px-4 py-16 text-center">
                <Filter className="mb-3 h-8 w-8 text-cyan-400" aria-hidden="true" />
                <h3 className="text-base font-semibold text-white">
                  No milestones match your criteria
                </h3>
                <p className="mt-1 max-w-sm text-xs text-gray-400 sm:text-sm">
                  Try clearing the bookmark filter or adjusting your search term.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setShowBookmarkedOnly(false);
                  }}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-xl border border-cyan-500/40 bg-cyan-950/60 px-4 py-2 font-mono text-xs font-semibold text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:bg-cyan-900/60"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  Reset Timeline View
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </AppErrorBoundary>
  );
}
