'use client';

import React, { useState } from 'react';
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { contactOptions as defaultContactOptions } from '@/data/contact-options';
import { profile } from '@/data/profile';
import { publicEnv } from '@/utils/env';
import type { ContactOption } from '@/types/portfolio';
import { AppErrorBoundary } from '@/components/common/error-boundary';
import { ContactOptions } from './contact-options';
import { trackEvent } from '@/utils/analytics';

export interface ContactHubProps {
  options?: ContactOption[];
}

interface FormState {
  name: string;
  email: string;
  message: string;
}

const OPPORTUNITY_TYPES = [
  'AI Internships',
  'AI Agent Developer Opportunities',
  'Technical Collaboration',
  'AI Automation Projects',
];

// Replace the email in src/data/profile.ts with your verified personal email.
const PLACEHOLDER_EMAIL_DISPLAY = 'your-email@example.com';

/**
 * Clean, Modern Contact Section
 * - Left column: Email Me, Open to Opportunities, and Direct Links (GitHub, LinkedIn, Resume PDF)
 * - Right column: Single Contact Form (Name, Email, Message, Send Message)
 */
export function ContactHub({ options = defaultContactOptions }: ContactHubProps) {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const rawEmail = profile.email?.trim() || '';
  const hasRealEmail = rawEmail.length > 0 && !rawEmail.toLowerCase().endsWith('@example.com');

  const handleCopyEmail = async () => {
    if (!hasRealEmail) return;
    try {
      await navigator.clipboard.writeText(rawEmail);
      setCopiedEmail(true);
      trackEvent('contact_email_copied', { email: rawEmail });
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      trackEvent('contact_email_copy_failed', { email: rawEmail });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setFormStatus('error');
      setStatusMessage('Please enter your name (at least 2 characters).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      setFormStatus('error');
      setStatusMessage('Please enter a valid email address.');
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setFormStatus('error');
      setStatusMessage('Please enter a message of at least 10 characters.');
      return;
    }

    setFormStatus('submitting');
    setStatusMessage('Sending your message...');
    trackEvent('contact_form_submitting');

    const web3Key = publicEnv.web3FormsAccessKey || process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    try {
      if (web3Key) {
        const web3Res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: web3Key,
            name: formData.name.trim(),
            email: formData.email.trim(),
            message: formData.message.trim(),
            subject: `[Portfolio Inquiry] Message from ${formData.name.trim()}`,
            from_name: 'Alishba Portfolio',
          }),
        });

        const web3Data = (await web3Res.json().catch(() => ({}))) as {
          success?: boolean;
          message?: string;
        };

        if (web3Res.ok && web3Data.success !== false) {
          setFormStatus('success');
          setStatusMessage(
            'Your message has been sent successfully to Alishba! Thank you for reaching out.'
          );
          trackEvent('contact_form_success');
          setFormData({ name: '', email: '', message: '' });
          return;
        }
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = (await res.json()) as {
        success?: boolean;
        configured?: boolean;
        message?: string;
        error?: string;
      };

      if (res.status === 503 || data.configured === false) {
        // Direct seamless mailto trigger when background email key is not set
        const subject = encodeURIComponent(`[Portfolio Inquiry] Message from ${formData.name}`);
        const body = encodeURIComponent(
          `Hi Alishba,\n\n${formData.message}\n\n---\nSender: ${formData.name}\nEmail: ${formData.email}`
        );
        window.location.href = `mailto:${rawEmail}?subject=${subject}&body=${body}`;
        setFormStatus('success');
        setStatusMessage(
          'Opening your mail app to send this message directly to Alishba. Thank you for reaching out!'
        );
        trackEvent('contact_form_mailto_dispatched');
        setFormData({ name: '', email: '', message: '' });
        return;
      }

      if (res.ok && data.success) {
        setFormStatus('success');
        setStatusMessage(
          data.message ?? 'Your message has been sent successfully. Thank you for reaching out!'
        );
        trackEvent('contact_form_success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus('error');
        setStatusMessage(
          data.error ?? 'Unable to send your message right now. Please try again later.'
        );
        trackEvent('contact_form_error', { error: data.error });
      }
    } catch {
      setFormStatus('error');
      setStatusMessage('Network error while sending your message. Please try again later.');
      trackEvent('contact_form_network_error');
    }
  };

  return (
    <AppErrorBoundary componentName="ContactHub" fallbackTitle="Contact Section Unavailable">
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="relative z-10 w-full overflow-hidden border-t border-cyan-500/20 bg-[#02040a] px-4 py-24 sm:px-6 lg:px-8"
      >
        {/* Ambient atmospheric glows */}
        <div
          className="pointer-events-none absolute -left-20 top-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/[0.04] blur-[150px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-20 top-1/2 h-[500px] w-[500px] rounded-full bg-purple-600/[0.05] blur-[160px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-gradient-to-r from-cyan-950/60 to-purple-950/40 px-4 py-1.5 font-mono text-xs font-semibold text-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.15)] backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
              <span>LET&apos;S CONNECT</span>
            </div>

            <h2
              id="contact-heading"
              className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Get in{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,240,255,0.3)]">
                Touch
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg">
              I&apos;m always interested in connecting with people, exploring AI opportunities, and
              collaborating on meaningful projects.
            </p>
          </div>

          {/* 2-Column Responsive Layout */}
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            {/* LEFT COLUMN (5 Cols): Email, Opportunities & Simple Contact Links */}
            <div className="space-y-6 lg:col-span-5">
              {/* EMAIL ME Card */}
              <div className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-[#080f24]/90 via-[#050917]/95 to-[#02050b]/98 p-6 shadow-xl backdrop-blur-2xl">
                <div className="h-0.5 w-full bg-gradient-to-r from-cyan-400 to-sky-400" />

                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-500/40 bg-cyan-950/60 text-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.25)]">
                    <Mail className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                      EMAIL ME
                    </span>
                    {hasRealEmail ? (
                      <div className="break-all text-base font-bold text-white sm:text-lg">
                        {rawEmail}
                      </div>
                    ) : (
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="break-all font-mono text-sm font-semibold text-gray-300 sm:text-base">
                          {PLACEHOLDER_EMAIL_DISPLAY}
                        </span>
                        <span className="rounded-full border border-amber-500/30 bg-amber-950/40 px-2 py-0.5 font-mono text-[10px] font-semibold text-amber-300">
                          Placeholder
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {hasRealEmail ? (
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-cyan-500/40 bg-cyan-950/60 px-3.5 py-2 font-mono text-xs font-semibold text-cyan-300 shadow-sm transition-all hover:bg-cyan-900/60 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      aria-label="Copy email address"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                          <span className="text-emerald-300">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" aria-hidden="true" />
                          <span>Copy Email</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`mailto:${rawEmail}`}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900/90 px-3.5 py-2 font-mono text-xs font-semibold text-gray-200 transition-colors hover:border-cyan-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    >
                      <ExternalLink className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                      <span>Open Mail App</span>
                    </a>
                  </div>
                ) : (
                  <p className="mt-4 rounded-xl border border-amber-500/20 bg-amber-950/20 px-3.5 py-2.5 text-xs leading-relaxed text-amber-200/90">
                    Personal email not configured yet. Update{' '}
                    <code className="font-mono text-amber-300">email</code> in{' '}
                    <code className="font-mono text-amber-300">src/data/profile.ts</code> to enable
                    direct email links.
                  </p>
                )}
              </div>

              {/* OPEN TO OPPORTUNITIES Card */}
              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-5 backdrop-blur-xl">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </span>
                  <span className="font-mono text-xs font-bold tracking-wider text-emerald-300">
                    OPEN TO OPPORTUNITIES
                  </span>
                </div>

                <ul className="mt-3.5 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
                  {OPPORTUNITY_TYPES.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 rounded-xl border border-slate-800/70 bg-slate-900/50 px-3 py-2 text-xs text-gray-200"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Simple Contact Links: GitHub, LinkedIn, Resume (PDF) */}
              <div>
                <h3 className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-gray-400">
                  Links &amp; Resume
                </h3>
                <ContactOptions options={options} />
              </div>
            </div>

            {/* RIGHT COLUMN (7 Cols): Single Clean Contact Form */}
            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-[#070d1e]/95 via-[#050814]/98 to-[#02040a] p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
                {/* Top Glowing Laser Accent */}
                <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-500" />

                <div className="mt-4">
                  <span className="font-mono text-xs font-semibold text-cyan-400">
                    CONTACT FORM
                  </span>
                  <h3 className="mt-1 text-2xl font-black text-white sm:text-3xl">
                    Send a Message
                  </h3>
                  <p className="mt-1 text-xs text-gray-300 sm:text-sm">
                    Have a question, opportunity, or collaboration idea? Send a message below.
                  </p>
                </div>



                {/* Error Alert */}
                {formStatus === 'error' && (
                  <div
                    role="alert"
                    className="mt-5 flex flex-col gap-2 rounded-2xl border border-rose-500/40 bg-rose-950/30 p-4 text-xs text-rose-300"
                  >
                    <div className="flex items-start gap-2.5">
                      <AlertCircle
                        className="mt-0.5 h-4 w-4 shrink-0 text-rose-400"
                        aria-hidden="true"
                      />
                      <span>{statusMessage}</span>
                    </div>

                    {rawEmail && (
                      <div className="mt-1 pt-2 border-t border-rose-500/20 flex flex-wrap items-center gap-2">
                        <span className="text-gray-300">Or send directly:</span>
                        <a
                          href={`mailto:${rawEmail}?subject=${encodeURIComponent(
                            `[Portfolio Contact] Message from ${formData.name || 'Visitor'}`
                          )}&body=${encodeURIComponent(
                            `${formData.message || ''}\n\n---\nFrom: ${formData.name || 'Visitor'} (${formData.email || 'N/A'})`
                          )}`}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-400/50 bg-cyan-950/80 px-3 py-1.5 font-mono text-xs font-semibold text-cyan-300 hover:bg-cyan-900 transition-colors"
                        >
                          <Send className="h-3 w-3" />
                          <span>Open Mail App to Send to {rawEmail}</span>
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {/* Success State */}
                {formStatus === 'success' ? (
                  <div
                    role="status"
                    className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-emerald-500/40 bg-emerald-950/30 p-8 text-center"
                  >
                    <CheckCircle2
                      className="h-14 w-14 text-emerald-400 animate-bounce"
                      aria-hidden="true"
                    />
                    <h4 className="mt-4 text-xl font-bold text-white">Message Sent</h4>
                    <p className="mt-2 max-w-md text-sm text-emerald-200">{statusMessage}</p>
                    <button
                      type="button"
                      onClick={() => setFormStatus('idle')}
                      className="mt-6 inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-5 py-2.5 font-mono text-xs font-bold text-black shadow-md transition-colors hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    >
                      <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Send Another Message</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="mb-1.5 block font-mono text-xs font-medium text-gray-300"
                      >
                        Name <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                        className="min-h-[44px] w-full rounded-xl border border-slate-700/80 bg-slate-900/90 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 transition-all focus:border-cyan-400 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="mb-1.5 block font-mono text-xs font-medium text-gray-300"
                      >
                        Email <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your.email@domain.com"
                        className="min-h-[44px] w-full rounded-xl border border-slate-700/80 bg-slate-900/90 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 transition-all focus:border-cyan-400 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="mb-1.5 block font-mono text-xs font-medium text-gray-300"
                      >
                        Message <span className="text-cyan-400">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Write your message here..."
                        className="w-full rounded-xl border border-slate-700/80 bg-slate-900/90 p-3.5 text-sm text-white placeholder-gray-500 transition-all focus:border-cyan-400 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                      />
                    </div>

                    <div className="pt-1">
                      <button
                        type="submit"
                        disabled={formStatus === 'submitting'}
                        className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 px-6 py-3 font-mono text-xs font-bold text-black shadow-[0_0_25px_rgba(0,240,255,0.3)] transition-all hover:from-cyan-300 hover:to-blue-400 hover:shadow-[0_0_35px_rgba(0,240,255,0.5)] focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50"
                      >
                        {formStatus === 'submitting' ? (
                          <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send className="h-3.5 w-3.5" aria-hidden="true" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppErrorBoundary>
  );
}
