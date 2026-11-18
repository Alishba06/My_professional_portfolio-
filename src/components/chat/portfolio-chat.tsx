'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  RotateCcw,
  Volume2,
  VolumeX,
  ExternalLink,
  Copy,
  Check,
  ChevronDown,
  Terminal,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  source?: 'gemini' | 'local';
}

const QUICK_PROMPTS = [
  { label: '⚡ Who is Alishba?', query: 'Who is Alishba and what does she do?' },
  { label: '🛠️ Core Skills', query: 'What are Alishba’s core technical skills?' },
  { label: '🗺️ Learning Journey', query: 'Tell me about her 5-stage learning journey' },
  { label: '💼 Open to Internships?', query: 'Is Alishba open to internships or hiring?' },
  { label: '📬 Contact & Resume', query: 'How can I contact Alishba or view her resume?' },
];

const INITIAL_MESSAGE: ChatMessage = {
  id: 'init-msg',
  role: 'assistant',
  content: `⚡ **Systems Initialized!** Welcome to **Alishba's Portfolio AI Assistant**.

I am her dedicated neural guide. Ask me anything about her **skills**, **learning journey**, **projects**, or **internship availability**!

Select a quick question below or type your own:`,
  timestamp: 'Just now',
  source: 'local',
};

// Subtle Web Audio cyber chime (self-contained, no external asset files needed)
function playCyberBeep(frequency = 600, duration = 0.08) {
  try {
    if (typeof window === 'undefined') return;
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Audio context may be restricted by browser policy before first interaction
  }
}

/**
 * Clean & Safe Markdown-like Text Formatter for Cyber Chat
 */
function FormattedChatText({ text }: { text: string }) {
  const lines = text.split('\n');

  return (
    <div className="space-y-2 text-sm leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1.5" />;
        }

        // Blockquote
        if (trimmed.startsWith('>')) {
          const quoteContent = trimmed.replace(/^>\s*/, '');
          return (
            <div
              key={idx}
              className="border-l-2 border-cyan-400/60 bg-cyan-950/20 px-3 py-1.5 rounded-r text-cyan-200/90 italic font-mono text-xs"
            >
              {parseInlineMarkdown(quoteContent)}
            </div>
          );
        }

        // Bullet point
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const bulletContent = trimmed.substring(2);
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span className="text-cyan-400 select-none mt-1 text-xs">◆</span>
              <span className="flex-1 text-neutral-200">
                {parseInlineMarkdown(bulletContent)}
              </span>
            </div>
          );
        }

        // Standard line
        return (
          <p key={idx} className="text-neutral-200">
            {parseInlineMarkdown(line)}
          </p>
        );
      })}
    </div>
  );
}

function parseInlineMarkdown(text: string): React.ReactNode[] {
  // Regex pattern for bold, links, and inline code
  const regex = /(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g;
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (!part) return null;

    // Bold: **text**
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2);
      return (
        <strong key={i} className="font-semibold text-white text-cyan-300">
          {boldText}
        </strong>
      );
    }

    // Code: `code`
    if (part.startsWith('`') && part.endsWith('`')) {
      const codeText = part.slice(1, -1);
      return (
        <code
          key={i}
          className="rounded bg-cyan-950/50 border border-cyan-500/20 px-1.5 py-0.5 font-mono text-xs text-cyan-200"
        >
          {codeText}
        </code>
      );
    }

    // Link: [text](url)
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      const [, label, url] = linkMatch;
      return (
        <a
          key={i}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
        >
          {label}
          <ExternalLink className="h-3 w-3 inline" />
        </a>
      );
    }

    return part;
  });
}

