import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle, FileText, User, Home, GraduationCap, Sun } from 'lucide-react';
import SchemeGuide from './SchemeGuide';

const ICON_MAP = { Home, GraduationCap, Sun, FileText };

export default function SchemeDetail({ scheme, onBack, darkMode }) {
  const [tab, setTab] = useState('eligibility');
  const [showGuide, setShowGuide] = useState(false);

  const Icon = ICON_MAP[scheme.icon] || FileText;
  const card = darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900';
  const sub = darkMode ? 'text-slate-400' : 'text-slate-500';
  const bg = darkMode ? 'bg-slate-900' : 'bg-slate-50';

  const accentColors = {
    indigo: { bg: 'bg-indigo-600', light: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', iconBg: 'bg-indigo-100', iconText: 'text-indigo-600' },
    teal: { bg: 'bg-teal-600', light: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200', iconBg: 'bg-teal-100', iconText: 'text-teal-600' },
    amber: { bg: 'bg-amber-500', light: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', iconBg: 'bg-amber-100', iconText: 'text-amber-600' },
    purple: { bg: 'bg-purple-600', light: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', iconBg: 'bg-purple-100', iconText: 'text-purple-600' },
  };
  const ac = accentColors[scheme.accent] || accentColors.indigo;

  if (showGuide) {
    return <SchemeGuide scheme={scheme} onBack={() => setShowGuide(false)} darkMode={darkMode} />;
  }

  return (
    <div className={`min-h-screen ${bg}`}>
      {/* Header */}
      <div className={`sticky top-0 z-20 ${darkMode ? 'bg-slate-900/95' : 'bg-white/95'} backdrop-blur-sm border-b ${darkMode ? 'border-slate-700' : 'border-slate-200'} px-4 py-3`}>
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button onClick={onBack} className={`p-2 rounded-xl hover:${darkMode ? 'bg-slate-800' : 'bg-slate-100'} transition-colors`}>
            <ArrowLeft size={20} className={darkMode ? 'text-white' : 'text-slate-900'} />
          </button>
          <div className={`w-9 h-9 rounded-xl ${ac.iconBg} flex items-center justify-center`}>
            <Icon size={18} className={ac.iconText} />
          </div>
          <div>
            <h1 className={`font-bold text-base ${darkMode ? 'text-white' : 'text-slate-900'}`}>{scheme.name}</h1>
            <p className={`text-xs ${sub}`}>{scheme.tag}</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Scheme Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl p-5 mb-6 bg-gradient-to-br from-${scheme.accent === 'indigo' ? 'indigo' : scheme.accent === 'teal' ? 'teal' : scheme.accent === 'amber' ? 'amber' : 'purple'}-600 to-${scheme.accent === 'indigo' ? 'indigo' : scheme.accent === 'teal' ? 'teal' : scheme.accent === 'amber' ? 'orange' : 'violet'}-700 text-white`}
          style={{ background: scheme.accent === 'indigo' ? 'linear-gradient(135deg, #3730a3, #4f46e5)' : scheme.accent === 'teal' ? 'linear-gradient(135deg, #0d9488, #0891b2)' : scheme.accent === 'amber' ? 'linear-gradient(135deg, #d97706, #ea580c)' : 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Icon size={24} className="text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg leading-snug">{scheme.name}</h2>
              <p className="text-white/80 text-sm mt-1">{scheme.subtitle}</p>
              <span className="inline-block mt-2 px-3 py-0.5 rounded-full bg-white/20 text-white text-xs font-medium">{scheme.tag}</span>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className={`flex rounded-xl overflow-hidden border mb-5 ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
          {['eligibility', 'documents'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 text-sm font-semibold capitalize transition-all ${
                tab === t
                  ? `${ac.bg} text-white`
                  : darkMode ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-white text-slate-500 hover:text-slate-900'
              }`}
            >
              {t === 'eligibility' ? '✅ Eligibility Criteria' : '📎 Required Documents'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {tab === 'eligibility'
              ? scheme.eligibility.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`flex gap-3 items-start p-4 rounded-xl border ${card}`}
                  >
                    <CheckCircle size={18} className={`${ac.iconText} shrink-0 mt-0.5`} />
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{item}</p>
                  </motion.div>
                ))
              : scheme.documents.map((doc, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`flex gap-3 items-center p-4 rounded-xl border ${card}`}
                  >
                    <div className={`w-8 h-8 rounded-lg ${ac.iconBg} flex items-center justify-center shrink-0`}>
                      <span className={`text-xs font-bold ${ac.iconText}`}>{i + 1}</span>
                    </div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{doc}</p>
                  </motion.div>
                ))
            }
          </motion.div>
        </AnimatePresence>

        {/* Proceed Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowGuide(true)}
          className={`w-full mt-8 py-4 rounded-2xl ${ac.bg} text-white font-bold text-base shadow-lg shadow-indigo-500/20 hover:opacity-90 transition-opacity flex items-center justify-center gap-2`}
        >
          Proceed to Step-by-Step Guide →
        </motion.button>
      </div>
    </div>
  );
}
