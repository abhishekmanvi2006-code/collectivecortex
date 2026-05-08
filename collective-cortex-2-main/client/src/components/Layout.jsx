import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, User, BrainCircuit } from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();

  // Hide navigation on login page
  if (location.pathname === '/login') {
    return <div className="min-h-screen bg-gray-50">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm p-4 sticky top-0 z-50">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-primary flex items-center gap-2">
            <BrainCircuit className="text-primary w-6 h-6" />
            <span className="hidden sm:inline">Collective Cortex</span>
            <span className="sm:hidden">Cortex</span>
          </Link>
          <Link to="/profile">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              U
            </div>
          </Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-md w-full mx-auto p-4 mb-20 overflow-y-auto">
        {children}
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 z-50">
        <div className="max-w-md mx-auto flex justify-around p-3">
          <Link to="/" className={`flex flex-col items-center p-2 rounded-xl transition ${location.pathname === '/' ? 'text-primary bg-blue-50' : 'text-gray-500'}`}>
            <Home className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Home</span>
          </Link>
          <Link to="/tracking" className={`flex flex-col items-center p-2 rounded-xl transition ${location.pathname === '/tracking' ? 'text-primary bg-blue-50' : 'text-gray-500'}`}>
            <FileText className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Apps</span>
          </Link>
          <Link to="/profile" className={`flex flex-col items-center p-2 rounded-xl transition ${location.pathname === '/profile' ? 'text-primary bg-blue-50' : 'text-gray-500'}`}>
            <User className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Layout;
