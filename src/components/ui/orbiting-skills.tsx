'use client';

import React, { useEffect, useState, useRef, memo, useMemo } from 'react';
import { Play, Pause, Zap, FastForward, Activity } from 'lucide-react';

// --- Type Definitions ---
export type IconType =
  | 'html'
  | 'css'
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'react'
  | 'nextjs'
  | 'node'
  | 'tailwind'
  | 'ai_agent'
  | 'gemini'
  | 'digital_fte'
  | 'git'
  | 'systems';

export type GlowColor = 'cyan' | 'purple' | 'pink' | 'orange';

export interface SkillIconProps {
  type: IconType;
}

export interface SkillConfig {
  id: string;
  orbitRadius: number;
  size: number;
  speed: number;
  iconType: IconType;
  phaseShift: number;
  glowColor: GlowColor;
  label: string;
  category?: string;
  proficiency?: number;
  description?: string;
  level?: string;
  highlightMetric?: string;
}

export interface OrbitingSkillProps {
  config: SkillConfig;
  angle: number;
  isActive?: boolean;
  onHover?: (skill: SkillConfig | null) => void;
  onClick?: (skill: SkillConfig) => void;
}

export interface GlowingOrbitPathProps {
  radius: number;
  glowColor?: GlowColor;
  animationDelay?: number;
  isWarp?: boolean;
}

// --- High Quality SVG Icon Components with Synthwave & Cyber Accents ---
export const iconComponents: Record<
  IconType,
  { component: () => React.JSX.Element; color: string }
