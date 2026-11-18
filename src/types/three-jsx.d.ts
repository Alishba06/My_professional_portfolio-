import type { ThreeElements } from '@react-three/fiber';

/**
 * React 19 JSX Intrinsic Elements Augmentation for React Three Fiber (R3F)
 * Bridges ThreeElements to React.JSX.IntrinsicElements in React 19
 */

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements extends ThreeElements {}
    }
  }
}
