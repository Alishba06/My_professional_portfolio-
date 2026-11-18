/**
 * Learning Journey Data for Alishba
 * Chronological evolution showing step-by-step learning progression:
 * Foundation -> Web Development -> Python Application Building -> Generative AI -> Agentic AI & FDE
 */

import type { LearningJourneyStage } from '@/types/portfolio';

export const learningJourneyStages: LearningJourneyStage[] = [
  {
    id: 'early-foundation',
    order: 1,
    title: 'Stage 01 — Foundation',
    timePeriod: '2023',
    milestone: 'Core IT, Python & Web Fundamentals',
    icon: 'code',
    description:
      'Started my journey with fundamental programming principles, object-oriented concepts in Python, core web building blocks, and essential developer tooling.',
    expandedDetails:
      'I began my learning journey by focusing on computer science basics and problem-solving rather than jumping straight to complex frameworks. I practiced Python syntax, object-oriented programming (OOP), and foundational problem-solving logic. Alongside programming logic, I learned how the web works by building simple pages with semantic HTML, styling with CSS, adding client-side interactivity with JavaScript, and managing my code with Git, GitHub, and VS Code.',
    technologies: [
      'Python fundamentals',
      'OOP',
      'HTML',
      'CSS',
      'JavaScript',
      'Git & GitHub',
      'VS Code',
      'Basic problem solving',
    ],
    keyLearnings: [
      'Understanding program control flow, functions, and object-oriented fundamentals',
      'Writing structured HTML pages and responsive styles using CSS',
      'Client-side scripting, event handling, and DOM manipulation in JavaScript',
      'Using Git and GitHub for version control and commit tracking',
      'Configuring VS Code, terminal workflows, and basic debugging techniques',
    ],
  },
  {
    id: 'web-development',
    order: 2,
    title: 'Stage 02 — Web Development',
    timePeriod: '2023–2024',
    milestone: 'Modern Web Development',
    icon: 'globe',
    description:
      'Progressed into modern frontend and web application development, building component-driven interfaces with React, Next.js, TypeScript, and Tailwind CSS.',
    expandedDetails:
      'After grasping basic HTML, CSS, and JavaScript, I transitioned to modern component-based frontend development. I learned React to break interfaces into reusable components and manage state effectively. To build more scalable and structured applications, I adopted TypeScript for type safety, Next.js for routing and server-side features, and Tailwind CSS for responsive styling. I also learned how web apps connect with backend services through REST APIs.',
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Component-based development',
      'APIs & basic backend concepts',
    ],
    keyLearnings: [
      'Structuring reusable component hierarchies and managing state hooks in React',
      'Using TypeScript to write type-safe code and catch errors during development',
      'Leveraging Next.js App Router for file-based routing and page rendering',
      'Crafting responsive layouts quickly and consistently using Tailwind CSS',
      'Fetching data from REST APIs and managing asynchronous request states',
    ],
  },
  {
    id: 'python-application-building',
    order: 3,
    title: 'Stage 03 — Python & Application Building',
    timePeriod: '2024',
    milestone: 'Python Application Development',
    icon: 'terminal',
    description:
      'Applied Python toward practical applications, automation scripts, asynchronous concepts, and interactive application interfaces using Streamlit.',
    expandedDetails:
      'In this stage, I shifted from writing basic Python scripts to developing functional applications and practical automation tools. I deepened my understanding of OOP to organize code cleanly into modules. I explored asynchronous programming concepts to handle non-blocking operations and automated repetitive tasks. To make Python scripts accessible to users, I used Streamlit to rapidly build interactive web interfaces for data and logic demonstrations.',
    technologies: [
      'Python application development',
      'OOP',
      'Async programming concepts',
      'Automation',
      'Streamlit',
      'Backend/application concepts',
    ],
    keyLearnings: [
      'Building modular Python applications with object-oriented design and clean functions',
      'Writing automation scripts to handle repetitive file and data tasks',
      'Understanding basic async/await patterns and concurrent execution flow',
      'Creating rapid interactive web dashboards and application UIs with Streamlit',
      'Structuring application logic, basic error handling, and environment configs',
    ],
  },
  {
    id: 'ai-generative-ai',
    order: 4,
    title: 'Stage 04 — Generative AI',
    timePeriod: '2024–2025',
    milestone: 'Generative AI & LLMs',
    icon: 'bot',
    description:
      'Focused on modern generative AI technologies, foundational LLM concepts, prompt engineering, Gemini API integration, and AI-powered Streamlit apps.',
    expandedDetails:
      'This stage marked my entry into modern generative artificial intelligence. I studied how Large Language Models work, including tokens, context windows, and inference parameters. I practiced prompt engineering techniques to guide models toward accurate, structured JSON responses. I integrated Google\'s Gemini API into Python projects and built interactive AI-powered applications in Streamlit to explore real-world use cases of foundation models.',
    technologies: [
      'LLM concepts',
      'Prompt Engineering',
      'Gemini',
      'Generative AI',
      'API usage',
      'AI-powered applications',
      'Streamlit AI applications',
    ],
    keyLearnings: [
      'Understanding core LLM concepts, token limits, and prompt-completion dynamics',
      'Crafting effective system prompts, few-shot examples, and structured JSON outputs',
      'Integrating the Gemini API into Python applications for text and multimodal tasks',
      'Building interactive AI demonstration interfaces using Streamlit',
      'Handling API request lifecycles, error states, and response parsing',
    ],
  },
  {
    id: 'agentic-ai-advanced',
    order: 5,
    title: 'Stage 05 — Agentic AI & FDE',
    timePeriod: '2025–2026',
    milestone: 'Agentic AI, FDE & AI Workers',
    icon: 'sparkles',
    description:
      'Advancing into autonomous AI agents, workflow automation, Digital FTE concepts, Forward Deployed Engineering (FDE), and evaluation harness engineering.',
    expandedDetails:
      'My focus evolved from single-prompt LLM interactions toward agentic AI systems that can reason, plan, and execute actions iteratively. I explore the Digital FTE / AI Workers concept to model agents that handle multi-step operational tasks. I am learning Forward Deployed Engineering (FDE) principles and Agent Factory concepts to adapt agents to real problems, alongside loop engineering, evaluation harnesses, spec-driven development, and the 4Ds cognitive framework (Deconstruct, Delegate, Develop, Direct).',
    technologies: [
      'AI Agents',
      'Agentic AI concepts',
      'AI Workers / Digital FTE concepts',
      'Forward Deployed Engineering (FDE)',
      'Agent Factory concepts',
      'Loop & Harness Engineering',
      'Spec-Driven Development',
      'AI Fluency / 4Ds',
    ],
    keyLearnings: [
      'Understanding autonomous agent planning, tool execution, and iterative reasoning loops',
      'Exploring the Digital FTE / AI Worker model for end-to-end task automation',
      'Studying Forward Deployed Engineering (FDE) practices to ground AI in practical workflows',
      'Applying Agent Factory concepts to design, test, and refine specialized agents',
      'Learning loop & harness engineering for evaluation checking, safety guardrails, and testing',
      'Using Spec-Driven Development to maintain deterministic requirements and structured schemas',
      'Applying the 4Ds framework (Deconstruct, Delegate, Develop, Direct) to analyze AI workflows',
    ],
  },
];
