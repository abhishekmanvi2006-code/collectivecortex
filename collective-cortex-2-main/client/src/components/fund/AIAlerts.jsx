import { useState } from 'react';
import { motion } from 'framer-motion';

const ALERTS = [
  { id: 1, severity: 'high', icon: '🚨', title: 'Duplicate Invoice Detected', desc: 'INV-2024-082 submitted twice. Second submission on 28 Mar differs by ₹13,000. Immediate review required.', bill: 'INV-2024-085' },
  { id: 2, severity: 'high', icon: '🚨', title: 'Missing GST Number', desc: 'Bill from "Quick Supply Co" has no GST number. Vendor is not registered with GST authorities.', bill: 'INV-2024-087' },
  { id: 3, severity: 'medium', icon: '⚠️', title: 'Price Anomaly Detected', desc: 'Cement bags billed at ₹1,200 vs market average ₹410. Variance: +192%. Verify with vendor.', bill: 'INV-2024-088' },
  { id: 4, severity: 'medium', icon: '⚠️', title: 'Repeated Vendor Pattern', desc: '"Ramesh Constructions" appears in 8 out of 12 bills for this project. Possible monopoly pattern.', bill: 'INV-2024-082' },
  { id: 5, severity: 'low', icon: '✅', title: 'New Vendor Added', desc: '"National Machinery Co" — first-time vendor. No history to compare. Monitor only.', bill: 'INV-2024-086' },
];

const colors = {
  high: { card: 'border-red-200 bg-red-50', badge: 'bg-red-100 text-red-700', btn: 'text-red-600 hover:bg-red-100' },
  medium: { card: 'border-amber-200 bg-amber-50', badge: 'bg-amber-100 text-amber-700', btn: 'text-amber-600 hover:bg-amber-100' },
  low: { card: 'border-emerald-200 bg-emerald-50', badge: 'bg-emerald-100 text-emerald-700', btn: 'text-emerald-600 hover:bg-emerald-100' },
};

export default function AIAlerts({ darkMode }) {
  const [filter, setFilter] = useState('all');
  const [dismissed, setDismissed] = useState([]);

  const filtered = ALERTS.filter(a => (filter === 'all' || a.severity === filter) && !dismissed.includes(a.id));
  const counts = { high: ALERTS.filter(a => a.severity === 'high').length, medium: ALERTS.filter(a => a.severity === 'medium').length, low: ALERTS.filter(a => a.severity === 'low').length };

  const card = darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200';
  const text = darkMode ? 'text-white' : 'text-slate-900';

  return (
    <div className="space-y-4">
      <div className={`rounded-2xl border p-4 ${card}`}>
        <h3 className={`font-bold text-base mb-1 ${text}`}>🤖 AI Risk Detection Engine</h3>
        <div className="flex gap-3 text-sm">
          <span className="text-red-600 font-semibold">🚨 {counts.high} High</span>
          <span className="text-amber-600 font-semibold">⚠️ {counts.medium} Medium</span>
          <span className="text-emerald-600 font-semibold">✅ {counts.low} Low</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {['all', 'high', 'medium', 'low'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${filter === f ? 'bg-indigo-600 text-white' : darkMode ? 'bg-slate-800 text-slate-400' : 'bg-white border border-slate-200 text-slate-600'}`}
          >{f === 'all' ? 'All Alerts' : f}</button>
        ))}
      </div>

      {/* Alert Cards */}
      {filtered.map((alert, i) => {
        const c = colors[alert.severity];
        return (
          <motion.div key={alert.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className={`rounded-2xl border p-4 ${darkMode ? 'bg-slate-800 border-slate-700' : c.card}`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{alert.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold uppercase ${c.badge}`}>{alert.severity}</span>
                  <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{alert.bill}</span>
                </div>
                <p className={`font-semibold text-sm mb-1 ${text}`}>{alert.title}</p>
                <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{alert.desc}</p>
                <div className="flex gap-2 mt-3">
                  <button className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${c.btn}`}>Review Bill</button>
                  <button onClick={() => setDismissed(d => [...d, alert.id])}
                    className={`text-xs font-medium px-3 py-1.5 rounded-lg ${darkMode ? 'text-slate-400 hover:bg-slate-700' : 'text-slate-500 hover:bg-slate-100'} transition-colors`}
                  >Dismiss</button>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-4xl mb-2">✅</p>
          <p className={`font-semibold ${text}`}>No alerts in this category</p>
        </div>
      )}
    </div>
  );
}
