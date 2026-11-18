'use client';

import React from 'react';
import { Github, Linkedin, FileText, ExternalLink, Download } from 'lucide-react';
import type { ContactOption, ContactOptionId } from '@/types/portfolio';
import { contactOptions as defaultContactOptions } from '@/data/contact-options';
import { trackEvent } from '@/utils/analytics';

export interface ContactOptionsProps {
  options?: ContactOption[];
  onSelectFormIntent?: (optionId: ContactOptionId) => void;
  activeIntentId?: ContactOptionId;
}

/**
 * Direct Contact Links Component
 * Renders verified external profile and resume links (GitHub, LinkedIn, Resume PDF).
 */
export function ContactOptions({ options = defaultContactOptions }: ContactOptionsProps) {
  const directLinks = options.filter(
    (option) =>
      (option.target === 'externalUrl' || option.target === 'file') &&
      Boolean(option.url && option.url.trim() !== '#')
  );

  const getOptionMeta = (option: ContactOption) => {
    switch (option.id) {
      case 'github':
        return {
          title: 'GitHub',
          subtitle: 'View repositories & code',
          actionText: 'Open Profile',
          icon: <Github className="h-5 w-5 text-gray-200" aria-hidden="true" />,
          cardClass:
            'hover:border-purple-500/50 hover:bg-[#0e0a1f] hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] focus:ring-purple-400',
          titleHoverClass: 'group-hover:text-purple-300',
          actionClass: 'text-purple-400',
          isDownload: false,
        };
      case 'linkedin':
        return {
          title: 'LinkedIn',
          subtitle: 'Professional profile & network',
          actionText: 'Connect',
          icon: <Linkedin className="h-5 w-5 text-blue-400" aria-hidden="true" />,
          cardClass:
            'hover:border-blue-500/50 hover:bg-[#091024] hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] focus:ring-blue-400',
          titleHoverClass: 'group-hover:text-blue-300',
          actionClass: 'text-blue-400',
          isDownload: false,
        };
      case 'resume':
      default:
        return {
          title: 'Resume (PDF)',
          subtitle: 'View or download CV',
          actionText: 'Download PDF',
          icon: <FileText className="h-5 w-5 text-amber-400" aria-hidden="true" />,
          cardClass:
            'hover:border-amber-500/50 hover:bg-[#12111d] hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] focus:ring-amber-400',
          titleHoverClass: 'group-hover:text-amber-300',
          actionClass: 'text-amber-400',
          isDownload: true,
        };
    }
  };

  return (
    <div
      className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1"
      role="region"
      aria-label="Direct contact links"
    >
      {directLinks.map((option) => {
        const meta = getOptionMeta(option);
        const href = option.url as string;

        return (
          <a
            key={option.id}
            href={href}
            {...(meta.isDownload ? { download: 'Alishba_AI_Agent_Developer_Resume.pdf' } : {})}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent('contact_option_selected', {
                optionId: option.id,
                label: meta.title,
                target: option.target,
              })
            }
            className={`group flex items-center justify-between gap-4 rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4 transition-all duration-300 focus:outline-none focus:ring-2 ${meta.cardClass}`}
            aria-label={
              meta.isDownload
                ? "Download Alishba's Resume (PDF)"
                : `Open Alishba's ${meta.title} profile`
            }
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/90 transition-transform group-hover:scale-105">
                {meta.icon}
              </div>
              <div className="min-w-0">
                <h4
                  className={`text-sm font-bold text-white transition-colors ${meta.titleHoverClass}`}
                >
                  {meta.title}
                </h4>
                <p className="truncate text-xs text-gray-400">{meta.subtitle}</p>
              </div>
            </div>

            <div
              className={`inline-flex shrink-0 items-center gap-1 font-mono text-[11px] font-semibold ${meta.actionClass}`}
            >
              <span className="inline sm:hidden lg:inline">{meta.actionText}</span>
              {meta.isDownload ? (
                <Download className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
              ) : (
                <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              )}
            </div>
          </a>
        );
      })}
    </div>
  );
}
