import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, MapPin } from 'lucide-react';

const STAGES_DONE = [
  { stage: 'Foundation', date: '5 Mar 2024', gps: '13.0827° N, 77.5877° E', status: 'verified' },
  { stage: 'Pillars', date: '20 Mar 2024', gps: '13.0831° N, 77.5880° E', status: 'verified' },
  { stage: 'Deck Slab', date: '10 Apr 2024', gps: '13.0829° N, 77.5878° E', status: 'pending' },
];

const MAP_PINS = [
  { name: 'NH-48 Bridge', loc: 'Tumkur', lat: '13.33° N', lng: '77.10° E', color: 'bg-indigo-500' },
  { name: 'School Building', loc: 'Bidar', lat: '17.91° N', lng: '77.52° E', color: 'bg-teal-500' },
  { name: 'Health Centre', loc: 'Koppal', lat: '15.35° N', lng: '76.15° E', color: 'bg-amber-500' },
];

export default function ProgressVerification({ darkMode }) {
  const [stage, setStage] = useState('Foundation');
  const [notes, setNotes] = useState('');
  const [uploaded, setUploaded] = useState(false);
  const inputRef = useRef();

  const card = darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200';
  const text = darkMode ? 'text-white' : 'text-slate-900';
  const sub = darkMode ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className="space-y-4">
      {/* Upload Section */}
      <div className={`rounded-2xl border p-4 ${card}`}>
        <h3 className={`font-semibold text-sm mb-3 ${text}`}>📸 Upload Geo-Tagged Work Photo</h3>
        <div
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer mb-3 transition-all ${darkMode ? 'border-slate-600 hover:border-indigo-500' : 'border-slate-300 hover:border-indigo-400'}`}
        >
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={() => setUploaded(true)} />
          <Upload size={24} className={`mx-auto mb-2 ${sub}`} />
          <p className={`text-sm font-medium ${text}`}>{uploaded ? '✅ Photo uploaded!' : 'Click to upload geo-tagged photo'}</p>
          <p className={`text-xs mt-1 ${sub}`}>GPS metadata will be auto-extracted</p>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className={`text-xs font-medium ${sub} block mb-1`}>Construction Stage</label>
            <select value={stage} onChange={e => setStage(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border text-sm outline-none ${darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
            >
              {['Foundation', 'Pillars', 'Deck Slab', 'Finishing'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className={`text-xs font-medium ${sub} block mb-1`}>Date</label>
            <input type="date" className={`w-full px-3 py-2 rounded-xl border text-sm outline-none ${darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`} />
          </div>
        </div>
        <textarea
          value={notes} onChange={e => setNotes(e.target.value)}
          placeholder="Add notes about this stage..."
          rows={2}
          className={`w-full px-3 py-2 rounded-xl border text-sm outline-none resize-none mb-3 ${darkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'}`}
        />
        <button
          onClick={() => setUploaded(true)}
          className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition-colors"
        >
          Upload Photo & Verify Stage
        </button>
      </div>

      {/* Map Placeholder */}
      <div className={`rounded-2xl border p-4 ${card}`}>
        <h3 className={`font-semibold text-sm mb-3 ${text}`}>🗺️ Project Site Locations — Karnataka</h3>
        <div className={`rounded-xl h-36 flex items-center justify-center mb-3 ${darkMode ? 'bg-slate-700' : 'bg-slate-100'} relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(0deg, #94a3b8 0px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #94a3b8 0px, transparent 1px, transparent 40px)' }} />
          <p className={`text-xs font-medium ${sub}`}>Karnataka — Project Locations</p>
          {MAP_PINS.map((pin, i) => (
            <div key={i} className="absolute flex flex-col items-center" style={{ left: `${25 + i * 28}%`, top: `${30 + (i % 2) * 25}%` }}>
              <div className={`w-3 h-3 rounded-full ${pin.color} shadow-md`} />
              <p className="text-xs font-bold text-slate-700 mt-0.5">{pin.loc}</p>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {MAP_PINS.map((pin, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${pin.color}`} />
              <span className={`text-xs font-medium ${text}`}>{pin.name}</span>
              <span className={`text-xs ${sub} ml-auto`}>{pin.lat}, {pin.lng}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stage Timeline with Photos */}
      <div className={`rounded-2xl border p-4 ${card}`}>
        <h3 className={`font-semibold text-sm mb-3 ${text}`}>📅 Stage Photo Timeline</h3>
        <div className="space-y-3">
          {STAGES_DONE.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              className={`flex gap-3 items-center p-3 rounded-xl ${darkMode ? 'bg-slate-700' : 'bg-slate-50'}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${darkMode ? 'bg-slate-600' : 'bg-slate-200'}`}>
                🏗️
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${text}`}>{s.stage}</p>
                <p className={`text-xs ${sub}`}>{s.date}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin size={10} className="text-indigo-500" />
                  <span className="text-xs text-indigo-500">{s.gps}</span>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium shrink-0 ${s.status === 'verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {s.status === 'verified' ? '✅ GPS Verified' : '⏳ Pending'}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
