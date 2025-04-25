
import { useState } from 'react';
import { StatCard } from '@/components/stats/StatCard';
import { LogVolumeChart } from '@/components/charts/LogVolumeChart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const stats = [
  { 
    title: 'Errors',
    count: 244,
    trend: 23,
    trendDirection: 'up' as const,
    status: 'critical' as const,
    newCount: 0
  },
  {
    title: 'Warnings',
    count: 362,
    trend: 5,
    trendDirection: 'down' as const,
    status: 'moderate' as const,
    newCount: 0
  },
  {
    title: 'Info',
    count: 1002,
    trend: 12,
    trendDirection: 'down' as const,
    status: 'normal' as const,
    newCount: 0
  },
  {
    title: 'Resolved',
    count: 67,
    trend: 18,
    trendDirection: 'down' as const,
    status: 'good' as const,
    newCount: 0
  }
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <Input type="search" placeholder="Search logs..." className="w-64" />
          <Select>
            <option value="24h">Last 24 hours</option>
            <option value="12h">Last 12 hours</option>
            <option value="1h">Last hour</option>
          </Select>
          <Button variant="outline">Refresh</Button>
          <Button variant="outline">Filter</Button>
          <Button variant="outline">Export</Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} data={stat} />
        ))}
      </div>

      <LogVolumeChart />

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-medium">Recent Error Analysis</h3>
            <Button variant="link">View All</Button>
          </div>
          {/* Error analysis content */}
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-medium">Recommended Resolutions</h3>
            <Button variant="link">View All</Button>
          </div>
          {/* Resolutions content */}
        </div>
      </div>
    </div>
  );
}
