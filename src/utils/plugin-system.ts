/**
 * Pluggable Extension Architecture
 * Task: T083 [US7]
 * Allows registering independent modules, custom section renderers, and lifecycle event hooks.
 */

import type { Project, CinematicScene } from '@/types/portfolio';
import { logger } from '@/utils/logger';

export interface PluginHooks {
  onInit?: () => void;
  onThemeChange?: (theme: string) => void;
  onProjectClick?: (project: Project) => void;
  onSceneAdvance?: (scene: CinematicScene) => void;
  onContactInitiated?: (intent: string) => void;
}

export interface PortfolioPlugin {
  id: string;
  name: string;
  version: string;
  description?: string;
  enabled?: boolean;
  hooks?: PluginHooks;
}

export class PluginManager {
  private plugins: Map<string, PortfolioPlugin> = new Map();

  /**
   * Register a plugin into the portfolio runtime
   */
  public register(plugin: PortfolioPlugin): boolean {
    if (!plugin.id || !plugin.name) {
      logger.error('Plugin registration failed: missing id or name');
      return false;
    }

    if (this.plugins.has(plugin.id)) {
      logger.warn(`Plugin "${plugin.id}" is already registered. Overwriting.`);
    }

    this.plugins.set(plugin.id, { ...plugin, enabled: plugin.enabled ?? true });
    logger.info(`Plugin registered: "${plugin.name}" v${plugin.version} [${plugin.id}]`);

    if (plugin.enabled !== false && plugin.hooks?.onInit) {
      try {
        plugin.hooks.onInit();
      } catch (err) {
        logger.error(`Error during plugin initialization for "${plugin.id}":`, err);
      }
    }

    return true;
  }

  /**
   * Unregister an existing plugin
   */
  public unregister(pluginId: string): boolean {
    return this.plugins.delete(pluginId);
  }

  /**
   * Return all registered and active plugins
   */
  public getActivePlugins(): PortfolioPlugin[] {
    return Array.from(this.plugins.values()).filter((p) => p.enabled !== false);
  }

  /**
   * Trigger a lifecycle hook safely across all registered plugins
   */
  public triggerHook<K extends keyof PluginHooks>(
    hookName: K,
    ...args: Parameters<NonNullable<PluginHooks[K]>>
  ): void {
    const activePlugins = this.getActivePlugins();

    for (const plugin of activePlugins) {
      const hookFn = plugin.hooks?.[hookName];
      if (typeof hookFn === 'function') {
        try {
          // @ts-expect-error Safe rest parameter forwarding for plugin hooks
          hookFn(...args);
        } catch (error) {
          logger.error(`Plugin [${plugin.id}] failed during hook "${String(hookName)}":`, error);
        }
      }
    }
  }
}

// Global plugin manager singleton
export const pluginManager = new PluginManager();
