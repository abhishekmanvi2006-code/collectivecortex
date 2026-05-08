import React from 'react';
import { CheckCircle, Clock, MapPin, AlertCircle } from 'lucide-react';

const Tracking = () => {
  const stages = [
    {
      id: 1,
      title: 'Application Submitted',
      date: 'Oct 12, 10:30 AM',
      status: 'completed',
      note: 'Documents verified automatically'
    },
    {
      id: 2,
      title: 'Panchayat Review',
      date: 'Oct 14, 02:15 PM',
      status: 'completed',
      note: 'Approved by Local Officer'
    },
    {
      id: 3,
      title: 'Taluk Office',
      date: 'Oct 16, 09:00 AM',
      status: 'delayed',
      note: 'File pending at Desk 4 (2 days delay)'
    },
    {
      id: 4,
      title: 'District Approval',
      date: 'Pending',
      status: 'pending',
      note: 'Awaiting Taluk clearance'
    }
  ];

  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Track Application</h1>
        <p className="text-sm text-gray-500 mt-1">PMAY Housing Scheme • ID: #APP-8924</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative">
        {/* Timeline Line */}
        <div className="absolute left-10 top-10 bottom-10 w-0.5 bg-gray-100"></div>

        <div className="flex flex-col gap-8 relative">
          {stages.map((stage, index) => (
            <div key={stage.id} className="flex gap-4">
              <div className="relative z-10 flex-shrink-0 mt-1">
                {stage.status === 'completed' && (
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center border-4 border-white shadow-sm">
                    <CheckCircle className="text-success w-4 h-4" />
                  </div>
                )}
                {stage.status === 'delayed' && (
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center border-4 border-white shadow-sm">
                    <AlertCircle className="text-alert w-4 h-4" />
                  </div>
                )}
                {stage.status === 'pending' && (
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border-4 border-white shadow-sm">
                    <Clock className="text-gray-400 w-4 h-4" />
                  </div>
                )}
              </div>
              
              <div className={`flex-1 p-4 rounded-xl border ${
                stage.status === 'delayed' ? 'bg-orange-50/50 border-orange-100' :
                stage.status === 'completed' ? 'bg-white border-gray-100' :
                'bg-gray-50/50 border-gray-100 opacity-70'
              }`}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`font-bold text-sm ${stage.status === 'pending' ? 'text-gray-500' : 'text-gray-900'}`}>
                    {stage.title}
                  </h3>
                  <span className="text-[10px] text-gray-500 font-medium">{stage.date}</span>
                </div>
                
                <p className={`text-xs mt-2 flex items-start gap-1.5 ${
                  stage.status === 'delayed' ? 'text-alert font-medium' : 'text-gray-500'
                }`}>
                  {stage.status === 'delayed' ? <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> : <MapPin className="w-3.5 h-3.5 flex-shrink-0" />}
                  {stage.note}
                </p>
                
                {stage.status === 'delayed' && (
                  <button className="mt-3 text-xs font-bold text-primary bg-blue-50 px-3 py-1.5 rounded-lg w-fit">
                    Raise Escalation
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tracking;
