import { NextResponse } from 'next/server';

/**
 * Health Check API Endpoint
 * Part of Base Architecture (T006)
 */

export async function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      service: 'alishba-immersive-portfolio',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV ?? 'development',
    },
    { status: 200 }
  );
}
