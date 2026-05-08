import React, { useState } from 'react';
import { User, FileText, Settings, Globe, Moon, LogOut, ChevronRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
      </div>

      {/* User Info */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6 flex items-center gap-4">
        <div className="w-16 h-16 bg-blue-100 text-primary rounded-full flex items-center justify-center border-4 border-blue-50">
          <User className="w-8 h-8" />
        </div>
        <div>
          <h2 className="font-bold text-lg text-gray-900">Ramesh Kumar</h2>
          <p className="text-gray-500 text-sm">+91 98765 43210</p>
          <div className="flex items-center gap-1 mt-1 text-xs font-medium text-success bg-green-50 px-2 py-0.5 rounded-full w-fit border border-green-100">
            <CheckCircle className="w-3 h-3" /> KYC Verified
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {/* Documents */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
            <h3 className="font-bold text-sm text-gray-800 flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" /> My Documents
            </h3>
          </div>
          <div className="p-2">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-primary">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Aadhaar Card</p>
                  <p className="text-xs text-gray-500">Verified on DigiLocker</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-primary">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Income Certificate</p>
                  <p className="text-xs text-gray-500">Uploaded manually</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
            <h3 className="font-bold text-sm text-gray-800 flex items-center gap-2">
              <Settings className="w-4 h-4 text-gray-500" /> Preferences
            </h3>
          </div>
          <div className="p-2">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition cursor-pointer">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Language</span>
              </div>
              <span className="text-xs font-bold text-primary bg-blue-50 px-2 py-1 rounded-md">English</span>
            </div>
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition cursor-pointer" onClick={() => setDarkMode(!darkMode)}>
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Dark Mode</span>
              </div>
              <div className={`w-10 h-5 rounded-full relative transition-colors ${darkMode ? 'bg-primary' : 'bg-gray-300'}`}>
                <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${darkMode ? 'left-5.5 right-0 translate-x-[20px]' : 'left-0.5'}`}></div>
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={() => navigate('/login')}
          className="w-full bg-white border border-red-200 text-red-500 hover:bg-red-50 font-bold py-3.5 px-4 rounded-xl transition duration-200 flex justify-center items-center gap-2 shadow-sm"
        >
          <LogOut className="w-4 h-4" /> Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
