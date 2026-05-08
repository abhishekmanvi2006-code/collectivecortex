import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Loader2, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';

const SAMPLE_BILLS = [
  {
    id: 'INV-2024-082', label: 'Bill 1 — Valid', status: 'valid',
    vendor: 'Ramesh Constructions Pvt Ltd', gst: '29ABCDE1234F1Z5',
    items: 'Cement 500 bags @ ₹410 = ₹2,05,000', amount: '₹2,05,000', date: '10 Mar 2024',
    analysis: { level: 'low', msg: '✅ All checks passed. Amount within market range. No duplicates found.' },
  },
  {
    id: 'INV-2024-083', label: 'Bill 2 — Valid', status: 'valid',
    vendor: 'Kumar Steel Works', gst: '29XYZST5678G2Z1',
    items: 'TMT Steel 5 tons @ ₹58,000/ton = ₹2,90,000', amount: '₹2,90,000', date: '15 Mar 2024',
    analysis: { level: 'low', msg: '✅ Verified. Steel pricing within acceptable range.' },
  },
  {
    id: 'INV-2024-082', label: 'Bill 3 — Duplicate', status: 'suspicious',
    vendor: 'Ramesh Constructions Pvt Ltd', gst: '29ABCDE1234F1Z5',
    items: 'Cement 500 bags @ ₹436 = ₹2,18,000', amount: '₹2,18,000', date: '14 Mar 2024',
    analysis: { level: 'high', msg: '🚨 Duplicate invoice number detected! INV-2024-082 was already submitted on 10 Mar 2024 with a different amount.' },
  },
  {
    id: 'INV-2024-FAKE', label: 'Bill 4 — Price Anomaly', status: 'suspicious',
    vendor: 'Quick Supply Co', gst: 'N/A',
    items: 'Cement 100 bags @ ₹1,200 = ₹1,20,000', amount: '₹1,20,000', date: '20 Mar 2024',
    analysis: { level: 'high', msg: '🚨 Price anomaly: Cement at ₹1,200/bag vs market avg ₹410. +192% variance. Also: No GST number found — vendor may be unregistered.' },
  },
];

const PREV_BILLS = [
  { id: 'INV-2024-082', vendor: 'Ramesh Constructions Pvt Ltd', amount: '₹3.8L', cat: 'Cement', risk: 'low' },
  { id: 'INV-2024-083', vendor: 'Kumar Steel Works', amount: '₹2.9L', cat: 'Steel', risk: 'low' },
  { id: 'INV-2024-084', vendor: 'XYZ Labor Contractors', amount: '₹1.2L', cat: 'Labor', risk: 'medium' },
  { id: 'INV-2024-085', vendor: 'Ramesh Constructions Pvt Ltd', amount: '₹4.1L', cat: 'Cement', risk: 'high' },
  { id: 'INV-2024-086', vendor: 'National Machinery Co', amount: '₹1.8L', cat: 'Machinery', risk: 'low' },
];

const riskBadge = { low: 'bg-emerald-100 text-emerald-700', medium: 'bg-amber-100 text-amber-700', high: 'bg-red-100 text-red-700' };
const riskIcon = { low: '✅', medium: '⚠️', high: '🚨' };

