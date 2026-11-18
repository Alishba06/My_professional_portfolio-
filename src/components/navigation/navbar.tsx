'use client';

import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Sparkles,
  FileText,
  Mail,
  Layers,
  Terminal,
  Cpu,
  Workflow,
  ExternalLink,
} from 'lucide-react';
import { profile } from '@/data/profile';
import { ThemeToggle } from '@/components/theme';

interface NavItem {
  label: string;
  code: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Portal', code: '01_HERO', href: '#hero', icon: Terminal },
  { label: 'Identity', code: '02_ABOUT', href: '#identity', icon: Sparkles },
  { label: 'Skills', code: '03_SKILLS', href: '#skills', icon: Cpu },
  { label: 'Journey', code: '04_STAGES', href: '#journey', icon: Workflow },
  { label: 'Projects', code: '05_WORKS', href: '#projects', icon: Layers },
  { label: 'Contact', code: '06_LINK', href: '#contact', icon: Mail },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Track scroll position to update header styling & active section with RAF throttling
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);

          // Detect current section without blocking scroll thread
          const sections = ['hero', 'identity', 'skills', 'journey', 'projects', 'contact'];
          for (const sectionId of sections) {
            const el = document.getElementById(sectionId);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= 200 && rect.bottom >= 200) {
                setActiveSection(sectionId);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#030712]/85 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_4px_30px_rgba(0,240,255,0.08)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Futuristic Cyber Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, '#hero')}
            className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg p-1"
            aria-label="Alishba Portfolio Home"
          >
            {/* Holographic Hexagon Glyph */}
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-cyan-400/40 p-[1px] shadow-[0_0_15px_rgba(0,240,255,0.3)] group-hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-all">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#030712]/90">
                <span className="font-mono text-sm font-black tracking-tighter bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                  AL
                </span>
              </div>
            </div>

            {/* Title & Live Status */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-sans text-sm font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  {profile.name}
                </span>
                <span className="hidden sm:inline-block font-mono text-[10px] text-cyan-400/80 uppercase">
                  // {profile.role.split(' ')[0]}
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                <span className="text-gray-400">SYS:</span> ONLINE
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-1 rounded-full border border-cyan-500/20 bg-[#060c22]/70 px-4 py-1.5 backdrop-blur-xl shadow-[0_0_20px_rgba(0,240,255,0.06)]"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              const Icon = item.icon;

              return (
                <a
                  key={item.code}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`group relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-500/15 border border-cyan-400/40 shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon
                    className={`h-3 w-3 transition-colors ${
                      isActive ? 'text-cyan-300' : 'text-gray-500 group-hover:text-cyan-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action Elements (Theme, Resume & Contact CTA) */}
          <div className="hidden sm:flex items-center gap-3">
            <ThemeToggle inline={true} />

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-xs text-gray-300 hover:border-cyan-500/40 hover:text-cyan-300 hover:bg-cyan-500/[0.06] transition-all"
              aria-label="Open Resume PDF"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>RESUME</span>
            </a>

            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="relative group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-1.5 font-mono text-xs font-semibold text-black shadow-[0_0_20px_rgba(0,240,255,0.35)] hover:shadow-[0_0_30px_rgba(0,240,255,0.55)] transition-all duration-200 hover:scale-[1.02]"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <span>CONNECT</span>
                <span className="text-[10px]">&rarr;</span>
              </span>
            </a>
          </div>

          {/* Mobile Menu Trigger Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle inline={true} />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-xl border border-cyan-500/30 bg-[#060c22]/80 p-2 text-cyan-300 backdrop-blur-md hover:bg-cyan-500/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 rounded-2xl border border-cyan-500/30 bg-[#060c22]/95 p-4 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                const Icon = item.icon;

                return (
                  <a
                    key={item.code}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className={`flex items-center justify-between rounded-xl px-4 py-2.5 font-mono text-xs transition-colors ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                        : 'text-gray-300 hover:bg-white/[0.05] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4 text-cyan-400" />
                      <span>{item.label}</span>
                    </div>
                    <span className="text-[10px] text-gray-500">[{item.code}]</span>
                  </a>
                );
              })}
            </div>

            {/* Mobile Actions */}
            <div className="mt-4 pt-4 border-t border-cyan-500/20 grid grid-cols-2 gap-2">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.04] py-2 font-mono text-xs text-gray-200 hover:border-cyan-400"
              >
                <FileText className="h-3.5 w-3.5 text-cyan-400" />
                <span>Resume</span>
              </a>
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-2 font-mono text-xs font-semibold text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]"
              >
                <span>Connect</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
