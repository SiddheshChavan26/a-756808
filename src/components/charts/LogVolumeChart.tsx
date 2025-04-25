
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = Array.from({ length: 24 }, (_, i) => ({
  time: `${i.toString().padStart(2, '0')}:00`,
  errors: Math.floor(Math.random() * 30),
  warnings: Math.floor(Math.random() * 50),
  info: Math.floor(Math.random() * 100)
}));

export const LogVolumeChart = () => {
  return (
    <div className="bg-white rounded-lg border p-4">
      <h3 className="text-base font-medium mb-4">Log Volume Trends</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="info" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="warnings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="errors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="time" stroke="#6B7280" fontSize={12} />
            <YAxis stroke="#6B7280" fontSize={12} />
            <Tooltip />
            <Area type="monotone" dataKey="info" stroke="#3B82F6" fillOpacity={1} fill="url(#info)" />
            <Area type="monotone" dataKey="warnings" stroke="#F59E0B" fillOpacity={1} fill="url(#warnings)" />
            <Area type="monotone" dataKey="errors" stroke="#EF4444" fillOpacity={1} fill="url(#errors)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