export function PortfolioChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleReset = () => {
    setMessages([INITIAL_MESSAGE]);
    if (soundEnabled) playCyberBeep(450, 0.06);
  };

  const handleSend = async (messageText?: string) => {
    const textToSend = (messageText ?? input).trim();
    if (!textToSend || isLoading) return;

    if (soundEnabled) playCyberBeep(750, 0.05);

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const historyPayload = messages.slice(-4).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload,
        }),
      });

      if (!res.ok) {
        throw new Error(`Chat API error: ${res.status}`);
      }

      const data = await res.json();
      const botReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'Apologies, no response received. Please try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source,
      };

      setMessages((prev) => [...prev, botReply]);
      if (soundEnabled) playCyberBeep(900, 0.08);

      if (!isOpen) {
        setUnreadCount((c) => c + 1);
      }
    } catch {
      const fallbackReply: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `⚠️ Neural connection interrupted. Please try again or reach out directly through the [Contact section](#contact).`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'local',
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* --------------------------------------------------------------------- */}
      {/* 1. Floating Launcher Button (Bottom-Right HUD) */}
      {/* --------------------------------------------------------------------- */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
          {/* Subtle floating prompt bubble for first-time visitors */}
          <div
            onClick={() => {
              setIsOpen(true);
              if (soundEnabled) playCyberBeep(650, 0.06);
            }}
            className="hidden sm:flex items-center gap-2 cursor-pointer rounded-full bg-[#050b1a]/90 backdrop-blur-xl border border-cyan-500/30 px-3.5 py-1.5 shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,240,255,0.3)] transition-all group"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            <span className="text-xs font-mono font-medium tracking-wide text-neutral-300 group-hover:text-cyan-300">
              Ask Alishba AI
            </span>
          </div>

          {/* Glowing Orb Launcher Button */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              if (soundEnabled) playCyberBeep(650, 0.06);
            }}
            aria-label="Open Alishba AI Chatbot"
            className="group relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#060c22] via-[#0b1739] to-[#040816] border border-cyan-400/40 p-[2px] shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:shadow-[0_0_40px_rgba(0,240,255,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            {/* Ambient Pulsing Glow Ring */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-pink-500/30 blur-md opacity-75 group-hover:opacity-100 transition-opacity animate-pulse" />

            <div className="relative flex h-full w-full items-center justify-center rounded-[14px] bg-[#030712]/90">
              <Bot className="h-6 w-6 text-cyan-400 group-hover:text-cyan-300 transition-transform group-hover:rotate-6" />

              {/* Status Online Orb */}
              <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-[#030712]" />
              </span>

              {/* Unread badge count if closed */}
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -left-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-[10px] font-bold text-white shadow-[0_0_10px_rgba(255,42,133,0.8)]">
                  {unreadCount}
                </span>
              )}
            </div>
          </button>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* 2. Cyber HUD Chat Window Modal */}
      {/* --------------------------------------------------------------------- */}
      {isOpen && (
        <aside
          role="dialog"
          aria-label="Alishba AI Assistant Chat Window"
          className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-50 flex w-[calc(100vw-1.5rem)] sm:w-[420px] h-[600px] max-h-[88vh] flex-col overflow-hidden rounded-2xl border border-cyan-500/35 bg-[#030714]/95 backdrop-blur-2xl shadow-[0_12px_60px_rgba(0,240,255,0.22)] animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Top Cyber Ambient Gradient Line */}
          <div className="h-[2px] w-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500" />

          {/* Chat Window Header */}
          <header className="flex items-center justify-between border-b border-cyan-500/20 bg-[#050b1f]/90 px-4 py-3">
            <div className="flex items-center gap-3">
              {/* Holographic Avatar */}
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/30 to-purple-500/30 border border-cyan-400/50 p-[1px] shadow-[0_0_12px_rgba(0,240,255,0.3)]">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#030712]">
                  <Sparkles className="h-4 w-4 text-cyan-400" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-mono text-xs font-bold tracking-wider text-white">
                    ALISHBA_AI <span className="text-cyan-400 font-normal">// v2.0</span>
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <p className="text-[10px] font-mono tracking-tight text-emerald-400/90 uppercase">
                    Neural Sync Active
                  </p>
                </div>
              </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center gap-1">
              {/* Sound Toggle */}
              <button
                type="button"
                onClick={() => setSoundEnabled((prev) => !prev)}
                title={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
                aria-label={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-cyan-300 hover:bg-cyan-950/40 transition-colors"
              >
                {soundEnabled ? (
                  <Volume2 className="h-4 w-4 text-cyan-400" />
                ) : (
                  <VolumeX className="h-4 w-4" />
                )}
              </button>

              {/* Reset History */}
              <button
                type="button"
                onClick={handleReset}
                title="Reset Conversation"
                aria-label="Reset Conversation"
                className="p-1.5 rounded-lg text-neutral-400 hover:text-cyan-300 hover:bg-cyan-950/40 transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
              </button>

              {/* Minimize / Close */}
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  if (soundEnabled) playCyberBeep(400, 0.05);
                }}
                title="Close Chat"
                aria-label="Close Chat"
                className="p-1.5 rounded-lg text-neutral-400 hover:text-pink-400 hover:bg-pink-950/30 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </header>

          {/* Chat Message Scroll Area */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent">
            {messages.map((msg) => {
              const isBot = msg.role === 'assistant';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isBot ? 'items-start' : 'items-end'} group`}
                >
                  <div className="flex items-center gap-2 mb-1 px-1">
                    <span className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase">
                      {isBot ? 'ALISHBA_AI' : 'YOU'}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500">{msg.timestamp}</span>
                    {isBot && msg.source === 'gemini' && (
                      <span className="text-[9px] font-mono bg-purple-900/40 text-purple-300 border border-purple-500/30 rounded px-1 py-0.2">
                        GEMINI
                      </span>
                    )}
                  </div>

                  <div
                    className={`relative max-w-[88%] rounded-2xl px-4 py-3 text-sm transition-all ${
                      isBot
                        ? 'rounded-tl-sm bg-[#08112b]/85 border border-cyan-500/25 text-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
                        : 'rounded-tr-sm bg-gradient-to-r from-cyan-600/30 via-purple-600/30 to-pink-600/25 border border-cyan-400/40 text-white shadow-[0_4px_20px_rgba(0,240,255,0.1)]'
                    }`}
                  >
                    <FormattedChatText text={msg.content} />

                    {/* Copy Button for Assistant message */}
                    {isBot && (
                      <div className="mt-2.5 flex items-center justify-end border-t border-cyan-500/15 pt-1.5">
                        <button
                          type="button"
                          onClick={() => handleCopy(msg.id, msg.content)}
                          className="flex items-center gap-1 text-[11px] font-mono text-neutral-400 hover:text-cyan-300 transition-colors"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Thinking / Neural Decoding Indicator */}
            {isLoading && (
              <div className="flex flex-col items-start space-y-1">
                <span className="text-[10px] font-mono tracking-wider text-cyan-400 uppercase">
                  ALISHBA_AI // THINKING...
                </span>
                <div className="flex items-center gap-2 rounded-2xl rounded-tl-sm bg-[#08112b]/80 border border-cyan-500/20 px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                    <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse delay-100" />
                    <span className="h-2 w-2 rounded-full bg-pink-400 animate-pulse delay-200" />
                  </div>
                  <span className="text-xs font-mono text-cyan-300/80">
                    Decrypting knowledge base...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="border-t border-cyan-500/15 bg-[#04091a]/80 px-3 py-2">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleSend(prompt.query)}
                  className="whitespace-nowrap flex-shrink-0 rounded-full bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/25 hover:border-cyan-400 px-3 py-1 text-[11px] font-mono text-neutral-300 hover:text-cyan-200 transition-all disabled:opacity-50"
                >
                  {prompt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input Console Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="border-t border-cyan-500/20 bg-[#050b1f] p-3"
          >
            <div className="relative flex items-center gap-2 rounded-xl bg-[#030612] border border-cyan-500/30 px-3 py-1.5 focus-within:border-cyan-400 focus-within:shadow-[0_0_18px_rgba(0,240,255,0.25)] transition-all">
              <Terminal className="h-4 w-4 text-cyan-400/70 select-none flex-shrink-0" />

              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about skills, journey, projects..."
                disabled={isLoading}
                maxLength={1000}
                className="w-full bg-transparent text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none disabled:opacity-50 font-sans"
              />

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send Message"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500 hover:text-black border border-cyan-400/40 transition-all disabled:opacity-30 disabled:pointer-events-none flex-shrink-0"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="mt-1.5 flex items-center justify-between px-1 text-[10px] font-mono text-neutral-500">
              <span>Press Enter to send</span>
              <span className="text-cyan-400/70">Grounded in Portfolio Truth</span>
            </div>
          </form>
        </aside>
      )}
    </>
  );
}
