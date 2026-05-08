import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ShieldCheck, User, Brain, Sparkles } from 'lucide-react';
import SchemesPage from './pages/SchemesPage';
import FundTrackerPage from './pages/FundTrackerPage';
import ProfilePage from './pages/ProfilePage';

const NAV = [
  { id: 'schemes', label: 'Schemes', icon: BookOpen },
  { id: 'fund', label: 'Fund Tracker', icon: ShieldCheck },
  { id: 'profile', label: 'Profile', icon: User },
];

export default function App() {
  const [tab, setTab] = useState('schemes');
  const [darkMode, setDarkMode] = useState(false);

  const bg = darkMode ? 'bg-slate-900' : 'bg-slate-50';
  const navBg = darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200';
  const headerBg = darkMode ? 'bg-slate-900/95 border-slate-700' : 'bg-white/95 border-slate-200';
  const text = darkMode ? 'text-white' : 'text-slate-900';
  const sub = darkMode ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-300`}>
      {/* Top Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 border-b ${headerBg} backdrop-blur-sm`}>
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-teal-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Brain size={18} className="text-white" />
          </div>
          <div className="flex-1">
            <h1 className={`font-bold text-base leading-none ${text}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
              Collective Cortex
            </h1>
            <p className={`text-xs mt-0.5 ${sub}`}>AI-Powered Governance & Transparency</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-100">
              <Sparkles size={11} className="text-emerald-600" />
              <span className="text-xs font-semibold text-emerald-700">AI Live</span>
            </div>
          </div>
        </div>

        {/* Active Tab Indicator */}
        <div className={`max-w-2xl mx-auto px-4 pb-2`}>
          <div className="flex gap-1">
            {NAV.map(n => (
              <button
                key={n.id}
                onClick={() => setTab(n.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${tab === n.id ? 'bg-indigo-600 text-white' : darkMode ? 'text-slate-400' : 'text-slate-400'}`}
              >
                <n.icon size={13} />
                {n.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 pt-28 pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {tab === 'schemes' && <SchemesPage darkMode={darkMode} />}
            {tab === 'fund' && <FundTrackerPage darkMode={darkMode} />}
            {tab === 'profile' && <ProfilePage darkMode={darkMode} setDarkMode={setDarkMode} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className={`fixed bottom-0 left-0 right-0 z-50 border-t ${navBg} backdrop-blur-sm`}>
        <div className="max-w-2xl mx-auto px-4 py-2 flex items-center justify-around">
          {NAV.map(n => {
            const active = tab === n.id;
            return (
              <button
                key={n.id}
                onClick={() => setTab(n.id)}
                className={`flex flex-col items-center gap-1 px-5 py-2 rounded-2xl transition-all ${active ? 'bg-indigo-50' : ''}`}
              >
                <motion.div
                  animate={active ? { scale: 1.15 } : { scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <n.icon
                    size={22}
                    className={active ? 'text-indigo-600' : darkMode ? 'text-slate-500' : 'text-slate-400'}
                    strokeWidth={active ? 2.5 : 1.8}
                  />
                </motion.div>
                <span className={`text-xs font-semibold ${active ? 'text-indigo-600' : darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                  {n.label}
                </span>
                {active && (
                  <motion.div
                    layoutId="nav-dot"
                    className="w-1.5 h-1.5 rounded-full bg-indigo-600"
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