> = {
  html: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
        <path
          d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"
          fill="#ff2a85"
        />
      </svg>
    ),
    color: '#ff2a85',
  },
  css: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
        <path
          d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.751L12 19.351l5.379-1.443.744-8.157z"
          fill="#00f0ff"
        />
      </svg>
    ),
    color: '#00f0ff',
  },
  javascript: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
        <rect width="24" height="24" rx="4" fill="#f59e0b" />
        <path
          d="M22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"
          fill="#02040a"
        />
      </svg>
    ),
    color: '#f59e0b',
  },
  typescript: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
        <rect width="24" height="24" rx="4" fill="#00f0ff" />
        <path
          d="M1.5 1.5h21v21h-21z"
          fill="#00f0ff"
          opacity="0.15"
        />
        <path
          d="M4 8.5h6.5v2H8.3v7.5H6.2v-7.5H4zm8.2 2.3c.7-.6 1.6-1 2.7-1 1.3 0 2.2.4 2.8 1.1.6.7.9 1.7.9 3 0 1.5-.4 2.7-1.1 3.4-.7.7-1.7 1.1-2.9 1.1-1 0-1.8-.3-2.5-.8v-2.2c.7.7 1.5 1.1 2.4 1.1.7 0 1.2-.2 1.5-.6.3-.4.5-1 .5-1.9 0-.8-.2-1.4-.5-1.7-.3-.4-.8-.6-1.5-.6-.7 0-1.4.3-2 .8z"
          fill="#02040a"
        />
      </svg>
    ),
    color: '#00f0ff',
  },
  python: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
        <path
          d="M11.914 0C5.834 0 6.2 2.64 6.2 2.64l.008 2.735h5.807v.827H3.92S0 5.762 0 11.874c0 6.111 3.42 5.9 3.42 5.9h2.04v-2.862s-.11-3.42 3.364-3.42h5.757s3.255.053 3.255-3.15V2.64S18.257 0 11.914 0zm-3.23 1.834a1.077 1.077 0 1 1 0 2.155 1.077 1.077 0 0 1 0-2.155z"
          fill="#00f0ff"
        />
        <path
          d="M12.086 24c6.08 0 5.714-2.64 5.714-2.64l-.008-2.735H11.98v-.827h8.095s3.92.44 3.92-5.672c0-6.112-3.42-5.9-3.42-5.9h-2.04v2.862s.11 3.42-3.364 3.42H9.414s-3.255-.053-3.255 3.15v5.703S5.743 24 12.086 24zm3.23-1.834a1.077 1.077 0 1 1 0-2.155 1.077 1.077 0 0 1 0 2.155z"
          fill="#f59e0b"
        />
      </svg>
    ),
    color: '#f59e0b',
  },
  react: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
        <g stroke="#00f0ff" strokeWidth="1.2" fill="none">
          <circle cx="12" cy="12" r="2.2" fill="#00f0ff" />
          <ellipse cx="12" cy="12" rx="11" ry="4.2" />
          <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(120 12 12)" />
        </g>
      </svg>
    ),
    color: '#00f0ff',
  },
  nextjs: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
        <circle cx="12" cy="12" r="11" fill="#060c22" stroke="#ff2a85" strokeWidth="1.2" />
        <path
          d="M15.5 8.5v7l-5.6-7h-1.4v7h1.4v-4.8l4.4 5.5c.4.5.8.7 1.2.7.9 0 1.4-.7 1.4-1.6v-6.8h-1.4z"
          fill="#ffffff"
        />
      </svg>
    ),
    color: '#ff2a85',
  },
  node: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
        <path
          d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.602.065-.037.151-.023.218.017l2.256 1.339c.082.045.198.045.275 0l8.795-5.076c.082-.047.135-.141.135-.241V6.921c0-.103-.055-.198-.137-.246l-8.791-5.072c-.081-.047-.189-.047-.273 0L2.075 6.675c-.084.048-.139.144-.139.246v10.146c0 .1.055.194.139.241l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L1.352 18.675C.533 18.215 0 17.352 0 16.43V6.284c0-.922.533-1.786 1.352-2.245L10.147-.963c.8-.452 1.866-.452 2.657 0l8.796 5.002c.819.459 1.352 1.323 1.352 2.245v10.146c0 .922-.533 1.783-1.352 2.245l-8.796 5.078c-.28.163-.601.247-.926.247z"
          fill="#a855f7"
        />
      </svg>
    ),
    color: '#a855f7',
  },
  tailwind: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
        <path
          d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"
          fill="#00f0ff"
        />
      </svg>
    ),
    color: '#00f0ff',
  },
  ai_agent: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v4" />
        <line x1="8" y1="16" x2="8.01" y2="16" />
        <line x1="16" y1="16" x2="16.01" y2="16" />
      </svg>
    ),
    color: '#00f0ff',
  },
  gemini: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
        <path
          d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z"
          fill="#ff2a85"
        />
      </svg>
    ),
    color: '#ff2a85',
  },
  digital_fte: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    color: '#a855f7',
  },
  git: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="#ff2a85" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <path d="M18 9a9 9 0 0 1-9 9" />
        <line x1="6" y1="9" x2="6" y2="21" />
      </svg>
    ),
    color: '#ff2a85',
  },
  systems: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    color: '#a855f7',
  },
};

// --- Memoized Icon Component ---
export const SkillIcon = memo(({ type }: SkillIconProps) => {
  const IconComponent = iconComponents[type]?.component;
  return IconComponent ? <IconComponent /> : null;
});
SkillIcon.displayName = 'SkillIcon';

