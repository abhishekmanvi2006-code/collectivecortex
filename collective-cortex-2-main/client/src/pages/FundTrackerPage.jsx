import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { PROJECTS, BILLS, ALERTS, MONTHLY_SPENDING, CATEGORY_SPENDING, RISK_DATA } from '../data/fundData';
import FundDashboard from '../components/fund/FundDashboard';
import FundProjects from '../components/fund/FundProjects';
import FundTracking from '../components/fund/FundTracking';
import BillsExpenses from '../components/fund/BillsExpenses';
import AIAlerts from '../components/fund/AIAlerts';
import ProgressVerification from '../components/fund/ProgressVerification';
import CommunityReports from '../components/fund/CommunityReports';
import FundAnalytics from '../components/fund/FundAnalytics';

const TABS = [
  { id: 'dashboard', label: 'Dashboard', emoji: '📊' },
  { id: 'projects', label: 'Projects', emoji: '🏗️' },
  { id: 'tracking', label: 'Fund Tracking', emoji: '💰' },
  { id: 'bills', label: 'Bills', emoji: '🧾' },
  { id: 'alerts', label: 'AI Alerts', emoji: '🚨' },
  { id: 'progress', label: 'Progress', emoji: '📍' },
  { id: 'community', label: 'Community', emoji: '👥' },
  { id: 'analytics', label: 'Analytics', emoji: '📈' },
];

export default function FundTrackerPage({ darkMode }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProject, setSelectedProject] = useState(PROJECTS[0]);

  const bg = darkMode ? 'bg-slate-900' : 'bg-slate-50';
  const tabBar = darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200';
  const text = darkMode ? 'text-white' : 'text-slate-900';
  const sub = darkMode ? 'text-slate-400' : 'text-slate-500';

  const renderContent = () => {
    const props = { darkMode, projects: PROJECTS, bills: BILLS, alerts: ALERTS, selectedProject, setSelectedProject };
    switch (activeTab) {
      case 'dashboard': return <FundDashboard {...props} />;
      case 'projects': return <FundProjects {...props} />;
      case 'tracking': return <FundTracking {...props} />;
      case 'bills': return <BillsExpenses {...props} />;
      case 'alerts': return <AIAlerts {...props} />;
      case 'progress': return <ProgressVerification {...props} />;
      case 'community': return <CommunityReports {...props} />;
      case 'analytics': return <FundAnalytics {...props} />;
      default: return null;
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className={`text-2xl font-bold ${text}`}>Fund Transparency</h1>
        <p className={`text-sm mt-1 ${sub}`}>AI-powered government fund tracking & verification</p>
      </div>

      {/* Horizontal Scrollable Tab Bar */}
      <div className={`flex gap-1 overflow-x-auto pb-2 mb-5 scrollbar-hide`}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                : darkMode ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-white text-slate-500 hover:text-slate-800 border border-slate-200'
            }`}
          >
            <span>{tab.emoji}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {renderContent()}
      </motion.div>
    </div>
  );
}
