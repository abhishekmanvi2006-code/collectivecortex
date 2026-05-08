import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Home, GraduationCap, Sun, FileText, ArrowRight } from 'lucide-react';
import { SCHEMES } from '../data/schemes';
import SchemeDetail from '../components/SchemeDetail';
import Chatbot from '../components/Chatbot';

const ICON_MAP = { Home, GraduationCap, Sun, FileText };

const accentMap = {
  indigo: { card: 'hover:border-indigo-300', icon: 'bg-indigo-100 text-indigo-600', badge: 'bg-indigo-50 text-indigo-700 border-indigo-200', btn: 'bg-indigo-600 hover:bg-indigo-700', glow: 'shadow-indigo-100' },
  teal: { card: 'hover:border-teal-300', icon: 'bg-teal-100 text-teal-600', badge: 'bg-teal-50 text-teal-700 border-teal-200', btn: 'bg-teal-600 hover:bg-teal-700', glow: 'shadow-teal-100' },
  amber: { card: 'hover:border-amber-300', icon: 'bg-amber-100 text-amber-600', badge: 'bg-amber-50 text-amber-700 border-amber-200', btn: 'bg-amber-500 hover:bg-amber-600', glow: 'shadow-amber-100' },
  purple: { card: 'hover:border-purple-300', icon: 'bg-purple-100 text-purple-600', badge: 'bg-purple-50 text-purple-700 border-purple-200', btn: 'bg-purple-600 hover:bg-purple-700', glow: 'shadow-purple-100' },
};

export default function SchemesPage({ darkMode }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = SCHEMES.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.tag.toLowerCase().includes(query.toLowerCase())
  );

  const card = darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200';
  const text = darkMode ? 'text-white' : 'text-slate-900';
  const sub = darkMode ? 'text-slate-400' : 'text-slate-500';
  const inputBg = darkMode ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400';

  if (selected) {
    return <SchemeDetail scheme={selected} onBack={() => setSelected(null)} darkMode={darkMode} />;
  }

  return (
    <div className="relative">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${text} font-poppins`}>Government Schemes</h1>
        <p className={`text-sm mt-1 ${sub}`}>Find and apply for central & state schemes with AI guidance</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={18} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${sub}`} />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search schemes by name or category..."
          className={`w-full pl-10 pr-4 py-3 rounded-2xl border text-sm outline-none focus:border-indigo-400 transition-colors ${inputBg}`}
        />
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Active Schemes', value: '4', color: 'text-indigo-600' },
          { label: 'Applications Open', value: '4', color: 'text-teal-600' },
          { label: 'AI Guided Steps', value: '20+', color: 'text-amber-600' },
        ].map((stat, i) => (
          <div key={i} className={`rounded-xl p-3 border text-center ${card}`}>
            <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className={`text-xs mt-0.5 ${sub}`}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Scheme Cards */}
      <div className="space-y-4">
        {filtered.map((scheme, i) => {
          const Icon = ICON_MAP[scheme.icon] || FileText;
          const ac = accentMap[scheme.accent] || accentMap.indigo;

          return (
            <motion.div
              key={scheme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ scale: 1.01, y: -2 }}
              className={`rounded-2xl border p-4 cursor-pointer transition-all ${card} ${ac.card} shadow-sm hover:shadow-md`}
              onClick={() => setSelected(scheme)}
            >
              <div className="flex gap-4 items-start">
                <div className={`w-12 h-12 rounded-xl ${ac.icon} flex items-center justify-center shrink-0`}>
                  <Icon size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`font-bold text-base leading-snug ${text}`}>{scheme.name}</h3>
                    <span className={`text-xs px-2.5 py-1 rounded-full border font-medium shrink-0 ${ac.badge}`}>{scheme.tag}</span>
                  </div>
                  <p className={`text-xs mt-1 ${sub}`}>{scheme.subtitle}</p>
                  <p className={`text-sm mt-2 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{scheme.description}</p>

                  <button
                    onClick={e => { e.stopPropagation(); setSelected(scheme); }}
                    className={`mt-3 flex items-center gap-1.5 px-4 py-2 rounded-xl ${ac.btn} text-white text-sm font-semibold transition-colors`}
                  >
                    Know More <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🔍</p>
            <p className={`font-semibold ${text}`}>No schemes found</p>
            <p className={`text-sm mt-1 ${sub}`}>Try different keywords</p>
          </div>
        )}
      </div>

      {/* Floating Chatbot */}
      <Chatbot
        darkMode={darkMode}
        systemPrompt="You are a helpful government scheme assistant for Indian citizens. Answer questions about PMAY, PM Vidya Lakshmi, PM-KUSUM, and Land Ownership Certification schemes clearly and simply in plain English."
      />
    </div>
  );
}