// --- Alishba's Skills Configuration ---
export const defaultSkillsConfig: SkillConfig[] = [
  // Inner Orbit: Core Engineering, Frameworks & Version Control (Radius 110)
  {
    id: 'python',
    orbitRadius: 110,
    size: 44,
    speed: 0.75,
    iconType: 'python',
    phaseShift: 0,
    glowColor: 'orange',
    label: 'Python',
    category: 'Engineering & Frameworks',
    level: 'Core Skill',
    highlightMetric: 'Scripting & Automation',
    description: 'Core Python programming, object-oriented concepts, scripting, automation, and application logic.',
  },
  {
    id: 'react',
    orbitRadius: 110,
    size: 46,
    speed: 0.75,
    iconType: 'react',
    phaseShift: (Math.PI * 2) / 6,
    glowColor: 'cyan',
    label: 'React',
    category: 'Engineering & Frameworks',
    level: 'Interactive UI',
    highlightMetric: 'Component Systems',
    description: 'Component-based UI development, state management, and interactive web interfaces.',
  },
  {
    id: 'typescript',
    orbitRadius: 110,
    size: 42,
    speed: 0.75,
    iconType: 'typescript',
    phaseShift: (Math.PI * 4) / 6,
    glowColor: 'cyan',
    label: 'TypeScript',
    category: 'Engineering & Frameworks',
    level: 'Type-Safe JS',
    highlightMetric: 'Interfaces & Reliability',
    description: 'Type-safe JavaScript development with interfaces, type annotations, and clean maintainability.',
  },
  {
    id: 'tailwind',
    orbitRadius: 110,
    size: 42,
    speed: 0.75,
    iconType: 'tailwind',
    phaseShift: (Math.PI * 6) / 6,
    glowColor: 'cyan',
    label: 'Tailwind CSS',
    category: 'Engineering & Frameworks',
    level: 'UI Styling',
    highlightMetric: 'Responsive Design',
    description: 'Utility-first responsive styling, modern layouts, and consistent design tokens.',
  },
  {
    id: 'javascript',
    orbitRadius: 110,
    size: 40,
    speed: 0.75,
    iconType: 'javascript',
    phaseShift: (Math.PI * 8) / 6,
    glowColor: 'orange',
    label: 'JavaScript',
    category: 'Engineering & Frameworks',
    level: 'ES6+ & DOM',
    highlightMetric: 'Async & Web APIs',
    description: 'Modern ES6+ JavaScript, asynchronous operations, event handling, and DOM APIs.',
  },
  {
    id: 'git',
    orbitRadius: 110,
    size: 40,
    speed: 0.75,
    iconType: 'git',
    phaseShift: (Math.PI * 10) / 6,
    glowColor: 'pink',
    label: 'Git & GitHub',
    category: 'Systems & Reliability',
    level: 'Version Control',
    highlightMetric: 'Branching & Collaboration',
    description: 'Version control, repository management, branching workflows, and collaboration on GitHub.',
  },

  // Outer Orbit: AI & Agent Orchestration, Web Systems & Reliability (Radius 190)
  {
    id: 'ai_agent',
    orbitRadius: 190,
    size: 52,
    speed: -0.5,
    iconType: 'ai_agent',
    phaseShift: 0,
    glowColor: 'cyan',
    label: 'AI Agents / Agentic AI',
    category: 'AI & Agent Orchestration',
    level: 'Core Focus',
    highlightMetric: 'Task & Workflow Automation',
    description: 'Designing goal-directed AI agents, structured planning, tool usage, and iterative reasoning workflows.',
  },
  {
    id: 'gemini',
    orbitRadius: 190,
    size: 52,
    speed: -0.5,
    iconType: 'gemini',
    phaseShift: (Math.PI * 2) / 6,
    glowColor: 'pink',
    label: 'Gemini / LLM concepts',
    category: 'AI & Agent Orchestration',
    level: 'LLM Concepts & APIs',
    highlightMetric: 'Prompt & API Integration',
    description: 'Working with Google Gemini models, prompt engineering, multimodal context, and structured JSON outputs.',
  },
  {
    id: 'digital_fte',
    orbitRadius: 190,
    size: 48,
    speed: -0.5,
    iconType: 'digital_fte',
    phaseShift: (Math.PI * 4) / 6,
    glowColor: 'purple',
    label: 'Digital FTE / AI Workers',
    category: 'AI & Agent Orchestration',
    level: 'Workflow Concepts',
    highlightMetric: 'Multi-Step Automation',
    description: 'Exploring autonomous digital worker concepts and specialized agent workflows to automate multi-step tasks.',
  },
  {
    id: 'nextjs',
    orbitRadius: 190,
    size: 46,
    speed: -0.5,
    iconType: 'nextjs',
    phaseShift: (Math.PI * 6) / 6,
    glowColor: 'pink',
    label: 'Next.js',
    category: 'Engineering & Frameworks',
    level: 'React Framework',
    highlightMetric: 'App Router & API Routes',
    description: 'Developing web applications with Next.js App Router, server/client components, and API routes.',
  },
  {
    id: 'spec_dev',
    orbitRadius: 190,
    size: 44,
    speed: -0.5,
    iconType: 'systems',
    phaseShift: (Math.PI * 8) / 6,
    glowColor: 'purple',
    label: 'Spec-Driven Development',
    category: 'Systems & Reliability',
    level: 'Structured Specs',
    highlightMetric: 'Schemas & Acceptance Criteria',
    description: 'Specification-first development with clear requirements, schemas, and acceptance criteria.',
  },
  {
    id: 'fde',
    orbitRadius: 190,
    size: 44,
    speed: -0.5,
    iconType: 'systems',
    phaseShift: (Math.PI * 10) / 6,
    glowColor: 'cyan',
    label: 'FDE Concepts',
    category: 'Systems & Reliability',
    level: 'Applied AI Concepts',
    highlightMetric: 'Practical Workflow Fit',
    description: 'Understanding Forward Deployed Engineering concepts for embedding AI workflows into practical solutions.',
  },
];

