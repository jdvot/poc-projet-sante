import { NextResponse } from 'next/server';

// Configuration pour l'export statique
export const dynamic = 'force-static';
export const revalidate = false;

export async function GET() {
  try {
    // Basic health check - compatible avec export statique
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
      static: true, // Indique que c'est une version statique
    };

    return NextResponse.json(healthData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
