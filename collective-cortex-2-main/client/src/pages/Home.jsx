import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Search, PieChart, MessageSquare, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      {/* Header Area */}
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-gray-800">Hello, User 👋</h1>
        <p className="text-gray-500">What would you like to do today?</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Link to="/schemes" className="bg-white p-5 rounded-2xl shadow-sm border border-blue-100 flex flex-col items-start cursor-pointer hover:shadow-md hover:border-blue-300 transition group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-3 text-primary">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-800 text-sm mb-1">Apply for Scheme</h3>
          <p className="text-xs text-gray-500">PMAY, Land Mutation</p>
        </Link>
        
        <Link to="/tracking" className="bg-white p-5 rounded-2xl shadow-sm border border-green-100 flex flex-col items-start cursor-pointer hover:shadow-md hover:border-green-300 transition group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-green-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-3 text-success">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-800 text-sm mb-1">Track Application</h3>
          <p className="text-xs text-gray-500">View real-time status</p>
        </Link>

        <Link to="/transparency" className="bg-white p-5 rounded-2xl shadow-sm border border-purple-100 flex flex-col items-start cursor-pointer hover:shadow-md hover:border-purple-300 transition group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-3 text-purple-600">
            <PieChart className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-800 text-sm mb-1">Fund Transparency</h3>
          <p className="text-xs text-gray-500">Track public money</p>
        </Link>

        <Link to="/chatbot" className="bg-gradient-to-br from-primary to-blue-600 p-5 rounded-2xl shadow-md flex flex-col items-start cursor-pointer hover:shadow-lg transition group relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm mb-1">AI Assistant</h3>
          <p className="text-xs text-blue-100">Ask any query</p>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="mt-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Recent Activity</h2>
          <Link to="/tracking" className="text-sm font-medium text-primary flex items-center">
            View all <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-800 text-sm">PMAY Housing Scheme</h4>
              <p className="text-xs text-gray-500">Submitted on Oct 12, 2023</p>
            </div>
            <div className="px-3 py-1 bg-orange-50 text-alert rounded-full text-xs font-bold border border-orange-100">
              In Review
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
