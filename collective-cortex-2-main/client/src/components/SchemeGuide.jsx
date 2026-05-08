import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle, Circle, ChevronDown, ChevronUp, Sparkles, ExternalLink, Play, Lightbulb, AlertTriangle } from 'lucide-react';
import Chatbot from './Chatbot';

export default function SchemeGuide({ scheme, onBack, darkMode }) {
  const [completed, setCompleted] = useState([]);
  const [expanded, setExpanded] = useState(0);
  const [askAIStep, setAskAIStep] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const card = darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200';
  const text = darkMode ? 'text-white' : 'text-slate-900';
  const sub = darkMode ? 'text-slate-400' : 'text-slate-500';
  const bg = darkMode ? 'bg-slate-900' : 'bg-slate-50';

  const markDone = (idx) => {
    if (completed.includes(idx)) return;
    const next = [...completed, idx];
    setCompleted(next);

    // Confetti
    if (window.confetti) {
      window.confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 }, colors: ['#3730a3', '#0d9488', '#f59e0b'] });
    }

    // Auto-expand next
    if (idx + 1 < scheme.steps.length) {
      setTimeout(() => setExpanded(idx + 1), 600);
    }

    // Check all done
    if (next.length === scheme.steps.length) {
      setTimeout(() => setShowCelebration(true), 800);
    }
  };

  const accentColors = {
    indigo: { bg: 'bg-indigo-600', light: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', ring: 'ring-indigo-500' },
    teal: { bg: 'bg-teal-600', light: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200', ring: 'ring-teal-500' },
    amber: { bg: 'bg-amber-500', light: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', ring: 'ring-amber-500' },
    purple: { bg: 'bg-purple-600', light: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', ring: 'ring-purple-500' },
  };
  const ac = accentColors[scheme.accent] || accentColors.indigo;

  return (
    <div className={`min-h-screen ${bg}`}>
      {/* Celebration Overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.7, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-sm w-full mx-4 text-center shadow-2xl"
            >
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">All Steps Completed!</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">
                You've completed all steps for <strong>{scheme.name}</strong>. Keep your acknowledgement number safe!
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-left">
                <div className="flex gap-2 items-start">
                  <Lightbulb size={16} className="text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-amber-800 text-xs leading-relaxed">
                    Track your application status on the official website. Save your reference number and check back every 2 weeks.
                  </p>
                </div>
              </div>
              {scheme.websites[0]?.url !== '#' && (
                <a
                  href={scheme.websites[0].url}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl ${ac.bg} text-white font-semibold text-sm mb-3 hover:opacity-90 transition-opacity`}
                >
                  <ExternalLink size={16} />
                  Track on Official Website
                </a>
              )}
              <button
                onClick={() => setShowCelebration(false)}
                className="w-full py-3 rounded-xl border border-slate-200 text-slate-600 font-medium text-sm hover:bg-slate-50 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className={`sticky top-0 z-30 ${darkMode ? 'bg-slate-900/95' : 'bg-white/95'} backdrop-blur-sm border-b ${darkMode ? 'border-slate-700' : 'border-slate-200'} px-4 py-3`}>
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <button onClick={onBack} className={`p-2 rounded-xl hover:${darkMode ? 'bg-slate-800' : 'bg-slate-100'} transition-colors`}>
            <ArrowLeft size={20} className={text} />
          </button>
          <div>
            <h1 className={`font-bold text-base ${text}`}>{scheme.name}</h1>
            <p className={`text-xs ${sub}`}>Step-by-Step Application Guide</p>
          </div>
          <div className="ml-auto">
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${ac.light} ${ac.text}`}>
              {completed.length}/{scheme.steps.length} Done
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Official Websites */}
        <div className={`rounded-2xl border p-4 ${card}`}>
          <h3 className={`font-semibold text-sm mb-3 ${text}`}>🌐 Official Website</h3>
          <div className="flex flex-wrap gap-2">
            {scheme.websites.map((site, i) => (
              <a
                key={i}
                href={site.url}
                target={site.url !== '#' ? '_blank' : '_self'}
                rel="noreferrer"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl ${ac.bg} text-white text-sm font-medium hover:opacity-90 transition-opacity`}
              >
                <ExternalLink size={14} />
                {site.label}
              </a>
            ))}
          </div>
        </div>

        {/* Videos */}
        {scheme.videos.length > 0 && (
          <div className={`rounded-2xl border p-4 ${card}`}>
            <h3 className={`font-semibold text-sm mb-3 ${text}`}>🎬 Watch Guidance Videos</h3>
            <div className="flex flex-wrap gap-2">
              {scheme.videos.map((v, i) => (
                <a
                  key={i}
                  href={v.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium hover:bg-red-100 transition-colors"
                >
                  <Play size={15} />
                  {v.flag} {v.lang}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className={`rounded-2xl border p-4 ${card}`}>
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm font-semibold ${text}`}>Progress</span>
            <span className={`text-sm font-bold ${ac.text}`}>{Math.round((completed.length / scheme.steps.length) * 100)}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${ac.bg} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${(completed.length / scheme.steps.length) * 100}%` }}
              transition={{ type: 'spring', stiffness: 100 }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {scheme.steps.map((step, idx) => {
            const done = completed.includes(idx);
            const isOpen = expanded === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`rounded-2xl border overflow-hidden transition-all ${
                  done ? `${ac.border} ring-1 ${ac.ring}` : card
                } ${darkMode ? 'border-slate-700' : ''}`}
              >
                {/* Step Header */}
                <button
                  onClick={() => setExpanded(isOpen ? -1 : idx)}
                  className={`w-full flex items-center gap-3 p-4 text-left hover:${darkMode ? 'bg-slate-700/50' : 'bg-slate-50'} transition-colors`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    done ? ac.bg : darkMode ? 'bg-slate-700 text-slate-400' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {done
                      ? <CheckCircle size={18} className="text-white" />
                      : <span className={`text-xs font-bold ${darkMode ? 'text-slate-300' : 'text-slate-500'}`}>{idx + 1}</span>
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-sm ${text} ${done ? 'line-through opacity-60' : ''}`}>{step.title}</p>
                  </div>
                  {isOpen ? <ChevronUp size={16} className={sub} /> : <ChevronDown size={16} className={sub} />}
                </button>

                {/* Step Body */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className={`px-4 pb-4 space-y-4 border-t ${darkMode ? 'border-slate-700' : 'border-slate-100'}`}>
                        <div className="pt-4 grid md:grid-cols-2 gap-4">
                          {/* Online Process */}
                          <div className="rounded-xl bg-indigo-50 border border-indigo-100 p-3">
                            <p className="text-xs font-bold text-indigo-700 mb-2 uppercase tracking-wide">🌐 Online Process</p>
                            <p className="text-indigo-900 text-sm leading-relaxed">{step.online}</p>
                          </div>
                          {/* Offline Process */}
                          <div className="rounded-xl bg-teal-50 border border-teal-100 p-3">
                            <p className="text-xs font-bold text-teal-700 mb-2 uppercase tracking-wide">🏢 Offline Process</p>
                            <p className="text-teal-900 text-sm leading-relaxed">{step.offline}</p>
                          </div>
                        </div>

                        {/* Documents */}
                        <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
                          <p className={`text-xs font-bold mb-2 uppercase tracking-wide ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>📎 Documents Needed</p>
                          <div className="flex flex-wrap gap-2">
                            {step.documents.map((doc, di) => (
                              <span key={di} className="text-xs px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700">{doc}</span>
                            ))}
                          </div>
                        </div>

                        {/* Tip & Mistake */}
                        <div className="grid md:grid-cols-2 gap-3">
                          <div className="flex gap-2 bg-amber-50 border border-amber-100 rounded-xl p-3">
                            <Lightbulb size={15} className="text-amber-600 shrink-0 mt-0.5" />
                            <p className="text-amber-800 text-xs leading-relaxed"><strong>Tip:</strong> {step.tip}</p>
                          </div>
                          <div className="flex gap-2 bg-red-50 border border-red-100 rounded-xl p-3">
                            <AlertTriangle size={15} className="text-red-500 shrink-0 mt-0.5" />
                            <p className="text-red-800 text-xs leading-relaxed"><strong>Avoid:</strong> {step.mistake}</p>
                          </div>
                        </div>

                        {/* Ask AI + Mark Done */}
                        <div className="flex flex-wrap gap-2 pt-1">
                          <button
                            onClick={() => setAskAIStep(askAIStep === idx ? null : idx)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-600 text-white text-sm font-medium hover:opacity-90 transition-opacity"
                          >
                            <Sparkles size={14} />
                            Ask AI about this step
                          </button>
                          {!done && (
                            <button
                              onClick={() => markDone(idx)}
                              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors"
                            >
                              <CheckCircle size={14} />
                              Mark as Done ✓
                            </button>
                          )}
                          {done && (
                            <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm font-medium">
                              <CheckCircle size={14} />
                              Completed!
                            </span>
                          )}
                        </div>

                        {/* Inline AI Chat */}
                        <AnimatePresence>
                          {askAIStep === idx && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 320 }}
                              exit={{ opacity: 0, height: 0 }}
                              className="rounded-2xl overflow-hidden border border-indigo-200"
                            >
                              <Chatbot
                                inline
                                darkMode={darkMode}
                                systemPrompt={`You are helping a citizen understand Step ${idx + 1}: "${step.title}" of the ${scheme.name} application process. Answer clearly in simple English.`}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Tip Card */}
        <div className="rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-4">
          <div className="flex gap-3 items-start">
            <Lightbulb size={20} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-900 text-sm mb-1">💡 Important Tip</p>
              <p className="text-amber-800 text-sm leading-relaxed">
                Save your acknowledgement/reference number at each step. You will need it to track your application and follow up with officials.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
