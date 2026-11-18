import Link from 'next/link';

/**
 * 404 Not Found Page
 * Part of Base Architecture (T008)
 */

export default function NotFound() {
  return (
    <div className="dark-futuristic-grid flex min-h-screen flex-col items-center justify-center p-6 text-center text-white">
      <div className="relative z-10 max-w-lg rounded-2xl border border-cyan-500/20 bg-gray-950/80 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3 py-1 font-mono text-xs text-cyan-400">
          <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
          COORDINATES UNREACHABLE
        </div>

        <div className="mb-2 bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-500 bg-clip-text font-mono text-6xl font-black tracking-tighter text-transparent">
          404
        </div>

        <h1 className="mb-3 text-xl font-bold tracking-tight text-white sm:text-2xl">
          Sector Not Found in Digital Universe
        </h1>

        <p className="mb-8 text-sm text-gray-400">
          The requested trajectory does not map to any known sector in Alishba&apos;s AI agent
          matrix. Return to the nexus to recalibrate navigation.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl border border-cyan-500/50 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 px-6 py-3 font-mono text-sm font-semibold text-cyan-300 transition-all duration-200 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          Return to Nexus
        </Link>
      </div>
    </div>
  );
}
