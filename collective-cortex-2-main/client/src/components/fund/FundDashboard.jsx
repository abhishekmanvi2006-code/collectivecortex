import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function FundDashboard({ darkMode, projects }) {
  const card = darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200';
  const text = darkMode ? 'text-white' : 'text-slate-900';
  const sub = darkMode ? 'text-slate-400' : 'text-slate-500';

  const metrics = [
    { label: 'Total Projects', value: '6', icon: '🏗️', color: 'from-indigo-500 to-indigo-600' },
    { label: 'Total Sanctioned', value: '₹12.4 Cr', icon: '💰', color: 'from-teal-500 to-teal-600' },
    { label: 'High Risk Alerts', value: '3', icon: '🚨', color: 'from-red-500 to-red-600' },
    { label: 'Pending Approvals', value: '5', icon: '⏳', color: 'from-amber-500 to-amber-600' },
  ];

  const chartData = projects.map(p => ({
    name: p.name.split(' ').slice(0, 2).join(' '),
    Sanctioned: p.amountNum,
    Used: p.used,
  }));

  const activity = [
    { text: 'Bridge Construction — Bill uploaded', time: '2 hours ago', icon: '🧾' },
    { text: 'Road Repair — AI flagged duplicate invoice', time: '5 hours ago', icon: '🚨' },
    { text: 'School Building — Progress photo verified', time: '1 day ago', icon: '✅' },
    { text: 'Water Pipeline — New vendor added', time: '2 days ago', icon: '👤' },
  ];

  return (
    <div className="space-y-5">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className={`rounded-2xl p-4 bg-gradient-to-br ${m.color} text-white shadow-lg`}
          >
            <div className="text-2xl mb-1">{m.icon}</div>
            <div className="text-xl font-bold">{m.value}</div>
            <div className="text-white/80 text-xs mt-0.5">{m.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className={`rounded-2xl border p-4 ${card}`}>
        <h3 className={`font-semibold text-sm mb-4 ${text}`}>📊 Sanctioned vs Used (₹ Lakhs)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} margin={{ left: -10 }}>
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: darkMode ? '#94a3b8' : '#64748b' }} />
            <YAxis tick={{ fontSize: 10, fill: darkMode ? '#94a3b8' : '#64748b' }} />
            <Tooltip
              contentStyle={{ backgroundColor: darkMode ? '#1e293b' : '#fff', border: 'none', borderRadius: 12, fontSize: 12 }}
            />
            <Bar dataKey="Sanctioned" fill="#3730a3" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Used" fill="#0d9488" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity */}
      <div className={`rounded-2xl border p-4 ${card}`}>
        <h3 className={`font-semibold text-sm mb-3 ${text}`}>🕐 Recent Activity</h3>
        <div className="space-y-3">
          {activity.map((a, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="text-lg shrink-0">{a.icon}</span>
              <div>
                <p className={`text-sm ${text}`}>{a.text}</p>
                <p className={`text-xs mt-0.5 ${sub}`}>{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
