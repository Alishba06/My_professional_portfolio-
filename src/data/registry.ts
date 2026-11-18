/**
 * Modular Content Registry & Extensibility Engine
 * Tasks: T079, T087 [US7]
 * Provides type-safe dynamic registration, query methods, and rollback snapshots
 * for Projects, Learning Stages, Cinematic Scenes, and Skills.
 */

import type { Project, LearningJourneyStage, CinematicScene, Skill } from '@/types/portfolio';
import { projects as defaultProjects } from './projects';
import { learningJourneyStages as defaultLearningStages } from './learning-journey';
import { cinematicScenes as defaultCinematicScenes } from './cinematic-scenes';
import { skills as defaultSkills } from './profile';
import { logger } from '@/utils/logger';

export class ContentRegistry {
  private projects: Project[] = [...defaultProjects];
  private learningStages: LearningJourneyStage[] = [...defaultLearningStages];
  private cinematicScenes: CinematicScene[] = [...defaultCinematicScenes];
  private skills: Skill[] = [...defaultSkills];

  // Snapshots for safe rollback (Task: T087)
  private snapshot = {
    projects: [...defaultProjects],
    learningStages: [...defaultLearningStages],
    cinematicScenes: [...defaultCinematicScenes],
    skills: [...defaultSkills],
  };

  /**
   * Save current state as rollback snapshot
   */
  public saveSnapshot(): void {
    this.snapshot = {
      projects: [...this.projects],
      learningStages: [...this.learningStages],
      cinematicScenes: [...this.cinematicScenes],
      skills: [...this.skills],
    };
  }

  /**
   * Rollback current state to the last verified snapshot (Task: T087)
   */
  public rollback(): void {
    this.projects = [...this.snapshot.projects];
    this.learningStages = [...this.snapshot.learningStages];
    this.cinematicScenes = [...this.snapshot.cinematicScenes];
    this.skills = [...this.snapshot.skills];
    logger.warn('Content registry rolled back to previous stable snapshot');
  }

  /**
   * Reset all data back to factory built-ins
   */
  public resetToDefaults(): void {
    this.projects = [...defaultProjects];
    this.learningStages = [...defaultLearningStages];
    this.cinematicScenes = [...defaultCinematicScenes];
    this.skills = [...defaultSkills];
    this.saveSnapshot();
  }

  // --- Projects ---
  public getProjects(): Project[] {
    return [...this.projects].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  }

  public addProject(project: Project): boolean {
    if (!project.id || !project.title || !project.problem || !project.solution) {
      logger.error(
        'Cannot register project: missing required fields (id, title, problem, solution)'
      );
      return false;
    }

    if (this.projects.some((p) => p.id === project.id)) {
      logger.error(`Cannot register project: duplicate ID "${project.id}"`);
      return false;
    }

    this.saveSnapshot();
    this.projects.push(project);
    logger.info(`Successfully registered project: "${project.title}" [${project.id}]`);
    return true;
  }

  // --- Learning Journey Stages ---
  public getLearningStages(): LearningJourneyStage[] {
    return [...this.learningStages].sort((a, b) => a.order - b.order);
  }

  public addLearningStage(stage: LearningJourneyStage): boolean {
    if (!stage.id || !stage.title || !stage.description || typeof stage.order !== 'number') {
      logger.error(
        'Cannot register learning stage: missing required fields (id, title, description, order)'
      );
      return false;
    }

    if (this.learningStages.some((s) => s.id === stage.id)) {
      logger.error(`Cannot register learning stage: duplicate ID "${stage.id}"`);
      return false;
    }

    this.saveSnapshot();
    this.learningStages.push(stage);
    logger.info(`Successfully registered learning stage: "${stage.title}" [${stage.id}]`);
    return true;
  }

  // --- Cinematic Scenes ---
  public getCinematicScenes(): CinematicScene[] {
    return [...this.cinematicScenes].sort((a, b) => a.order - b.order);
  }

  public addCinematicScene(scene: CinematicScene): boolean {
    if (
      !scene.id ||
      !scene.type ||
      typeof scene.duration !== 'number' ||
      typeof scene.order !== 'number'
    ) {
      logger.error(
        'Cannot register cinematic scene: missing required fields (id, type, duration, order)'
      );
      return false;
    }

    if (this.cinematicScenes.some((s) => s.id === scene.id)) {
      logger.error(`Cannot register cinematic scene: duplicate ID "${scene.id}"`);
      return false;
    }

    this.saveSnapshot();
    this.cinematicScenes.push(scene);
    logger.info(`Successfully registered cinematic scene: "${scene.id}" at step ${scene.order}`);
    return true;
  }

  // --- Skills ---
  public getSkills(): Skill[] {
    return [...this.skills];
  }

  public addSkill(skill: Skill): boolean {
    if (!skill.name || !skill.category) {
      logger.error('Cannot register skill: missing name or category');
      return false;
    }

    this.saveSnapshot();
    this.skills.push(skill);
    logger.info(`Successfully registered skill: "${skill.name}" in category "${skill.category}"`);
    return true;
  }
}

// Global Singleton Registry
export const contentRegistry = new ContentRegistry();
