'use client';

import React from 'react';
import { ExternalLink, Github, Sparkles, FolderGit2, Layers } from 'lucide-react';
import { projects as defaultProjects } from '@/data/projects';
import type { Project } from '@/types/portfolio';
import { AppErrorBoundary } from '@/components/common/error-boundary';

export interface ProjectCardsProps {
  projectsList?: Project[];
}

export interface ProjectCardProps {
  project: Project;
}

/**
 * Reusable Project Card Component
 * Supports title, short description, technologies, optional image/screenshot,
 * optional GitHub link, and optional live demo link.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const summary = project.description || project.tagline || project.solution || '';
  const imageVisual = project.image ?? project.visuals?.find((v) => v.type === 'image');

  return (
    <article
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-cyan-500/25 bg-gradient-to-br from-[#080d1e]/90 via-[#050814]/95 to-[#02050b]/98 p-6 shadow-xl backdrop-blur-2xl transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]"
      aria-labelledby={`project-title-${project.id}`}
    >
      {/* Top Laser Accent */}
      <div
        className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400"
        aria-hidden="true"
      />

      <div>
        {/* Optional Project Image / Screenshot */}
        {imageVisual?.src && (
          <div className="mb-5 overflow-hidden rounded-2xl border border-slate-800/80 bg-[#030714]">
            <div className="aspect-video w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageVisual.src}
                alt={imageVisual.alt || `${project.title} preview`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </div>
        )}

        {/* Project Title */}
        <h3
          id={`project-title-${project.id}`}
          className="text-xl font-bold tracking-tight text-white transition-colors group-hover:text-cyan-300"
        >
          {project.title}
        </h3>

        {/* Short Description */}
        {summary && (
          <p className="mt-2.5 text-sm leading-relaxed text-neutral-300">{summary}</p>
        )}

        {/* Technologies Used */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies used">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1 font-mono text-xs text-gray-300 transition-colors hover:border-cyan-400/50 hover:text-cyan-200"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer Links: GitHub & Live Demo (rendered only when available) */}
      {(project.sourceUrl || project.liveUrl) && (
        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-800/80 pt-4">
          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[38px] items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900/80 px-3.5 py-2 font-mono text-xs font-medium text-gray-200 transition-colors hover:border-cyan-400 hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label={`View GitHub repository for ${project.title}`}
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              <span>GitHub</span>
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[38px] items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 px-3.5 py-2 font-mono text-xs font-bold text-black shadow-[0_0_20px_rgba(0,240,255,0.25)] transition-all hover:from-cyan-300 hover:to-sky-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label={`Open live demo for ${project.title}`}
            >
              <span>Live Demo</span>
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}
        </div>
      )}
    </article>
  );
}

/**
 * Projects Showcase Section
 * Clean, responsive card-based layout with intentional empty state
 * when no completed projects are registered yet.
 */
export function ProjectCards({ projectsList = defaultProjects }: ProjectCardsProps) {
  const sortedProjects = [...projectsList].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

  return (
    <AppErrorBoundary componentName="ProjectCards" fallbackTitle="Projects Showcase Offline">
      <section
        id="projects"
        aria-labelledby="projects-heading"
        className="relative z-10 w-full overflow-hidden border-t border-cyan-500/20 bg-[#02040a] px-4 py-24 sm:px-6 lg:px-8"
      >
        {/* Background Ambient Cyber Glows */}
        <div
          className="pointer-events-none absolute -left-20 top-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/[0.04] blur-[150px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-20 top-1/2 h-[550px] w-[550px] rounded-full bg-purple-600/[0.04] blur-[160px]"
          aria-hidden="true"
        />
        <div
          className="dark-futuristic-grid pointer-events-none absolute inset-0 opacity-20"
          style={{
            maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, transparent 80%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, transparent 80%)',
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl">
          {/* Header Section */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-gradient-to-r from-cyan-950/60 to-purple-950/40 px-4 py-1.5 font-mono text-xs font-semibold text-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.15)] backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
              <span>MY WORK // SELECTED PROJECTS</span>
            </div>

            <h2
              id="projects-heading"
              className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Projects &amp;{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,240,255,0.3)]">
                Experiments
              </span>
            </h2>

            <p className="mt-4 text-base leading-relaxed text-neutral-300 sm:text-lg">
              A collection of AI projects, experiments, and practical solutions I&apos;m building as
              an AI Agent Developer.
            </p>
          </div>

          {/* Projects Card Grid or Intentional Empty State */}
          {sortedProjects.length > 0 ? (
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sortedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="relative mt-12 overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-[#080d1e]/90 via-[#050814]/95 to-[#02050b]/98 p-8 shadow-[0_8px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:p-12">
              {/* Top Glowing Laser Line */}
              <div
                className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-500"
                aria-hidden="true"
              />

              {/* Subtle Cyber Corner Accents */}
              <div className="cyber-corner-tl" aria-hidden="true" />
              <div className="cyber-corner-tr" aria-hidden="true" />
              <div className="cyber-corner-bl" aria-hidden="true" />
              <div className="cyber-corner-br" aria-hidden="true" />

              <div className="mx-auto flex max-w-xl flex-col items-center text-center">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-950/50 text-cyan-300 shadow-[0_0_25px_rgba(0,240,255,0.18)]">
                  <FolderGit2 className="h-7 w-7" aria-hidden="true" />
                </div>

                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-[#060c22]/80 px-3 py-1 font-mono text-[11px] font-semibold tracking-wider text-cyan-300">
                  <Layers className="h-3 w-3 text-purple-400" aria-hidden="true" />
                  <span>BUILDING IN PROGRESS</span>
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Projects are coming soon.
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-neutral-300 sm:text-base">
                  I&apos;m currently building practical AI solutions. Completed projects will be
                  showcased here.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </AppErrorBoundary>
  );
}
