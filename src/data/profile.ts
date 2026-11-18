/**
 * Alishba Profile Singleton Data
 * Source of Truth: specs/001-immersive-ai-portfolio/data-model.md
 * Task: T010 [US1/US2]
 */

import type { Profile, Skill } from '@/types/portfolio';
import { learningJourneyStages } from './learning-journey';
import { projects } from './projects';
import { contactOptions } from './contact-options';

export const skills: Skill[] = [
  // AI & Agent Orchestration
  {
    category: 'AI & Agent Orchestration',
    name: 'AI Agents / Agentic AI',
    level: 'core',
    description:
      'Designing goal-directed autonomous agents, structured planning, tool usage, and iterative reasoning loops.',
    featured: true,
  },
  {
    category: 'AI & Agent Orchestration',
    name: 'Generative AI',
    level: 'core',
    description:
      'Applying modern generative AI techniques, foundation model capabilities, and multimodal solutions.',
    featured: true,
  },
  {
    category: 'AI & Agent Orchestration',
    name: 'Prompt Engineering',
    level: 'core',
    description:
      'Designing clear system prompts, few-shot examples, structured JSON outputs, and context management.',
    featured: true,
  },
  {
    category: 'AI & Agent Orchestration',
    name: 'Gemini / LLM concepts',
    level: 'core',
    description:
      'Working with Google Gemini models, multimodal context, token limits, parameters, and API integration.',
    featured: true,
  },
  {
    category: 'AI & Agent Orchestration',
    name: 'Digital FTE / AI Workers concepts',
    level: 'core',
    description:
      'Exploring autonomous digital workers and specialized agent roles designed to automate multi-step workflows.',
    featured: true,
  },

  // Engineering & Frameworks
  {
    category: 'Engineering & Frameworks',
    name: 'Python',
    level: 'core',
    description:
      'Core Python programming, object-oriented concepts, scripting, automation, and backend logic.',
    featured: true,
  },
  {
    category: 'Engineering & Frameworks',
    name: 'React',
    level: 'core',
    description:
      'Building interactive user interfaces using reusable components, state hooks, and modern frontend practices.',
    featured: true,
  },
  {
    category: 'Engineering & Frameworks',
    name: 'Next.js',
    level: 'core',
    description:
      'Developing web applications with App Router, server components, client components, and API routes.',
  },
  {
    category: 'Engineering & Frameworks',
    name: 'JavaScript',
    level: 'core',
    description:
      'Modern ES6+ JavaScript, asynchronous operations, event handling, and DOM manipulation.',
  },
  {
    category: 'Engineering & Frameworks',
    name: 'TypeScript',
    level: 'core',
    description:
      'Type-safe JavaScript development with interfaces, type annotations, and compile-time error prevention.',
  },
  {
    category: 'Engineering & Frameworks',
    name: 'HTML',
    level: 'core',
    description:
      'Semantic document markup, structured web standards, and accessible page hierarchies.',
  },
  {
    category: 'Engineering & Frameworks',
    name: 'CSS',
    level: 'core',
    description:
      'Styling web layouts, responsive design, Flexbox, Grid, and cross-browser styling.',
  },
  {
    category: 'Engineering & Frameworks',
    name: 'Tailwind CSS',
    level: 'core',
    description:
      'Utility-first CSS styling for rapid, responsive UI development and consistent design tokens.',
  },
  {
    category: 'Engineering & Frameworks',
    name: 'Streamlit',
    level: 'supporting',
    description:
      'Building rapid prototypes and interactive web applications in Python for AI demos and tools.',
  },

  // Systems & Reliability
  {
    category: 'Systems & Reliability',
    name: 'Git & GitHub',
    level: 'core',
    description:
      'Version control workflows, branching, repository management, and collaboration on GitHub.',
  },
  {
    category: 'Systems & Reliability',
    name: 'Spec-Driven Development',
    level: 'core',
    description:
      'Building applications against structured specifications, clear schemas, and defined acceptance criteria.',
  },
  {
    category: 'Systems & Reliability',
    name: 'FDE / Forward Deployed Engineering concepts',
    level: 'supporting',
    description:
      'Understanding methodologies for embedding AI solutions directly into operational workflows.',
  },
  {
    category: 'Systems & Reliability',
    name: 'Loop & Harness Engineering concepts',
    level: 'supporting',
    description:
      'Exploring execution loops, evaluation harnesses, testing boundaries, and safety constraints for agents.',
  },
  {
    category: 'Systems & Reliability',
    name: 'Vercel / Deployment',
    level: 'supporting',
    description:
      'Deploying web applications and frontend projects to live hosting environments on Vercel.',
  },
];

export const profile: Profile = {
  name: 'Alishba',
  role: 'AI Agent Developer',
  positioningStatement: 'I build AI-powered intelligent solutions to solve real industry problems.',
  tagline:
    'Building intelligent AI agents, automation workflows, and practical AI-powered solutions.',
  bio: 'I am an AI Agent Developer focused on building intelligent AI agents, automation workflows, and practical AI-powered solutions that solve real-world problems.',
  skills,
  learningJourney: learningJourneyStages,
  projects,
  contactOptions,
  resumeUrl: '/resume.pdf',
  githubUrl: 'https://github.com/Alishba06',
  linkedinUrl: 'https://linkedin.com/in/alishba-javed-4961b12bb/',
  email: 'alishbainteligent46@gmail.com',
};
