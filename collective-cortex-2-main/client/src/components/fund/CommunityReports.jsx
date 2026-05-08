import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';

const REPORTS = [
  { text: 'Road not repaired despite allocation', loc: 'Gulbarga', time: '2 days ago', status: 'Pending', color: 'bg-amber-100 text-amber-700' },
  { text: 'Cement quality is substandard at bridge site', loc: 'Bridge Site, Tumkur', time: '5 days ago', status: 'Under Review', color: 'bg-indigo-100 text-indigo-700' },
  { text: 'Work completed with good quality!', loc: 'Solar lights, Yadgir', time: '1 week ago', status: 'Verified ✅', color: 'bg-emerald-100 text-emerald-700' },
];

export default function CommunityReports({ darkMode }) {
  const [form, setForm] = useState({ project: 'NH-48 Bridge Construction', type: 'Work not started', desc: '' });
  const [submitted, setSubmitted] = useState(false);

  const card = darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200';
  const text = darkMode ? 'text-white' : 'text-slate-900';
  const sub = darkMode ? 'text-slate-400' : 'text-slate-500';
  const inp = darkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400';

  return (
    <div className="space-y-5">
      <div className={`rounded-2xl border p-4 ${card}`}>
        <h3 className={`font-bold text-base mb-4 ${text}`}>👥 Submit Citizen Report</h3>
        <div className="space-y-3">
          <div>
            <label className={`text-xs font-medium ${sub} block mb-1`}>Project</label>
            <select value={form.project} onChange={e => setForm(p => ({ ...p, project: e.target.value }))}
              className={`w-full px-3 py-2 rounded-xl border text-sm outline-none ${inp}`}
            >
              {['NH-48 Bridge Construction', 'Village Road Repair', 'Primary School Building', 'Water Supply Pipeline', 'Community Health Centre', 'Solar Streetlights'].map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className={`text-xs font-medium ${sub} block mb-1`}>Issue Type</label>
            <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
              className={`w-full px-3 py-2 rounded-xl border text-sm outline-none ${inp}`}
            >
              {['Work not started', 'Poor quality', 'Fund misuse suspected', 'Other'].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className={`text-xs font-medium ${sub} block mb-1`}>Description</label>
            <textarea
              value={form.desc} onChange={e => setForm(p => ({ ...p, desc: e.target.value }))}
              placeholder="Describe the issue in detail..."
              rows={3}
              className={`w-full px-3 py-2 rounded-xl border text-sm outline-none resize-none ${inp}`}
            />
          </div>
          <div className={`border-2 border-dashed rounded-xl p-3 text-center cursor-pointer ${darkMode ? 'border-slate-600' : 'border-slate-300'}`}>
            <Upload size={18} className={`mx-auto mb-1 ${sub}`} />
            <p className={`text-xs ${sub}`}>Upload photo evidence (optional)</p>
          </div>
          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
              <p className="text-emerald-700 font-semibold text-sm">✅ Report submitted successfully!</p>
              <p className="text-emerald-600 text-xs mt-1">Our team will review within 48 hours.</p>
            </div>
          ) : (
            <button
              onClick={() => setSubmitted(true)}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors"
            >
              Submit Report
            </button>
          )}
        </div>
      </div>

      {/* Previous Reports */}
      <div className={`rounded-2xl border p-4 ${card}`}>
        <h3 className={`font-semibold text-sm mb-3 ${text}`}>📋 Recent Community Reports</h3>
        <div className="space-y-3">
          {REPORTS.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className={`p-3 rounded-xl ${darkMode ? 'bg-slate-700' : 'bg-slate-50'}`}
            >
              <div className="flex justify-between items-start gap-2">
                <p className={`text-sm font-medium leading-snug ${text}`}>{r.text}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${r.color}`}>{r.status}</span>
              </div>
              <p className={`text-xs mt-1 ${sub}`}>📍 {r.loc} · {r.time}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
