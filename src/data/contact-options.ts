/**
 * Six Purposeful Contact Entry Points
 * Source of Truth: specs/001-immersive-ai-portfolio/data-model.md & FR-005
 * Task: T013 [US1/US5]
 */

import type { ContactOption } from '@/types/portfolio';

export const contactOptions: ContactOption[] = [
  {
    id: 'contact-me',
    label: 'Contact Me',
    target: 'form',
    intent: 'General inquiry and communication',
    icon: 'mail',
    order: 1,
  },
  {
    id: 'lets-work-together',
    label: "Let's Work Together",
    target: 'form',
    intent: 'Hiring, contract development, and technical collaboration',
    icon: 'briefcase',
    order: 2,
  },
  {
    id: 'lets-solve-problem',
    label: "Let's Solve a Problem",
    target: 'form',
    intent: 'AI agent project consultation and architecture design',
    icon: 'sparkles',
    order: 3,
  },
  {
    id: 'github',
    label: 'GitHub',
    target: 'externalUrl',
    url: 'https://github.com/Alishba06',
    intent: 'Inspect open-source agent code, repositories, and technical contributions',
    icon: 'github',
    order: 4,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    target: 'externalUrl',
    url: 'https://linkedin.com/in/alishba-javed-4961b12bb/',
    intent: 'Connect professionally and review industry network credentials',
    icon: 'linkedin',
    order: 5,
  },
  {
    id: 'resume',
    label: 'Resume',
    target: 'file',
    url: '/resume.pdf',
    intent: 'Download comprehensive developer CV and technical qualifications',
    icon: 'file-text',
    order: 6,
  },
];
