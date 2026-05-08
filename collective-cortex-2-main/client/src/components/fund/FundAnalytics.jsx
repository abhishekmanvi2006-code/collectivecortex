import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { MONTHLY_SPENDING, CATEGORY_SPENDING, RISK_DATA } from '../../data/fundData';

export default function FundAnalytics({ darkMode }) {
  const card = darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200';
  const text = darkMode ? 'text-white' : 'text-slate-900';
  const sub = darkMode ? 'text-slate-400' : 'text-slate-500';
  const axisTick = { fontSize: 10, fill: darkMode ? '#94a3b8' : '#64748b' };
  const tooltipStyle = { backgroundColor: darkMode ? '#1e293b' : '#fff', border: 'none', borderRadius: 12, fontSize: 12 };

  return (
    <div className="space-y-4">
      {/* Top Vendor Card */}
      <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-teal-600 p-4 text-white">
        <p className="text-white/70 text-xs uppercase tracking-wide mb-1">Most Active Vendor</p>
        <p className="font-bold text-base">Ramesh Constructions Pvt Ltd</p>
        <div className="flex gap-4 mt-2 text-sm">
          <span>📋 8 Invoices</span>
          <span>💰 ₹18.4L Total</span>
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">Monitor</span>
        </div>
      </div>

      {/* Category Bar Chart */}
      <div className={`rounded-2xl border p-4 ${card}`}>
        <h3 className={`font-semibold text-sm mb-3 ${text}`}>📊 Spending by Category (₹L)</h3>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={CATEGORY_SPENDING} margin={{ left: -15 }}>
            <XAxis dataKey="cat" tick={axisTick} />
            <YAxis tick={axisTick} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="amount" fill="#3730a3" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Line Chart */}
      <div className={`rounded-2xl border p-4 ${card}`}>
        <h3 className={`font-semibold text-sm mb-3 ${text}`}>📈 Monthly Spending Trend (₹L)</h3>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={MONTHLY_SPENDING} margin={{ left: -15 }}>
            <XAxis dataKey="month" tick={axisTick} />
            <YAxis tick={axisTick} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey="amount" stroke="#0d9488" strokeWidth={2.5} dot={{ fill: '#0d9488', r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Risk Pie Chart */}
      <div className={`rounded-2xl border p-4 ${card}`}>
        <h3 className={`font-semibold text-sm mb-3 ${text}`}>🎯 Risk Distribution</h3>
        <div className="flex items-center gap-4">
          <ResponsiveContainer width={130} height={130}>
            <PieChart>
              <Pie data={RISK_DATA} innerRadius={35} outerRadius={58} dataKey="value" startAngle={90} endAngle={-270}>
                {RISK_DATA.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2">
            {RISK_DATA.map((d, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                <span className={`text-sm ${text}`}>{d.name}: <strong>{d.value}%</strong></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
