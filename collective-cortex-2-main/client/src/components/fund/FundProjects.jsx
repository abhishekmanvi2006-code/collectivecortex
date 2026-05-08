import { motion } from 'framer-motion';

const statusColor = {
  'Completed': 'bg-emerald-100 text-emerald-700',
  'In Progress': 'bg-indigo-100 text-indigo-700',
  'Planning': 'bg-amber-100 text-amber-700',
};

export default function FundProjects({ darkMode, projects, setSelectedProject, setActiveTab }) {
  const card = darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200';
  const text = darkMode ? 'text-white' : 'text-slate-900';
  const sub = darkMode ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className="space-y-4">
      {projects.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          className={`rounded-2xl border p-4 ${card}`}
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h3 className={`font-bold text-sm ${text}`}>{p.name}</h3>
              <p className={`text-xs mt-0.5 ${sub}`}>📍 {p.location} · {p.dept}</p>
            </div>
            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold shrink-0 ${statusColor[p.status] || 'bg-slate-100 text-slate-600'}`}>
              {p.status}
            </span>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <div>
              <p className={`text-xs ${sub}`}>Sanctioned</p>
              <p className={`font-bold text-sm ${text}`}>{p.amount}</p>
            </div>
            <div>
              <p className={`text-xs ${sub}`}>Used</p>
              <p className="font-bold text-sm text-teal-600">₹{p.used}L</p>
            </div>
            <div>
              <p className={`text-xs ${sub}`}>Progress</p>
              <p className={`font-bold text-sm ${text}`}>{p.progress}%</p>
            </div>
          </div>

          <div className="mb-3">
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${p.progress}%` }}
                transition={{ delay: i * 0.06 + 0.3, duration: 0.8 }}
                className={`h-full rounded-full ${p.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-600'}`}
              />
            </div>
          </div>

          <button
            onClick={() => {
              if (setSelectedProject) setSelectedProject(p);
            }}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            View Details →
          </button>
        </motion.div>
      ))}
    </div>
  );
}
