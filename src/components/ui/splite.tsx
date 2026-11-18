'use client'

import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <span className="loader"></span>
        </div>
      }
    >
      <div className="w-full h-full relative overflow-hidden bg-transparent [&_canvas]:!bg-transparent [&_canvas]:mix-blend-screen">
        <Spline
          scene={scene}
          className={className}
        />
      </div>
    </Suspense>
  )
}
