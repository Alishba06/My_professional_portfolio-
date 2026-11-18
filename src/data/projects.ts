/**
 * Portfolio Projects Data
 * Source of Truth: Alishba's real GitHub repositories (@Alishba06) & Vercel deployments
 */

import type { Project } from '@/types/portfolio';

export const projects: Project[] = [
  {
    id: 'bmw-nexus-luxury',
    title: 'BMW NEXUS — Intelligent Mobility Experience',
    description:
      'An ultra-premium automotive 3D web application and interactive experience featuring a real-time Three.js WebGL car stage, metallic paint shaders, lighting controls, and synthesized Web Audio API sound effects.',
    technologies: [
      'Next.js 14',
      'React',
      'Three.js',
      'TypeScript',
      'Tailwind CSS',
      'Web Audio API',
    ],
    image: {
      src: '/images/bmw-nexus.jpg',
      alt: 'BMW NEXUS — 3D Intelligent Mobility Experience Preview',
    },
    sourceUrl: 'https://github.com/Alishba06/Bmw-luxury-website',
    liveUrl: 'https://bmwluxuryweb.vercel.app',
    order: 1,
    featured: true,
  },
  {
    id: 'physical-ai-robotics',
    title: 'Physical AI & Humanoid Robotics Portal with AI Assistant',
    description:
      'A comprehensive learning portal and interactive documentation guide for Physical AI, humanoid robotics, ROS 2, and VLA (Vision-Language-Action) systems featuring an embedded AI Chatbot.',
    technologies: [
      'Next.js',
      'Python',
      'AI Chatbot',
      'TypeScript',
      'Tailwind CSS',
    ],
    sourceUrl: 'https://github.com/Alishba06/Q_4_1_hackathon_with_chabot',
    liveUrl: 'https://q-4-1-hackathon-with-chabot.vercel.app',
    order: 2,
    featured: true,
  },
  {
    id: 'openai-agent-chatbot',
    title: 'Autonomous Conversational Agent (Chainlit & Python)',
    description:
      'An intelligent conversational AI agent application developed with Python, Chainlit streaming interface, and prompt engineering loops to manage multi-turn reasoning and real-time dialogue.',
    technologies: ['Python', 'Chainlit', 'LLM APIs', 'Prompt Engineering'],
    sourceUrl: 'https://github.com/Alishba06/open-ai-agent-chatbot',
    order: 3,
    featured: true,
  },
  {
    id: 'hackathon-ui-ecommerce',
    title: 'Modern UI/UX E-Commerce Marketplace',
    description:
      'A component-driven modern e-commerce storefront featuring dynamic catalog browsing, accessible modal dialogues with Radix UI, responsive grid architectures, and sleek cyber styling.',
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Radix UI',
    ],
    sourceUrl: 'https://github.com/Alishba06/hackathon-ui',
    liveUrl: 'https://hackathon-ui-omega.vercel.app',
    order: 4,
  },
  {
    id: 'gmail-to-sheets-automation',
    title: 'Gmail to Google Sheets Workflow Automation',
    description:
      'An automated data capture and pipeline tool that processes incoming email information and synchronizes structured entries into Google Sheets with zero manual data entry.',
    technologies: [
      'PowerShell',
      'Automation Scripts',
      'Google Sheets',
      'Spec-Driven',
    ],
    sourceUrl: 'https://github.com/Alishba06/gmail-to-sheets-automation',
    order: 5,
  },
  {
    id: 'dynamic-blog-platform',
    title: 'Interactive Dynamic Tech Blog Platform',
    description:
      'A responsive technology publishing platform featuring dynamic routing, server-side rendering, accessible typography, and clean content presentation.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    sourceUrl: 'https://github.com/Alishba06/milston-3-blog-wesite-',
    liveUrl: 'https://milston-3-blog-wesite.vercel.app',
    order: 6,
  },
  {
    id: 'interactive-resume-builder',
    title: 'Dynamic Interactive Resume Builder',
    description:
      'An interactive browser-based CV builder with live form validation, dynamic preview rendering, customized styling, and downloadable PDF generation capabilities.',
    technologies: ['TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'DOM APIs'],
    sourceUrl: 'https://github.com/Alishba06/hackathon-milston5',
    liveUrl: 'https://hackathon-milston5.vercel.app',
    order: 7,
  },
  {
    id: 'artisanal-coffee-showcase',
    title: 'Artisanal Coffee Web Experience',
    description:
      'An artisanal brand showcase web application designed with fluid responsive layouts, interactive product features, and warm modern visual aesthetics.',
    technologies: ['HTML5', 'CSS3', 'Responsive Design', 'Vercel'],
    sourceUrl: 'https://github.com/Alishba06/web-coffee',
    liveUrl: 'https://web-coffee-topaz.vercel.app',
    order: 8,
  },
];
