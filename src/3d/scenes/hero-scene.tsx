'use client';

/**
 * Three.js Hero Scene & Virtual AI Universe Canvas
 * Task: T017 [US1]
 * Aligned with Constitution P1 (Accessibility) & P2 (60fps performance)
 */

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { AmbientEffects } from '../effects/ambient-effects';
import { AppErrorBoundary } from '@/components/common/error-boundary';

interface HeroSceneProps {
  reducedMotion?: boolean;
}

export function HeroScene({ reducedMotion = false }: HeroSceneProps) {
  return (
    <div className="absolute inset-0 z-0 h-full w-full overflow-hidden" aria-hidden="true">
      <AppErrorBoundary
        fallbackTitle="3D Canvas Suspended"
        fallbackMessage="WebGL context unavailable. Rendering static cyber ambient backdrop."
        fallback={
          <div className="dark-futuristic-grid flex h-full w-full items-center justify-center bg-[#0b0f2b]">
            <div className="h-64 w-64 rounded-full bg-[#00f0ff]/10 blur-3xl" />
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 0.4, 5.5], fov: 45 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          className="h-full w-full"
        >
          {/* Synthwave Ambient & Point Lighting */}
          <ambientLight intensity={0.5} color="#0b0f2b" />
          <directionalLight position={[4, 5, 4]} intensity={1.4} color="#ffb86b" />
          <pointLight position={[-3, 2, -2]} intensity={2.8} color="#ff5ca8" distance={16} />
          <pointLight position={[3, -1, 1]} intensity={2.2} color="#00f0ff" distance={14} />
          <pointLight position={[0, 3, -1]} intensity={1.8} color="#bc6cff" distance={12} />

          <Suspense fallback={null}>
            <AmbientEffects reducedMotion={reducedMotion} />
          </Suspense>
        </Canvas>
      </AppErrorBoundary>
    </div>
  );
}
