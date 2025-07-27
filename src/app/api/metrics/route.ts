import { NextResponse } from 'next/server';

// Métriques simples pour Prometheus
let requestCount = 0;
let errorCount = 0;
const startTime = Date.now();

export async function GET() {
  try {
    const uptime = Date.now() - startTime;

    // Format Prometheus
    const metrics = [
      '# HELP limitless_health_requests_total Total number of requests',
      '# TYPE limitless_health_requests_total counter',
      `limitless_health_requests_total ${requestCount}`,
      '',
      '# HELP limitless_health_errors_total Total number of errors',
      '# TYPE limitless_health_errors_total counter',
      `limitless_health_errors_total ${errorCount}`,
      '',
      '# HELP limitless_health_uptime_seconds Application uptime in seconds',
      '# TYPE limitless_health_uptime_seconds gauge',
      `limitless_health_uptime_seconds ${uptime / 1000}`,
      '',
      '# HELP limitless_health_memory_usage_bytes Memory usage in bytes',
      '# TYPE limitless_health_memory_usage_bytes gauge',
      `limitless_health_memory_usage_bytes ${process.memoryUsage().heapUsed}`,
    ].join('\n');

    return new NextResponse(metrics, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; version=0.0.4; charset=utf-8',
      },
    });
  } catch (error) {
    errorCount++;
    return NextResponse.json(
      { error: 'Failed to generate metrics' },
      { status: 500 }
    );
  }
}

// Fonction pour incrémenter le compteur de requêtes
export function incrementRequestCount() {
  requestCount++;
}

// Fonction pour incrémenter le compteur d'erreurs
export function incrementErrorCount() {
  errorCount++;
}
