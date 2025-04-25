
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/logs" element={<div>Log Explorer</div>} />
            <Route path="/analysis" element={<div>Error Analysis</div>} />
            <Route path="/resolutions" element={<div>Resolutions</div>} />
            <Route path="/sources" element={<div>Sources</div>} />
            <Route path="/settings" element={<div>Settings</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
