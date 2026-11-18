'use client';

/**
 * Ultra-Modern Virtual World Hero Section
 * Cybernetic Virtual World Portal with interactive video feeds,
 * high-tech holographic HUD, and removed Spline robot.
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import {
  Volume2,
  VolumeX,
  ArrowRight,
  Sparkles,
  Radio,
} from 'lucide-react';

import { Spotlight } from '@/components/ui/spotlight';
import { profile } from '@/data/profile';
import { cyberAudio } from '@/utils/audio';
import { prefersReducedMotion } from '@/utils/accessibility';
import { env } from '@/utils/env';

interface PortalFeed {
  id: string;
  title: string;
  tag: string;
  videoSrc: string;
  mode: string;
}

const PORTAL_FEEDS: PortalFeed[] = [
  {
    id: 'portal-1',
    title: 'OmniOps Agent Core',
    tag: '01_AGENT_CORE',
    videoSrc: '/videos/p_1.mp4',
    mode: 'VISUAL PREVIEW',
  },
];

export function CinematicEntrance() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const positioningRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isSequenceComplete, setIsSequenceComplete] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeFeed, setActiveFeed] = useState<PortalFeed>(PORTAL_FEEDS[0]);

  // Pause video playback when hero is scrolled out of viewport to free GPU and main thread
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Complete entrance sequence immediately
  const completeSequence = useCallback(() => {
    setIsSequenceComplete(true);

    if (headlineRef.current) gsap.to(headlineRef.current, { opacity: 1, y: 0, duration: 0.3 });
    if (badgeRef.current) gsap.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.3 });
    if (positioningRef.current)
      gsap.to(positioningRef.current, { opacity: 1, y: 0, duration: 0.3 });
    if (actionsRef.current) gsap.to(actionsRef.current, { opacity: 1, y: 0, duration: 0.3 });
    if (portalRef.current) gsap.to(portalRef.current, { opacity: 1, scale: 1, duration: 0.4 });
  }, []);

  // Keyboard shortcut: ESC skips entrance
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSequenceComplete) {
        completeSequence();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSequenceComplete, completeSequence]);

  useEffect(() => {
    const isReduced = prefersReducedMotion();

    if (isReduced) {
      completeSequence();
      return;
    }

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsSequenceComplete(true);
        },
      });

      // Initial state of DOM elements
      gsap.set(
        [headlineRef.current, badgeRef.current, positioningRef.current, actionsRef.current],
        {
          opacity: 0,
          y: 20,
        }
      );
      if (portalRef.current) {
        gsap.set(portalRef.current, { opacity: 0, scale: 0.95 });
      }

      // Smooth sequence entrance animation
      tl.to({}, { duration: 0.2 })
        .call(() => {
          if (env.enableAudio && !cyberAudio.isMuted()) {
            cyberAudio.playAmbience();
          }
        })
        .call(() => {
          cyberAudio.playChime();
        })
        .to(badgeRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
        .to(headlineRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .to(
          positioningRef.current,
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.4'
        )
        .to(actionsRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .to(
          portalRef.current,
          { opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out' },
          '-=0.6'
        );

      return () => {
        tl.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, [completeSequence]);

  const toggleSound = () => {
    const isNowMuted = cyberAudio.toggleMute();
    setIsMuted(isNowMuted);
    if (videoRef.current) {
      videoRef.current.muted = isNowMuted;
    }
    if (!isNowMuted) {
      cyberAudio.playAmbience();
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      aria-label="Hero Virtual World Introduction"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#02040a] pt-28 pb-20 text-white lg:pt-36 lg:pb-28"
    >
      {/* Background Cybernetic Ambient Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[600px] rounded-full bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-transparent blur-[140px]" />
      <div className="pointer-events-none absolute top-1/3 -right-20 h-[500px] w-[500px] rounded-full bg-gradient-to-bl from-purple-500/15 via-fuchsia-500/10 to-transparent blur-[140px]" />

      {/* Cyber Grid Lines Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0, 240, 255, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Dynamic Cursor Spotlight Tracking */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#00f0ff" size={450} />

      {/* Screen reader narrative */}
      <div className="sr-only" aria-live="polite">
        <h1>
          {profile.name} - {profile.role}
        </h1>
        <p>{profile.positioningStatement}</p>
        <p>{profile.bio}</p>
      </div>

      {/* Audio Ambient Control in Top Right */}
      <div className="absolute right-6 top-20 z-30">
        <button
          type="button"
          onClick={toggleSound}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-500/30 bg-[#060c22]/80 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.2)] backdrop-blur-xl transition hover:border-cyan-400 hover:bg-cyan-500/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          aria-label={isMuted ? 'Enable ambient audio' : 'Mute ambient audio'}
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4 animate-pulse text-cyan-300" />
          )}
        </button>
      </div>

      {/* Hero Content Grid */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Headline & Value Proposition */}
          <div className="flex flex-col justify-center text-left lg:col-span-6 xl:col-span-6">
            {/* Minimalist Virtual World Status Badge */}
            <div
              ref={badgeRef}
              className="mb-6 inline-flex items-center gap-2 self-start rounded-full border border-cyan-400/40 bg-gradient-to-r from-cyan-950/40 via-purple-950/30 to-slate-900/60 px-4 py-1.5 backdrop-blur-xl shadow-[0_0_20px_rgba(0,240,255,0.15)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
              </span>
              <span className="font-mono text-xs font-semibold tracking-wider text-cyan-300 uppercase">
                AI AGENT DEVELOPER // AI AUTOMATION
              </span>
            </div>

            {/* Main Name & Hero Heading */}
            <div ref={headlineRef}>
              <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl font-sans leading-[1.08]">
                {profile.name}{' '}
                <span className="block bg-gradient-to-r from-cyan-400 via-sky-200 to-fuchsia-400 bg-clip-text text-transparent">
                  AI Agent Developer
                </span>
              </h1>
            </div>

            {/* Positioning Statement */}
            <p
              ref={positioningRef}
              className="mb-8 max-w-xl text-base font-normal leading-relaxed text-gray-300 sm:text-lg lg:text-xl"
            >
              {profile.positioningStatement} Focused on building intelligent AI agents, automation
              workflows, and practical AI-powered solutions that solve real-world problems.
            </p>

            {/* Virtual World Active Feed Status */}
            <div className="mb-8 space-y-2">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-cyan-400/80">
                // ACTIVE PORTAL SIMULATION FEED
              </span>
              <div>
                <div className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/80 bg-cyan-500/20 px-3.5 py-1.5 font-mono text-xs text-cyan-200 shadow-[0_0_15px_rgba(0,240,255,0.35)]">
                  <Radio className="h-3 w-3 text-cyan-400 animate-pulse" />
                  <span className="font-semibold">{activeFeed.tag}</span>
                  <span className="text-gray-400">// {activeFeed.title}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div ref={actionsRef} className="flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 px-7 py-3.5 text-sm font-bold text-black shadow-[0_0_35px_rgba(0,240,255,0.4)] transition-all duration-200 hover:shadow-[0_0_45px_rgba(0,240,255,0.65)] hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-cyan-300"
              >
                <span>Explore Virtual Projects</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#skills"
                className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-[#060b1e]/80 px-7 py-3.5 text-sm font-semibold text-gray-200 backdrop-blur-xl transition-all duration-200 hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <span>Core Capabilities</span>
              </a>
            </div>
          </div>

          {/* Right Column: Seamless Virtual World Environment (Naturally Blended into Section) */}
          <div
            ref={portalRef}
            className="relative flex h-[480px] w-full items-center justify-center sm:h-[540px] lg:col-span-6 lg:h-[620px] xl:col-span-6"
          >
            {/* Ambient radiant volumetric back-glow */}
            <div className="pointer-events-none absolute h-[380px] w-[380px] sm:h-[480px] sm:w-[480px] rounded-full bg-gradient-to-tr from-cyan-500/25 via-blue-500/15 to-purple-500/20 blur-3xl opacity-80" />

            {/* Seamless Cinematic Viewport - Natural section look, NO player bars */}
            <div className="group relative h-full w-full max-w-[560px] overflow-hidden rounded-3xl border border-cyan-400/30 bg-[#02040a] shadow-[0_20px_60px_-15px_rgba(0,240,255,0.25)] transition-all duration-500 hover:border-cyan-400/50 hover:shadow-[0_25px_70px_-10px_rgba(0,240,255,0.35)]">
              {/* Minimal Live Status Tag (Feels like high-tech UI, NOT a video player) */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2 rounded-full border border-cyan-400/30 bg-[#02040a]/85 px-3 py-1 font-mono text-[11px] text-cyan-300 shadow-md backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="tracking-wide">ENVIRONMENT // {activeFeed.tag}</span>
              </div>

              {/* Crystal Clear Video - No Overlays, No Darkening, 100% Crisp */}
              <video
                ref={videoRef}
                src={activeFeed.videoSrc}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="metadata"
                className="h-full w-full object-cover contrast-[1.02] brightness-[1.02]"
              />

              {/* Subtle Bottom Ambient Gradient for Natural Section Integration */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#02040a] via-[#02040a]/40 to-transparent" />

              {/* Minimalist Scene Title at Bottom */}
              <div className="absolute bottom-4 left-5 right-5 z-20 flex items-center justify-between font-mono">
                <div className="flex flex-col">
                  <span className="text-[10px] text-cyan-400/70 tracking-widest uppercase">
                    SIMULATION MATRIX
                  </span>
                  <span className="text-sm font-bold text-white tracking-wide">
                    {activeFeed.title}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-400 bg-white/[0.04] border border-white/10 px-2.5 py-1 rounded-full backdrop-blur-md">
                  <span className="text-emerald-400 font-semibold">&bull; PREVIEW</span>
                  <span className="text-gray-500">|</span>
                  <span className="text-cyan-300">{activeFeed.mode}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
