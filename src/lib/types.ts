
export interface LogData {
  id: number;
  message: string;
  level: 'error' | 'warning' | 'info';
  service: string;
  timestamp: string;
  occurrences: number;
  confidence?: 'HIGH' | 'MEDIUM' | 'LOW';
  detail?: string;
}

export interface StatCard {
  title: string;
  count: number;
  trend: number;
  trendDirection: 'up' | 'down';
  status: 'critical' | 'moderate' | 'normal' | 'good';
  newCount: number;
}
