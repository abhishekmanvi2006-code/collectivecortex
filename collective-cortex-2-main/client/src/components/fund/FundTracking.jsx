import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export default function FundTracking({ darkMode, selectedProject }) {
  const p = selectedProject;
  const card = darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200';
  const text = darkMode ? 'text-white' : 'text-slate-900';
  const sub = darkMode ? 'text-slate-400' : 'text-slate-500';

  const pieData = [
    { name: 'Used', value: p.used, color: '#3730a3' },
    { name: 'Remaining', value: p.amountNum - p.used, color: '#e2e8f0' },
  ];

  const timeline = ['Sanctioned', 'Funds Released', 'Work Started', 'Bills Uploaded', 'AI Verified', 'Completed'];
  const doneSteps = p.progress === 100 ? 6 : p.progress >= 65 ? 4 : p.progress >= 45 ? 3 : 2;

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Sanctioned', val: `₹${p.amountNum}L`, color: 'text-indigo-600' },
          { label: 'Used', val: `₹${p.used}L`, color: 'text-teal-600' },
          { label: 'Remaining', val: `₹${p.amountNum - p.used}L`, color: 'text-amber-600' },
          { label: 'Progress', val: `${p.progress}%`, color: 'text-slate-700' },
        ].map((item, i) => (
          <div key={i} className={`rounded-2xl border p-4 ${card}`}>
            <p className={`text-xs ${sub}`}>{item.label}</p>
            <p className={`text-xl font-bold mt-1 ${item.color}`}>{item.val}</p>
          </div>
        ))}
      </div>

      {/* Pie Chart */}
      <div className={`rounded-2xl border p-4 ${card}`}>
        <h3 className={`font-semibold text-sm mb-3 ${text}`}>💰 Fund Utilization</h3>
        <div className="flex items-center gap-4">
          <ResponsiveContainer width={120} height={120}>
            <PieChart>
              <Pie data={pieData} innerRadius={35} outerRadius={55} dataKey="value" startAngle={90} endAngle={-270}>
                {pieData.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2">
            {pieData.map((d, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full shrink-0" style={{ background: d.color }} />
                <span className={`text-sm ${text}`}>{d.name}: <strong>₹{d.value}L</strong></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Budget Breakdown */}
      <div className={`rounded-2xl border p-4 ${card}`}>
        <h3 className={`font-semibold text-sm mb-3 ${text}`}>📋 Budget Breakdown</h3>
        <div className="space-y-2">
          {p.budget.map((b, i) => (
            <div key={i}>
              <div className="flex justify-between mb-1">
                <span className={`text-xs font-medium ${text}`}>{b.cat}</span>
                <span className={`text-xs ${sub}`}>₹{b.used}L / ₹{b.alloc}L</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(b.used / b.alloc) * 100}%` }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="h-full bg-indigo-500 rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stages */}
      <div className={`rounded-2xl border p-4 ${card}`}>
        <h3 className={`font-semibold text-sm mb-3 ${text}`}>🏗️ Construction Stages</h3>
        <div className="space-y-2">
          {p.stages.map((s, i) => (
            <div key={i} className={`flex items-center gap-2 text-sm ${s.includes('✔') ? 'text-emerald-600' : sub}`}>
              <span>{s.includes('✔') ? '✅' : '⏳'}</span>
              <span>{s.replace('✔', '').replace('⏳', '').trim()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className={`rounded-2xl border p-4 ${card}`}>
        <h3 className={`font-semibold text-sm mb-4 ${text}`}>📅 Fund Release Timeline</h3>
        <div className="flex overflow-x-auto gap-0 pb-2">
          {timeline.map((step, i) => (
            <div key={i} className="flex items-center shrink-0">
              <div className="flex flex-col items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i < doneSteps ? 'bg-indigo-600 text-white' : darkMode ? 'bg-slate-700 text-slate-400' : 'bg-slate-200 text-slate-400'}`}>
                  {i < doneSteps ? '✓' : i + 1}
                </div>
                <p className={`text-xs mt-1 text-center max-w-[60px] leading-tight ${i < doneSteps ? 'text-indigo-600 font-semibold' : sub}`}>{step}</p>
              </div>
              {i < timeline.length - 1 && (
                <div className={`h-0.5 w-8 mx-1 shrink-0 ${i < doneSteps - 1 ? 'bg-indigo-600' : 'bg-slate-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