export default function BillsExpenses({ darkMode }) {
  const [dragging, setDragging] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedBill, setSelectedBill] = useState(null);
  const [form, setForm] = useState({ invoice: '', vendor: '', amount: '', category: 'Cement', date: '', desc: '' });
  const inputRef = useRef();

  const card = darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200';
  const text = darkMode ? 'text-white' : 'text-slate-900';
  const sub = darkMode ? 'text-slate-400' : 'text-slate-500';

  const handleUpload = () => {
    setUploaded(true);
    setAnalyzing(true);
    setResult(null);
    const outcomes = [
      { level: 'low', msg: '✅ Verified — All checks passed. Amount within market range. No duplicates found.' },
      { level: 'medium', msg: '⚠️ Medium Risk — Cement price slightly above average (₹480 vs ₹410). Recommend vendor verification.' },
      { level: 'high', msg: '🚨 High Risk — Duplicate invoice number detected. This invoice ID was uploaded 2 weeks ago with a different amount.' },
    ];
    setTimeout(() => {
      setResult(outcomes[Math.floor(Math.random() * outcomes.length)]);
      setAnalyzing(false);
    }, 2200);
  };

  return (
    <div className="space-y-5">
      {/* Sample Bills Modal */}
      <AnimatePresence>
        {selectedBill && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          >
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-5 max-w-sm w-full shadow-2xl"
            >
              <div className="flex justify-between mb-4">
                <h3 className="font-bold text-slate-900 dark:text-white">{selectedBill.label}</h3>
                <button onClick={() => setSelectedBill(null)}><X size={18} className="text-slate-400" /></button>
              </div>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between"><span className="text-slate-500">Invoice No</span><span className="font-semibold text-slate-900 dark:text-white">{selectedBill.id}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Vendor</span><span className="font-semibold text-slate-900 dark:text-white text-right max-w-[180px]">{selectedBill.vendor}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">GST No</span><span className="font-semibold text-slate-900 dark:text-white">{selectedBill.gst}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Amount</span><span className="font-bold text-indigo-600">{selectedBill.amount}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Date</span><span className="text-slate-700 dark:text-slate-300">{selectedBill.date}</span></div>
                <div className="pt-1"><span className="text-slate-500">Items: </span><span className="text-slate-700 dark:text-slate-300">{selectedBill.items}</span></div>
              </div>
              <div className={`rounded-xl p-3 text-sm ${selectedBill.analysis.level === 'low' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
                {selectedBill.analysis.msg}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload + Analysis */}
      <div className={`rounded-2xl border p-4 ${card}`}>
        <h3 className={`font-semibold text-sm mb-3 ${text}`}>🧾 Upload Bill / Invoice</h3>

        {/* Drop Zone */}
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={e => { e.preventDefault(); setDragging(false); handleUpload(); }}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all mb-4 ${dragging ? 'border-indigo-400 bg-indigo-50' : darkMode ? 'border-slate-600 hover:border-indigo-500' : 'border-slate-300 hover:border-indigo-400'}`}
        >
          <input ref={inputRef} type="file" accept="image/*,.pdf" className="hidden" onChange={handleUpload} />
          <Upload size={28} className={`mx-auto mb-2 ${dragging ? 'text-indigo-600' : sub}`} />
          <p className={`text-sm font-medium ${text}`}>Drag & drop or click to upload</p>
          <p className={`text-xs mt-1 ${sub}`}>JPG, PNG, PDF — Max 5MB</p>
        </div>

        {/* Form */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          {[
            { key: 'invoice', label: 'Invoice Number', placeholder: 'INV-2024-090' },
            { key: 'vendor', label: 'Vendor Name', placeholder: 'Vendor Pvt Ltd' },
            { key: 'amount', label: 'Amount (₹)', placeholder: '2,50,000' },
            { key: 'date', label: 'Date', placeholder: 'DD MMM YYYY' },
          ].map(f => (
            <div key={f.key}>
              <label className={`text-xs font-medium ${sub} block mb-1`}>{f.label}</label>
              <input
                value={form[f.key]}
                onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                placeholder={f.placeholder}
                className={`w-full px-3 py-2 rounded-xl border text-sm outline-none focus:border-indigo-400 transition-colors ${darkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'}`}
              />
            </div>
          ))}
        </div>
        <div className="mb-3">
          <label className={`text-xs font-medium ${sub} block mb-1`}>Category</label>
          <select
            value={form.category}
            onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
            className={`w-full px-3 py-2 rounded-xl border text-sm outline-none focus:border-indigo-400 ${darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
          >
            {['Cement', 'Steel', 'Labor', 'Machinery', 'Misc'].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <button
          onClick={handleUpload}
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
        >
          <Upload size={16} /> Upload & Analyze Bill
        </button>

        {/* OCR + AI Result */}
        <AnimatePresence>
          {uploaded && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 space-y-3">
              <div className={`rounded-xl border p-3 ${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-200'}`}>
                <p className={`text-xs font-bold uppercase tracking-wide mb-2 ${sub}`}>🔍 OCR Extracted Data</p>
                {[['Invoice No', 'INV-2024-090'], ['Vendor', 'Ramesh Constructions Pvt Ltd'], ['GST No', '29ABCDE1234F1Z5'], ['Amount', '₹4,18,500'], ['Date', '12 Mar 2024'], ['Items', 'Cement 500 bags, Sand 20 tons']].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-xs py-0.5">
                    <span className={sub}>{k}</span>
                    <span className={`font-medium ${text}`}>{v}</span>
                  </div>
                ))}
              </div>
              {analyzing ? (
                <div className="flex items-center gap-2 text-sm text-indigo-600 py-2">
                  <Loader2 size={16} className="animate-spin" />
                  AI is analyzing bill...
                </div>
              ) : result && (
                <div className={`rounded-xl p-3 text-sm font-medium ${result.level === 'low' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : result.level === 'medium' ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                  {result.msg}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sample Bills */}
      <div className={`rounded-2xl border p-4 ${card}`}>
        <h3 className={`font-semibold text-sm mb-3 ${text}`}>📂 Sample Bills (Demo)</h3>
        <div className="grid grid-cols-2 gap-3">
          {SAMPLE_BILLS.map((b, i) => (
            <button
              key={i}
              onClick={() => setSelectedBill(b)}
              className={`rounded-xl border p-3 text-left hover:shadow-md transition-all ${b.status === 'suspicious' ? 'border-red-200 bg-red-50' : darkMode ? 'border-slate-600 bg-slate-700' : 'border-emerald-200 bg-emerald-50'}`}
            >
              <FileText size={18} className={b.status === 'suspicious' ? 'text-red-500' : 'text-emerald-600'} />
              <p className={`text-xs font-semibold mt-1 ${text}`}>{b.label}</p>
              <p className={`text-xs ${sub}`}>{b.id}</p>
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium mt-1 inline-block ${b.status === 'suspicious' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                {b.status === 'suspicious' ? '🚨 Suspicious' : '✅ Valid'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Previous Bills Table */}
      <div className={`rounded-2xl border p-4 ${card}`}>
        <h3 className={`font-semibold text-sm mb-3 ${text}`}>📋 Previous Bills</h3>
        <div className="space-y-2">
          {PREV_BILLS.map((b, i) => (
            <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${darkMode ? 'bg-slate-700' : 'bg-slate-50'}`}>
              <span className="text-sm">{riskIcon[b.risk]}</span>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-semibold truncate ${text}`}>{b.id}</p>
                <p className={`text-xs truncate ${sub}`}>{b.vendor}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-xs font-bold ${text}`}>{b.amount}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${riskBadge[b.risk]}`}>{b.cat}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
