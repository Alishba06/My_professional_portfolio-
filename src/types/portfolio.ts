/**
 * Core Data Models and Entities for the Immersive AI Portfolio
 * Source of Truth: specs/001-immersive-ai-portfolio/data-model.md
 * Task: T007 (Phase 2 Foundational - Base Architecture)
 */

// ============================================================================
// Visitor Entity
// ============================================================================

export type DeviceType = 'mobile' | 'tablet' | 'desktop';
export type MotionPreference = 'reduce' | 'no-preference';
export type ConnectionSpeed = 'slow' | 'fast' | 'unknown';
export type AudienceType = 'recruiter' | 'client' | 'reviewer' | 'general';

export interface Visitor {
  deviceType: DeviceType;
  motionPreference: MotionPreference;
  connectionSpeed: ConnectionSpeed;
  audienceType?: AudienceType;
}

// ============================================================================
// Skill Entity
// ============================================================================

export type SkillLevel = 'core' | 'supporting';

export interface Skill {
  category: string;
  name: string;
  level?: SkillLevel;
  description?: string;
  proficiency?: number;
  featured?: boolean;
}

// ============================================================================
// Learning Journey Stage Entity
// ============================================================================

export interface LearningJourneyStage {
  id: string;
  order: number;
  title: string;
  description: string;
  timePeriod?: string;
  icon?: string;
  keyLearnings?: string[];
  technologies?: string[];
  milestone?: string;
  expandedDetails?: string;
}

// ============================================================================
// Project Entity (Problem -> Solution -> Outcome framing)
// ============================================================================

export type ProjectVisualType = 'image' | 'video' | 'embed';

export interface ProjectVisual {
  type: ProjectVisualType;
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  tagline?: string;
  problem?: string;
  solution?: string;
  outcome?: string;
  image?: ProjectImage;
  visuals?: ProjectVisual[];
  technologies?: string[];
  tags?: string[];
  liveUrl?: string;
  sourceUrl?: string;
  order?: number;
  featured?: boolean;
}

// ============================================================================
// Contact Option Entity
// ============================================================================

export type ContactOptionId =
  'contact-me' | 'lets-work-together' | 'lets-solve-problem' | 'github' | 'linkedin' | 'resume';

export type ContactTarget = 'form' | 'email' | 'externalUrl' | 'file';

export interface ContactOption {
  id: ContactOptionId;
  label: string;
  target: ContactTarget;
  url?: string;
  intent: string;
  icon?: string;
  order: number;
}

// ============================================================================
// Alishba Profile Entity
// ============================================================================

export interface Profile {
  name: string;
  role: string;
  positioningStatement: string;
  tagline?: string;
  bio: string;
  skills: Skill[];
  learningJourney: LearningJourneyStage[];
  projects: Project[];
  contactOptions: ContactOption[];
  resumeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  email: string;
}

// ============================================================================
// Cinematic Scene Entity
// ============================================================================

export type CinematicSceneType =
  'character-walk' | 'environment-pan' | 'text-reveal' | 'transition' | 'particles' | 'lighting';

export interface CinematicScene {
  id: string;
  order: number;
  type: CinematicSceneType;
  duration: number;
  characterState?: string;
  environment?: string;
  text?: string;
  audioCue?: string;
  reducedMotionFallback?: string;
}

// ============================================================================
// Visual Theme & Design Tokens
// ============================================================================

export interface ColorTokens {
  bgPrimary: string;
  bgSecondary: string;
  bgTertiary: string;
  bgElevated: string;
  fgPrimary: string;
  fgSecondary: string;
  fgTertiary: string;
  accentPrimary: string;
  accentSecondary: string;
  accentGlow: string;
  border: string;
  error: string;
  success: string;
}

export interface TypographyTokens {
  fontHeading: string;
  fontBody: string;
  fontMono: string;
  textHero: string;
  textH1: string;
  textH2: string;
  textBody: string;
  textSmall: string;
}

export interface MotionTokens {
  easeCinematic: string;
  easeOut: string;
  easeInOut: string;
  durationFast: string;
  durationNormal: string;
  durationSlow: string;
  durationHero: string;
}

export interface EffectTokens {
  glowSm: string;
  glowMd: string;
  glowLg: string;
  gradientFuturistic: string;
  gradientDark: string;
  shadowCard: string;
  backdropBlur: string;
}

export interface VisualTheme {
  palette: ColorTokens;
  typography: TypographyTokens;
  effects: EffectTokens;
  motion: MotionTokens;
}

// ============================================================================
// Runtime Validation Helpers / Type Guards
// ============================================================================

export const VALID_CONTACT_OPTION_IDS: readonly ContactOptionId[] = [
  'contact-me',
  'lets-work-together',
  'lets-solve-problem',
  'github',
  'linkedin',
  'resume',
] as const;

export function isContactOptionId(id: string): id is ContactOptionId {
  return (VALID_CONTACT_OPTION_IDS as readonly string[]).includes(id);
}

export function isValidProject(data: unknown): data is Project {
  if (typeof data !== 'object' || data === null) return false;
  const p = data as Record<string, unknown>;
  return (
    typeof p.id === 'string' &&
    typeof p.title === 'string' &&
    typeof p.problem === 'string' &&
    typeof p.solution === 'string'
  );
}

export function isValidLearningJourneyStage(data: unknown): data is LearningJourneyStage {
  if (typeof data !== 'object' || data === null) return false;
  const s = data as Record<string, unknown>;
  return (
    typeof s.id === 'string' &&
    typeof s.order === 'number' &&
    typeof s.title === 'string' &&
    typeof s.description === 'string'
  );
}
