/**
 * Cinematic Scene Timeline Management System
 * Task: T082 [US7]
 * Provides dynamic timeline interpolation, scene rebalancing, and sequence execution.
 */

import type { CinematicScene } from '@/types/portfolio';
import { cinematicScenes as defaultScenes } from '@/data/cinematic-scenes';

export interface SceneTimelineMarker {
  scene: CinematicScene;
  startTime: number;
  endTime: number;
  startProgress: number;
  endProgress: number;
}

export class CinematicSceneManager {
  private scenes: CinematicScene[];

  constructor(initialScenes: CinematicScene[] = defaultScenes) {
    this.scenes = [...initialScenes].sort((a, b) => a.order - b.order);
  }

  /**
   * Returns current list of scenes sorted by sequence order
   */
  public getScenes(): CinematicScene[] {
    return [...this.scenes];
  }

  /**
   * Total entrance duration in milliseconds
   */
  public getTotalDuration(): number {
    return this.scenes.reduce((acc, scene) => acc + scene.duration, 0);
  }

  /**
   * Computes normalized timeline markers for every scene
   */
  public getTimelineMarkers(): SceneTimelineMarker[] {
    const totalDuration = this.getTotalDuration();
    let cumulativeTime = 0;

    return this.scenes.map((scene) => {
      const startTime = cumulativeTime;
      const endTime = cumulativeTime + scene.duration;
      const startProgress = totalDuration > 0 ? startTime / totalDuration : 0;
      const endProgress = totalDuration > 0 ? endTime / totalDuration : 1;

      cumulativeTime = endTime;

      return {
        scene,
        startTime,
        endTime,
        startProgress,
        endProgress,
      };
    });
  }

  /**
   * Resolves the active scene at a given timestamp in milliseconds
   */
  public getSceneAtTime(timestampMs: number): CinematicScene | undefined {
    const markers = this.getTimelineMarkers();
    const activeMarker = markers.find((m) => timestampMs >= m.startTime && timestampMs < m.endTime);
    return activeMarker?.scene ?? markers[markers.length - 1]?.scene;
  }

  /**
   * Resolves active scene at a given progress percentage (0 to 1)
   */
  public getSceneAtProgress(progress: number): CinematicScene | undefined {
    const clampedProgress = Math.max(0, Math.min(1, progress));
    const markers = this.getTimelineMarkers();
    const activeMarker = markers.find(
      (m) => clampedProgress >= m.startProgress && clampedProgress <= m.endProgress
    );
    return activeMarker?.scene ?? markers[markers.length - 1]?.scene;
  }

  /**
   * Inserts or appends a new scene and automatically recalculates sequence orders
   */
  public addScene(scene: CinematicScene): void {
    this.scenes.push(scene);
    this.scenes.sort((a, b) => a.order - b.order);
  }

  /**
   * Removes a scene by ID
   */
  public removeScene(sceneId: string): boolean {
    const initialLen = this.scenes.length;
    this.scenes = this.scenes.filter((s) => s.id !== sceneId);
    return this.scenes.length < initialLen;
  }
}

// Global scene manager instance
export const sceneManager = new CinematicSceneManager();