// --- Memoized Orbiting Skill Component ---
export const OrbitingSkill = memo(
  ({ config, angle, isActive = false, onHover, onClick }: OrbitingSkillProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const { orbitRadius, size, iconType, label } = config;

    const x = Math.round(Math.cos(angle) * orbitRadius * 100) / 100;
    const y = Math.round(Math.sin(angle) * orbitRadius * 100) / 100;

    const activeOrHovered = isHovered || isActive;

    const handleMouseEnter = () => {
      setIsHovered(true);
      onHover?.(config);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      onHover?.(null);
    };

    const handleClick = () => {
      onClick?.(config);
    };

    const iconColor = iconComponents[iconType]?.color ?? '#00f0ff';

    return (
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          marginLeft: `${-size / 2}px`,
          marginTop: `${-size / 2}px`,
          transform: `translate3d(${x}px, ${y}px, 0)`,
          willChange: 'transform',
          zIndex: activeOrHovered ? 40 : 20,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <div
          className={`relative flex h-full w-full cursor-pointer items-center justify-center rounded-full border p-2 backdrop-blur-xl transition-all duration-300 ${
            activeOrHovered
              ? 'scale-125 border-white bg-[#0a1638]/95 shadow-2xl'
              : 'border-[#00f0ff]/30 bg-[#060c22]/85 hover:border-[#ff2a85] hover:bg-[#0e173d]/90'
          }`}
          style={{
            boxShadow: activeOrHovered
              ? `0 0 30px ${iconColor}, 0 0 60px ${iconColor}60, inset 0 0 15px ${iconColor}40`
              : `0 0 12px rgba(0, 240, 255, 0.25)`,
          }}
          role="button"
          tabIndex={0}
          aria-label={label}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleClick();
            }
          }}
        >
          {/* Active Orbit Shockwave Ring */}
          {activeOrHovered && (
            <div
              className="absolute -inset-2.5 animate-ping rounded-full border border-cyan-400 opacity-60"
              style={{ animationDuration: '2s' }}
            />
          )}

          <SkillIcon type={iconType} />

          {/* Interactive Holographic Tooltip on Hover */}
          {activeOrHovered && (
            <div className="pointer-events-none absolute -bottom-11 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-lg border border-cyan-400/50 bg-[#020512]/95 px-3 py-1 text-[11px] font-mono font-bold text-white shadow-[0_0_20px_rgba(0,240,255,0.4)] backdrop-blur-md">
              <span className="text-cyan-300 font-extrabold">{label}</span>
            </div>
          )}
        </div>
      </div>
    );
  }
);
OrbitingSkill.displayName = 'OrbitingSkill';

