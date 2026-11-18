/**
 * Cinematic Scene Timeline Data for Virtual World Hero Entrance
 * Source of Truth: specs/001-immersive-ai-portfolio/data-model.md
 * Task: T014 [US1]
 */

import type { CinematicScene } from '@/types/portfolio';

export const cinematicScenes: CinematicScene[] = [
  {
    id: 'scene-1-environment',
    order: 1,
    type: 'particles',
    duration: 1500,
    environment: 'Deep cosmic cyber void with cyan and violet quantum particle coalescence',
    text: 'INITIALIZING NEURAL FABRIC...',
    audioCue: '/audio/ambient-hum.mp3',
    reducedMotionFallback: 'Static cyber grid with subtle cyan ambient glow',
  },
  {
    id: 'scene-2-character-walk',
    order: 2,
    type: 'character-walk',
    duration: 2500,
    characterState: 'Alishba digital avatar walking forward with steady cybernetic posture',
    environment: 'Futuristic digital gateway illuminating infinite horizon',
    text: 'AGENT ENTITY DETECTED: ALISHBA',
    audioCue: '/audio/footstep-chime.mp3',
    reducedMotionFallback: 'Centered digital character silhouette in static hero stance',
  },
  {
    id: 'scene-3-identity-reveal',
    order: 3,
    type: 'text-reveal',
    duration: 2000,
    characterState: 'Character reaches focal point, turning slightly toward observer',
    environment: 'Holographic data strands orbiting the central coordinates',
    text: 'ALISHBA | AI AGENT DEVELOPER',
    audioCue: '/audio/synth-sweep.mp3',
    reducedMotionFallback: 'Immediate crisp typography reveal with high-contrast text',
  },
  {
    id: 'scene-4-transition',
    order: 4,
    type: 'transition',
    duration: 2000,
    characterState: 'Character seamlessly transitions into ambient idle breathing loop',
    environment: 'Camera glides to interactive hero perspective, unlocking navigation',
    text: 'I BUILD AI-POWERED INTELLIGENT SOLUTIONS TO SOLVE REAL INDUSTRY PROBLEMS',
    reducedMotionFallback: 'Seamless transition to interactive hero state',
  },
];
