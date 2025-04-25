
import { StatCard as StatCardType } from '@/lib/types';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatCardProps {
  data: StatCardType;
}

export const StatCard = ({ data }: StatCardProps) => {
  const statusColors = {
    critical: 'bg-red-100 text-red-800',
    moderate: 'bg-yellow-100 text-yellow-800',
    normal: 'bg-blue-100 text-blue-800',
    good: 'bg-green-100 text-green-800'
  };

  const trendColor = data.trendDirection === 'up' ? 'text-red-600' : 'text-green-600';

  return (
    <div className="bg-white rounded-lg border p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-600">{data.title}</span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[data.status]}`}>
          {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
        </span>
      </div>
      <div className="flex items-baseline gap-3">
        <span className="text-2xl font-semibold">{data.count.toLocaleString()}</span>
        <span className={`flex items-center text-sm ${trendColor}`}>
          {data.trendDirection === 'up' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
          {data.trend}%
        </span>
      </div>
      <div className="text-sm text-gray-500 mt-1">
        {data.newCount} new in last hour
      </div>
    </div>
  );
};