// --- Glowing Orbit Path Component with Retro-Synthwave Glow ---
export const GlowingOrbitPath = memo(
  ({ radius, glowColor = 'cyan', animationDelay = 0, isWarp = false }: GlowingOrbitPathProps) => {
    const glowColors: Record<
      GlowColor,
      { primary: string; secondary: string; border: string }
    > = {
      cyan: {
        primary: 'rgba(0, 240, 255, 0.55)',
        secondary: 'rgba(0, 240, 255, 0.15)',
        border: 'rgba(0, 240, 255, 0.4)',
      },
      pink: {
        primary: 'rgba(255, 42, 133, 0.55)',
        secondary: 'rgba(255, 42, 133, 0.15)',
        border: 'rgba(255, 42, 133, 0.4)',
      },
      purple: {
        primary: 'rgba(168, 85, 247, 0.55)',
        secondary: 'rgba(168, 85, 247, 0.15)',
        border: 'rgba(168, 85, 247, 0.4)',
      },
      orange: {
        primary: 'rgba(245, 158, 11, 0.55)',
        secondary: 'rgba(245, 158, 11, 0.15)',
        border: 'rgba(245, 158, 11, 0.4)',
      },
    };

    const colors = glowColors[glowColor] || glowColors.cyan;

    return (
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: `${radius * 2}px`,
          height: `${radius * 2}px`,
          animationDelay: `${animationDelay}s`,
        }}
      >
        {/* Glowing synthwave background ring */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-500 ${
            isWarp ? 'animate-warp-glow' : ''
          }`}
          style={{
            background: `radial-gradient(circle, transparent 40%, ${colors.secondary} 75%, ${colors.primary} 100%)`,
            boxShadow: isWarp
              ? `0 0 60px ${colors.primary}, inset 0 0 45px ${colors.secondary}`
              : `0 0 35px ${colors.primary}, inset 0 0 25px ${colors.secondary}`,
          }}
        />

        {/* High-precision dashed coordinate ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: `1.5px dashed ${colors.border}`,
            boxShadow: `inset 0 0 15px ${colors.secondary}`,
          }}
        />

        {/* Subtle radial orbital degree markers */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-[9px] font-bold text-cyan-400/40">
          R-{radius}px
        </div>
      </div>
    );
  }
);
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

// --- Main OrbitingSkills Component ---
export interface OrbitingSkillsProps {
  skills?: SkillConfig[];
  onSkillSelect?: (skill: SkillConfig) => void;
  activeSkillId?: string | null;
  speedMultiplier?: number;
  onSpeedMultiplierChange?: (multiplier: number) => void;
}

export default function OrbitingSkills({
  skills = defaultSkillsConfig,
  onSkillSelect,
  activeSkillId,
  speedMultiplier: externalSpeedMultiplier,
  onSpeedMultiplierChange,
}: OrbitingSkillsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [internalSpeedMultiplier, setInternalSpeedMultiplier] = useState(1);
  const [hoveredSkill, setHoveredSkill] = useState<SkillConfig | null>(null);

  const activeSpeedMultiplier = externalSpeedMultiplier ?? internalSpeedMultiplier;

  const handleSetSpeed = (multiplier: number) => {
    setInternalSpeedMultiplier(multiplier);
    onSpeedMultiplierChange?.(multiplier);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Pause orbital calculations when the galaxy is scrolled out of viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '100px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Ultra-efficient 30 FPS orbital tick loop that halts when offscreen or paused
  useEffect(() => {
    if (!mounted || isPaused || !isInView) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    const TARGET_INTERVAL = 1000 / 30; // 30 FPS saves 50% CPU while remaining visually smooth

    const animate = (currentTime: number) => {
      const elapsed = currentTime - lastTime;
      if (elapsed >= TARGET_INTERVAL) {
        const deltaTime = elapsed / 1000;
        lastTime = currentTime - (elapsed % TARGET_INTERVAL);
        setTime((prevTime) => prevTime + deltaTime);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mounted, isPaused, isInView]);

  const orbitConfigs: Array<{ radius: number; glowColor: GlowColor; delay: number }> = [
    { radius: 110, glowColor: 'cyan', delay: 0 },
    { radius: 190, glowColor: 'pink', delay: 1.5 },
  ];

  // Calculate coordinates for Dynamic Laser Targeting Beam to currently active/inspected skill
  const targetLaserData = useMemo(() => {
    if (!mounted) return null;
    const inspectedId = hoveredSkill?.id ?? activeSkillId ?? 'ai_agent';
    const activeCfg = skills.find((s) => s.id === inspectedId);
    if (!activeCfg) return null;

    const angle = time * activeCfg.speed * activeSpeedMultiplier + (activeCfg.phaseShift || 0);
    const x = Math.round(Math.cos(angle) * activeCfg.orbitRadius * 100) / 100;
    const y = Math.round(Math.sin(angle) * activeCfg.orbitRadius * 100) / 100;

    return {
      x,
      y,
      skill: activeCfg,
      color: iconComponents[activeCfg.iconType]?.color ?? '#00f0ff',
    };
  }, [mounted, time, skills, activeSkillId, hoveredSkill, activeSpeedMultiplier]);

  const isWarpActive = activeSpeedMultiplier > 1;

  return (
    <div
      ref={containerRef}
      className="relative flex w-full flex-col items-center justify-center overflow-hidden py-4"
    >
      {/* Synthwave Radial Ambient Backdrop */}
      <div className="pointer-events-none absolute inset-0 opacity-25">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 30%, #ff2a85 0%, transparent 60%),
                             radial-gradient(circle at 70% 70%, #00f0ff 0%, transparent 60%)`,
          }}
        />
      </div>

      {/* Orbit Galaxy Visual Stage */}
      <div
        className="relative flex h-[400px] w-[400px] sm:h-[480px] sm:w-[480px] items-center justify-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        role="region"
        aria-label="Interactive Orbiting Skills Galaxy"
      >
        {/* Dynamic Holographic Laser Targeting Beam */}
        {targetLaserData && (
          <svg
            className="pointer-events-none absolute inset-0 z-30 h-full w-full overflow-visible"
            viewBox="-240 -240 480 480"
          >
            <defs>
              <linearGradient
                id="targetLaserGrad"
                x1="0"
                y1="0"
                x2={targetLaserData.x}
                y2={targetLaserData.y}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.95" />
                <stop offset="60%" stopColor="#a855f7" stopOpacity="0.8" />
                <stop offset="100%" stopColor={targetLaserData.color} stopOpacity="0.95" />
              </linearGradient>
              <filter id="laserGlowFilter" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Glowing Laser Link Line */}
            <line
              x1="0"
              y1="0"
              x2={targetLaserData.x}
              y2={targetLaserData.y}
              stroke="url(#targetLaserGrad)"
              strokeWidth="2.2"
              className="animate-laser-flow"
              filter="url(#laserGlowFilter)"
            />

            {/* Targeting Reticle Rings at the Target Node */}
            <circle
              cx={targetLaserData.x}
              cy={targetLaserData.y}
              r="28"
              fill="none"
              stroke="#00f0ff"
              strokeWidth="1.2"
              strokeDasharray="5 4"
              className="animate-spin"
              style={{ animationDuration: '4s' }}
            />
            <circle
              cx={targetLaserData.x}
              cy={targetLaserData.y}
              r="34"
              fill="none"
              stroke={targetLaserData.color}
              strokeWidth="0.8"
              opacity="0.7"
            />
          </svg>
        )}

        {/* Central Holographic Quantum Nexus */}
        <div className="relative z-30 flex h-24 w-24 items-center justify-center">
          {/* Outer Rotating Compass/Tech Ring */}
          <div className="animate-rotate-slow pointer-events-none absolute -inset-4 rounded-full border border-dashed border-cyan-400/40" />

          {/* Inner Counter-Rotating Bracket Ring */}
          <div className="animate-rotate-reverse-slow pointer-events-none absolute -inset-2 rounded-full border border-purple-500/50" />

          {/* Pulsing Quantum Core Halo */}
          <div
            className={`absolute inset-0 rounded-full bg-cyan-500/20 blur-md ${
              isWarpActive ? 'animate-warp-glow' : 'animate-quantum-pulse'
            }`}
          />

          {/* Core Body Container */}
          <div className="relative z-10 flex h-20 w-20 flex-col items-center justify-center rounded-full border border-cyan-400/60 bg-gradient-to-br from-[#0c183d] via-[#161340] to-[#040817] shadow-[0_0_35px_rgba(0,240,255,0.5)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="url(#coreGradient)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-pulse"
            >
              <defs>
                <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f0ff" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ff2a85" />
                </linearGradient>
              </defs>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>

            <span className="mt-1 font-mono text-[8px] font-extrabold tracking-widest text-cyan-300">
              AI CORE
            </span>

            {/* Glowing online status pulse */}
            <span className="absolute -bottom-1 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-80" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
          </div>
        </div>

        {/* Render Glowing Orbit Paths */}
        {orbitConfigs.map((config) => (
          <GlowingOrbitPath
            key={`orbit-path-${config.radius}`}
            radius={config.radius}
            glowColor={config.glowColor}
            animationDelay={config.delay}
            isWarp={isWarpActive}
          />
        ))}

        {/* Render Orbiting Skill Icons (client-mounted to avoid SSR floating-point hydration mismatch) */}
        {mounted &&
          skills.map((config) => {
            const angle = time * config.speed * activeSpeedMultiplier + (config.phaseShift || 0);
            const isSelected = activeSkillId === config.id || hoveredSkill?.id === config.id;
            return (
              <OrbitingSkill
                key={config.id}
                config={config}
                angle={angle}
                isActive={isSelected}
                onHover={setHoveredSkill}
                onClick={(clickedSkill) => {
                  onSkillSelect?.(clickedSkill);
                }}
              />
            );
          })}
      </div>

      {/* Orbit Controls & Telemetry HUD */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        {/* Play/Pause Button */}
        <button
          type="button"
          onClick={() => setIsPaused(!isPaused)}
          className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-[#060c22]/80 px-3 py-1 font-mono text-xs font-semibold text-cyan-300 transition-all hover:border-cyan-400 hover:bg-cyan-950/60"
          aria-label={isPaused ? 'Resume Orbit' : 'Pause Orbit'}
        >
          {isPaused ? <Play className="h-3.5 w-3.5 text-cyan-400" /> : <Pause className="h-3.5 w-3.5 text-cyan-400" />}
          <span>{isPaused ? 'RESUME' : 'PAUSE'}</span>
        </button>

        {/* Warp Velocity Switcher */}
        <div className="inline-flex items-center rounded-full border border-purple-500/30 bg-[#060c22]/90 p-1 font-mono text-[11px]">
          <span className="px-2 text-gray-400 flex items-center gap-1">
            <FastForward className="h-3 w-3 text-purple-400" />
            SPEED:
          </span>
          {[
            { label: '1x STABLE', val: 1 },
            { label: '2.5x WARP', val: 2.5 },
            { label: '5x HYPER', val: 5 },
          ].map((item) => {
            const isCurrent = activeSpeedMultiplier === item.val;
            return (
              <button
                key={item.val}
                type="button"
                onClick={() => handleSetSpeed(item.val)}
                className={`rounded-full px-2.5 py-0.5 font-bold transition-all ${
                  isCurrent
                    ? 'bg-gradient-to-r from-cyan-400 to-pink-500 text-slate-950 shadow-[0_0_12px_rgba(0,240,255,0.6)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Live Orbit Status Indicator */}
        <div className="inline-flex items-center gap-1.5 font-mono text-[11px] text-gray-400">
          <Activity className="h-3 w-3 text-emerald-400 animate-pulse" />
          <span>STATUS:</span>
          <span className={isWarpActive ? 'text-pink-400 font-bold' : 'text-cyan-400 font-medium'}>
            {isWarpActive ? 'QUANTUM OVERDRIVE ACTIVE' : 'QUANTUM SYNC NORMAL'}
          </span>
        </div>
      </div>
    </div>
  );
}
