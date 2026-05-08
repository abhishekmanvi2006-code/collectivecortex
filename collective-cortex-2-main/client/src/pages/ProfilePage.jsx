import { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Save, Sun, Moon, Loader2, Bell, FileText } from 'lucide-react';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_KEY || '';

const DEFAULT_LABELS = {
  fullName: 'Full Name', phone: 'Phone Number', email: 'Email',
  state: 'State', district: 'District', aadhaar: 'Aadhaar Number',
  language: 'Language Preference', theme: 'Theme', myApps: 'My Applications',
  notifications: 'Notifications', edit: 'Edit Profile', save: 'Save Changes',
};

export default function ProfilePage({ darkMode, setDarkMode }) {
  const [editing, setEditing] = useState(false);
  const [lang, setLang] = useState('English');
  const [translating, setTranslating] = useState(false);
  const [labels, setLabels] = useState(DEFAULT_LABELS);
  const [profile, setProfile] = useState({
    fullName: 'Vighnesh Kumar', phone: '+91 98765 43210',
    email: 'vighnesh@example.com', state: 'Karnataka',
    district: 'Bengaluru Urban', aadhaar: 'XXXX-XXXX-1234',
  });

  const card = darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200';
  const text = darkMode ? 'text-white' : 'text-slate-900';
  const sub = darkMode ? 'text-slate-400' : 'text-slate-500';
  const inp = darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-900';

  const initials = profile.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const changeLanguage = async (newLang) => {
    setLang(newLang);
    if (newLang === 'English') { setLabels(DEFAULT_LABELS); return; }
    setTranslating(true);
    try {
      if (!GEMINI_API_KEY) {
        // Fallback dummy translations if no key
        const kannada = { fullName: 'ಪೂರ್ಣ ಹೆಸರು', phone: 'ಫೋನ್ ಸಂಖ್ಯೆ', email: 'ಇಮೇಲ್', state: 'ರಾಜ್ಯ', district: 'ಜಿಲ್ಲೆ', aadhaar: 'ಆಧಾರ್ ಸಂಖ್ಯೆ', language: 'ಭಾಷೆ ಆದ್ಯತೆ', theme: 'ಥೀಮ್', myApps: 'ನನ್ನ ಅರ್ಜಿಗಳು', notifications: 'ಅಧಿಸೂಚನೆಗಳು', edit: 'ಪ್ರೊಫೈಲ್ ಸಂಪಾದಿಸಿ', save: 'ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ' };
        const hindi = { fullName: 'पूरा नाम', phone: 'फ़ोन नंबर', email: 'ईमेल', state: 'राज्य', district: 'जिला', aadhaar: 'आधार संख्या', language: 'भाषा वरीयता', theme: 'थीम', myApps: 'मेरे आवेदन', notifications: 'सूचनाएं', edit: 'प्रोफ़ाइल संपादित करें', save: 'बदलाव सहेजें' };
        setTimeout(() => { setLabels(newLang === 'Kannada' ? kannada : hindi); setTranslating(false); }, 1200);
        return;
      }

      // Gemini Translation Request
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: `Translate these UI labels to ${newLang}. Return ONLY a JSON object with the same keys: ${JSON.stringify(DEFAULT_LABELS)}` }]
            }]
          })
        }
      );

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      // Clean JSON if Gemini adds markdown code blocks
      const cleanedJson = rawText.replace(/```json|```/g, '').trim();
      const translated = JSON.parse(cleanedJson);
      setLabels(translated);
    } catch (err) {
      console.error("Translation Error:", err);
      setLabels(DEFAULT_LABELS);
    } finally {
      setTranslating(false);
    }
  };

  const APPS = [
    { name: 'PM Awas Yojana', id: 'PMAY2024KA00123', status: 'Under Review', color: 'bg-amber-100 text-amber-700' },
    { name: 'PM Vidya Lakshmi', id: 'VL2024KA00456', status: 'Approved ✅', color: 'bg-emerald-100 text-emerald-700' },
  ];
  const NOTIFS = [
    'Your PMAY application is under review. Expected decision in 30 days.',
    'Document verification pending for Vidya Lakshmi — upload income certificate.',
  ];

  return (
    <div className="space-y-5">
      <div className={`rounded-2xl border p-5 ${card}`}>
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-teal-500 flex items-center justify-center text-white text-2xl font-bold shrink-0">
            {initials}
          </div>
          <div>
            <h2 className={`font-bold text-lg ${text}`}>{profile.fullName}</h2>
            <p className={`text-sm ${sub}`}>{profile.email}</p>
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-medium mt-1 inline-block">Citizen</span>
          </div>
          <button
            onClick={() => editing ? setEditing(false) : setEditing(true)}
            className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors"
          >
            {editing ? <><Save size={13} />{labels.save}</> : <><Edit2 size={13} />{labels.edit}</>}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {[
            { key: 'fullName', label: labels.fullName },
            { key: 'phone', label: labels.phone },
            { key: 'email', label: labels.email },
            { key: 'state', label: labels.state },
            { key: 'district', label: labels.district },
            { key: 'aadhaar', label: labels.aadhaar },
          ].map(f => (
            <div key={f.key}>
              <label className={`text-xs font-medium ${sub} block mb-1`}>{f.label}</label>
              {editing && f.key !== 'aadhaar' ? (
                <input
                  value={profile[f.key]}
                  onChange={e => setProfile(p => ({ ...p, [f.key]: e.target.value }))}
                  className={`w-full px-3 py-2 rounded-xl border text-sm outline-none focus:border-indigo-400 transition-colors ${inp}`}
                />
              ) : (
                <p className={`text-sm font-medium ${text} px-3 py-2 rounded-xl ${darkMode ? 'bg-slate-700' : 'bg-slate-50'}`}>{profile[f.key]}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={`rounded-2xl border p-4 ${card}`}>
        <h3 className={`font-semibold text-sm mb-3 ${text}`}>{labels.language}</h3>
        <div className="flex gap-2 mb-4">
          {['Kannada', 'English', 'Hindi'].map(l => (
            <button key={l} onClick={() => changeLanguage(l)}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${lang === l ? 'bg-indigo-600 text-white' : darkMode ? 'bg-slate-700 text-slate-400' : 'bg-slate-100 text-slate-600'}`}
            >{l}</button>
          ))}
        </div>
        {translating && (
          <div className="flex items-center gap-2 text-indigo-600 text-sm mb-3">
            <Loader2 size={14} className="animate-spin" />
            Translating interface with Gemini...
          </div>
        )}

        <h3 className={`font-semibold text-sm mb-3 ${text}`}>{labels.theme}</h3>
        <div className="flex gap-3">
          <button onClick={() => setDarkMode(false)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${!darkMode ? 'bg-amber-500 text-white' : darkMode ? 'bg-slate-700 text-slate-400' : 'bg-slate-100 text-slate-600'}`}
          ><Sun size={15} /> Light</button>
          <button onClick={() => setDarkMode(true)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${darkMode ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}
          ><Moon size={15} /> Dark</button>
        </div>
      </div>

      <div className={`rounded-2xl border p-4 ${card}`}>
        <h3 className={`font-semibold text-sm mb-3 flex items-center gap-2 ${text}`}>
          <FileText size={15} /> {labels.myApps}
        </h3>
        {APPS.map((app, i) => (
          <div key={i} className={`flex items-center justify-between p-3 rounded-xl mb-2 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'}`}>
            <div>
              <p className={`text-sm font-semibold ${text}`}>{app.name}</p>
              <p className={`text-xs ${sub}`}>ID: {app.id}</p>
            </div>
            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${app.color}`}>{app.status}</span>
          </div>
        ))}
      </div>

      <div className={`rounded-2xl border p-4 ${card}`}>
        <h3 className={`font-semibold text-sm mb-3 flex items-center gap-2 ${text}`}>
          <Bell size={15} /> {labels.notifications}
        </h3>
        {NOTIFS.map((n, i) => (
          <div key={i} className={`flex gap-3 p-3 rounded-xl mb-2 ${darkMode ? 'bg-slate-700' : 'bg-slate-50'}`}>
            <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
            <p className={`text-xs leading-relaxed ${text}`}>{n}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
