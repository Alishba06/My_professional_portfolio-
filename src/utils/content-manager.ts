/**
 * Content Management & Runtime Schema Validation
 * Task: T081 [US7]
 * Provides validation rules, schema integrity checks, and error diagnostics for modular content additions.
 */

import type { Project, LearningJourneyStage, CinematicScene, Skill } from '@/types/portfolio';

export interface ValidationResult<T> {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  sanitizedData?: T;
}

export const ContentManager = {
  /**
   * Validate project content structure per FR-004 (Problem -> Solution -> Outcome)
   */
  validateProject(data: unknown): ValidationResult<Project> {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!data || typeof data !== 'object') {
      return { isValid: false, errors: ['Project data must be a non-null object'], warnings: [] };
    }

    const p = data as Partial<Project>;

    if (!p.id || typeof p.id !== 'string' || !/^[a-z0-9-]+$/.test(p.id)) {
      errors.push(
        'Project "id" must be a valid lowercase hyphenated slug (e.g. "my-agent-project").'
      );
    }

    if (!p.title || typeof p.title !== 'string' || p.title.trim().length === 0) {
      errors.push('Project "title" is required and cannot be empty.');
    }

    if (!p.problem || typeof p.problem !== 'string' || p.problem.trim().length === 0) {
      errors.push(
        'Project "problem" statement is mandatory (Problem -> Solution -> Outcome framing).'
      );
    }

    if (!p.solution || typeof p.solution !== 'string' || p.solution.trim().length === 0) {
      errors.push(
        'Project "solution" description is mandatory (Problem -> Solution -> Outcome framing).'
      );
    }

    if (!p.outcome) {
      warnings.push(
        'Project "outcome" is missing; recommended to showcase business or engineering impact.'
      );
    }

    if (p.liveUrl && !/^https?:\/\//.test(p.liveUrl)) {
      errors.push('Project "liveUrl" must be a valid HTTP/HTTPS URL.');
    }

    if (p.sourceUrl && !/^https?:\/\//.test(p.sourceUrl)) {
      errors.push('Project "sourceUrl" must be a valid HTTP/HTTPS URL.');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      sanitizedData: errors.length === 0 ? (p as Project) : undefined,
    };
  },

  /**
   * Validate cinematic hero scene structure per FR-013
   */
  validateCinematicScene(data: unknown): ValidationResult<CinematicScene> {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!data || typeof data !== 'object') {
      return {
        isValid: false,
        errors: ['Cinematic scene must be a non-null object'],
        warnings: [],
      };
    }

    const s = data as Partial<CinematicScene>;

    if (!s.id || typeof s.id !== 'string') {
      errors.push('Scene "id" is required.');
    }

    if (typeof s.order !== 'number' || s.order < 1) {
      errors.push('Scene "order" must be a positive integer.');
    }

    const validTypes: CinematicScene['type'][] = [
      'character-walk',
      'environment-pan',
      'text-reveal',
      'transition',
      'particles',
      'lighting',
    ];

    if (!s.type || !validTypes.includes(s.type)) {
      errors.push(`Scene "type" must be one of: ${validTypes.join(', ')}.`);
    }

    if (typeof s.duration !== 'number' || s.duration <= 0) {
      errors.push('Scene "duration" must be a positive number of milliseconds.');
    }

    if (!s.reducedMotionFallback) {
      warnings.push(
        'Scene missing "reducedMotionFallback"; necessary for vestibular safety standards.'
      );
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      sanitizedData: errors.length === 0 ? (s as CinematicScene) : undefined,
    };
  },

  /**
   * Validate learning journey stage
   */
  validateLearningStage(data: unknown): ValidationResult<LearningJourneyStage> {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!data || typeof data !== 'object') {
      return { isValid: false, errors: ['Learning stage must be a non-null object'], warnings: [] };
    }

    const stage = data as Partial<LearningJourneyStage>;

    if (!stage.id || typeof stage.id !== 'string') {
      errors.push('Stage "id" is required.');
    }

    if (!stage.title || typeof stage.title !== 'string') {
      errors.push('Stage "title" is required.');
    }

    if (!stage.description || typeof stage.description !== 'string') {
      errors.push('Stage "description" is required.');
    }

    if (typeof stage.order !== 'number') {
      errors.push('Stage "order" must be a number.');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      sanitizedData: errors.length === 0 ? (stage as LearningJourneyStage) : undefined,
    };
  },

  /**
   * Validate skill item
   */
  validateSkill(data: unknown): ValidationResult<Skill> {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!data || typeof data !== 'object') {
      return { isValid: false, errors: ['Skill must be a non-null object'], warnings: [] };
    }

    const skill = data as Partial<Skill>;

    if (!skill.name || typeof skill.name !== 'string') {
      errors.push('Skill "name" is required.');
    }

    if (!skill.category || typeof skill.category !== 'string') {
      errors.push('Skill "category" is required.');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      sanitizedData: errors.length === 0 ? (skill as Skill) : undefined,
    };
  },
};
