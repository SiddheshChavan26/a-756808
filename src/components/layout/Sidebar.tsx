
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, FileText, AlertTriangle, ArrowRight, Settings, Database } from 'lucide-react';

interface NavItem {
  icon: typeof BarChart3;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: BarChart3, label: 'Dashboard', path: '/' },
  { icon: FileText, label: 'Log Explorer', path: '/logs' },
  { icon: AlertTriangle, label: 'Error Analysis', path: '/analysis' },
  { icon: ArrowRight, label: 'Resolutions', path: '/resolutions' },
];

const configItems: NavItem[] = [
  { icon: Database, label: 'Sources', path: '/sources' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar = () => {
  const location = useLocation();

  const NavLink = ({ item }: { item: NavItem }) => {
    const isActive = location.pathname === item.path;
    return (
      <Link 
        to={item.path}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
          ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
      >
        <item.icon className="h-5 w-5" />
        <span>{item.label}</span>
      </Link>
    );
  };

  return (
    <div className="w-60 border-r bg-white h-screen p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-blue-600 mb-1">LogAnalytics</h1>
      </div>

      <nav className="space-y-1 mb-8">
        {navItems.map((item) => (
          <NavLink key={item.path} item={item} />
        ))}
      </nav>

      <div className="mt-4 mb-4">
        <h2 className="text-xs font-semibold text-gray-400 mb-2 px-3">CONFIGURATION</h2>
        <div className="space-y-1">
          {configItems.map((item) => (
            <NavLink key={item.path} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
