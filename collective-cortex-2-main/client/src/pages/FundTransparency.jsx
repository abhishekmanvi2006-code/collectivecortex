import React, { useState, useEffect } from 'react';
import { PieChart, DollarSign, AlertTriangle, ShieldCheck } from 'lucide-react';
import { getFunds } from '../api';

const FundTransparency = () => {
  const [fundData, setFundData] = useState(null);
  const [loading, setLoading] = useState(true);

  const mockExpenses = [
    { id: 1, vendor: 'ABC Constructions', amount: 250000, date: 'Oct 05, 2023', risk_level: 'low' },
    { id: 2, vendor: 'XYZ Materials Ltd', amount: 150000, date: 'Sep 28, 2023', risk_level: 'low' },
    { id: 3, vendor: 'Local Supplier A', amount: 120000, date: 'Sep 15, 2023', risk_level: 'medium' },
    { id: 4, vendor: 'Unknown Vendor', amount: 80000, date: 'Sep 02, 2023', risk_level: 'high' }
  ];

  const defaultFund = {
    project_name: 'Model Village Road Development',
    location: 'Mangalore',
    sanctioned_amount: 1000000,
    used_amount: 600000,
    risk_score: 'medium',
    expenses: mockExpenses
  };

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const { data } = await getFunds();
        if (data && data.length > 0) {
          setFundData(data[0]); // Just taking the first fund project for demo
        } else {
          setFundData(defaultFund);
        }
      } catch (err) {
        console.error('Error fetching funds', err);
        setFundData(defaultFund);
      } finally {
        setLoading(false);
      }
    };
    fetchFunds();
  }, []);

  if (loading) return <div className="p-4 text-center text-gray-500">Loading fund data...</div>;

  const { project_name, sanctioned_amount, used_amount, risk_score, expenses } = fundData;
  const remaining = sanctioned_amount - used_amount;
  const percentage = Math.round((used_amount / sanctioned_amount) * 100);

  const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`;

  return (
    <div className="animate-in fade-in duration-300 pb-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Fund Transparency</h1>
        <p className="text-sm text-gray-500 mt-1">Project: {project_name}</p>
      </div>

      {/* Main Stats Card */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg mb-6 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 opacity-10">
          <PieChart className="w-48 h-48" />
        </div>
        
        <p className="text-purple-100 text-sm font-medium mb-1">Sanctioned Amount</p>
        <h2 className="text-3xl font-bold mb-6">{formatCurrency(sanctioned_amount)}</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <p className="text-purple-200 text-xs mb-1">Used Amount</p>
            <p className="font-bold text-lg">{formatCurrency(used_amount)}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <p className="text-purple-200 text-xs mb-1">Remaining</p>
            <p className="font-bold text-lg">{formatCurrency(remaining)}</p>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-6">
          <div className="w-full bg-black/20 rounded-full h-2">
            <div className="bg-green-400 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
          </div>
          <p className="text-xs text-right mt-2 text-purple-200">{percentage}% Utilized</p>
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-100 text-alert flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-sm">AI Risk Score</h3>
            <p className="text-xs text-gray-500">Based on bill anomaly detection</p>
          </div>
        </div>
        <div className="px-3 py-1 bg-orange-50 border border-orange-200 text-alert rounded-lg font-bold text-sm capitalize">
          {risk_score} Risk
        </div>
      </div>

      {/* Expense List */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Recent Expenses</h2>
          <button className="text-sm text-primary font-medium">View All</button>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {expenses.map((expense, i) => (
            <div key={expense._id || expense.id} className={`p-4 flex items-center justify-between border-b border-gray-50 ${i === expenses.length - 1 ? 'border-0' : ''}`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  expense.risk_level === 'low' ? 'bg-green-50 text-success' :
                  expense.risk_level === 'medium' ? 'bg-orange-50 text-alert' :
                  'bg-red-50 text-red-500'
                }`}>
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">{expense.vendor}</h4>
                  <p className="text-xs text-gray-500">{new Date(expense.date).toLocaleDateString() === 'Invalid Date' ? expense.date : new Date(expense.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{formatCurrency(expense.amount)}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  {expense.risk_level === 'low' ? <ShieldCheck className="w-3 h-3 text-success" /> : <AlertTriangle className={`w-3 h-3 ${expense.risk_level === 'medium' ? 'text-alert' : 'text-red-500'}`} />}
                  <span className={`text-[10px] font-bold uppercase ${
                    expense.risk_level === 'low' ? 'text-success' :
                    expense.risk_level === 'medium' ? 'text-alert' :
                    'text-red-500'
                  }`}>{expense.risk_level}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FundTransparency;
