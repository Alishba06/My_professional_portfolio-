'use client';

/**
 * Ambient Cyber Effects: Quantum Particle Clouds and Neon Grid Lines
 * Tasks: T019 [US1], T077 [US6]
 * Dynamically synchronized with Visual Theme tokens and Theme Switcher.
 */

import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { visualTheme } from '@/data/theme';

interface AmbientEffectsProps {
  reducedMotion?: boolean;
}

type ActiveThemeName = 'cyber' | 'deep-space' | 'matrix';

const THEME_PALETTES: Record<
  ActiveThemeName,
  {
    primary: string;
    secondary: string;
    tertiary: string;
    fog: string;
    gridPrimary: string;
    gridSecondary: string;
  }
> = {
  cyber: {
    primary: '#00f0ff',
    secondary: '#ff5ca8',
    tertiary: '#bc6cff',
    fog: '#0b0f2b',
    gridPrimary: '#00f0ff',
    gridSecondary: '#ff5ca8',
  },
  'deep-space': {
    primary: '#38bdf8',
    secondary: '#6366f1',
    tertiary: '#93c5fd',
    fog: '#010308',
    gridPrimary: '#38bdf8',
    gridSecondary: '#111827',
  },
  matrix: {
    primary: '#00ffc4',
    secondary: '#10b981',
    tertiary: '#34d399',
    fog: '#020b06',
    gridPrimary: '#00ffc4',
    gridSecondary: '#064e3b',
  },
};

export function AmbientEffects({ reducedMotion = false }: AmbientEffectsProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const gridRef = useRef<THREE.GridHelper>(null);
  const [activeTheme, setActiveTheme] = useState<ActiveThemeName>('cyber');

  // Synchronize with live theme events (Task: T077)
  useEffect(() => {
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ theme: ActiveThemeName }>;
      if (customEvent.detail?.theme && THEME_PALETTES[customEvent.detail.theme]) {
        setActiveTheme(customEvent.detail.theme);
      }
    };

    const savedTheme = (localStorage.getItem('alishba_theme') as ActiveThemeName) || 'cyber';
    if (THEME_PALETTES[savedTheme]) {
      setActiveTheme(savedTheme);
    }

    window.addEventListener('alishba:theme-change', handleThemeChange);
    return () => window.removeEventListener('alishba:theme-change', handleThemeChange);
  }, []);

  const palette = THEME_PALETTES[activeTheme];

  // Generate deterministic quantum particles with theme-adaptive colors
  const [positions, colors] = useMemo(() => {
    const count = 1200;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const primaryCol = new THREE.Color(palette.primary);
    const secondaryCol = new THREE.Color(palette.secondary);
    const tertiaryCol = new THREE.Color(palette.tertiary);

    for (let i = 0; i < count; i++) {
      // Cylindrical distribution around the center path
      const radius = 3 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const x = Math.cos(theta) * radius;
      const z = (Math.random() - 0.5) * 60;
      const y = (Math.random() - 0.2) * 20;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      // Color interpolation across the theme palette
      const mixedColor =
        Math.random() > 0.6 ? secondaryCol : Math.random() > 0.3 ? primaryCol : tertiaryCol;
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }

    return [pos, col];
  }, [palette]);

  useFrame((_, delta) => {
    if (reducedMotion) return;

    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x += delta * 0.01;
    }

    if (gridRef.current) {
      gridRef.current.position.z = (gridRef.current.position.z + delta * 2) % 4;
    }
  });

  return (
    <group>
      {/* Quantum Starfield / Dust */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          vertexColors
          transparent
          opacity={0.75}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Infinite Horizon Cyber Grid */}
      <gridHelper
        key={activeTheme}
        ref={gridRef}
        args={[80, 80, palette.gridPrimary, palette.gridSecondary]}
        position={[0, -2, 0]}
      />

      {/* Atmospheric Fog */}
      <fog attach="fog" args={[palette.fog, 10, 45]} />
    </group>
  );
}
