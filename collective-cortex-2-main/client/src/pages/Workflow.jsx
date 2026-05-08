import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Circle, FileText, Upload, ArrowRight } from 'lucide-react';

const Workflow = () => {
  const { schemeId } = useParams();
  const navigate = useNavigate();
  
  // Example predefined steps
  const [steps, setSteps] = useState([
    { id: 1, title: 'Upload Aadhaar Card', completed: true, required: true },
    { id: 2, title: 'Upload Income Certificate', completed: false, required: true },
    { id: 3, title: 'Property Documents', completed: false, required: false },
    { id: 4, title: 'Final Submission', completed: false, required: true }
  ]);

  const currentStep = steps.findIndex(s => !s.completed);
  const progress = (steps.filter(s => s.completed).length / steps.length) * 100;

  const handleNextStep = () => {
    if (currentStep === 1) { // Assuming next is document upload
      navigate('/upload');
    }
  };

  return (
    <div className="animate-in fade-in duration-300 flex flex-col h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Application Workflow</h1>
        <p className="text-sm text-gray-500 mt-1 capitalize">{schemeId?.replace('-', ' ')} Scheme</p>
      </div>

      {/* Progress Bar */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6">
        <div className="flex justify-between items-end mb-2">
          <span className="text-sm font-bold text-gray-700">Progress</span>
          <span className="text-sm font-bold text-primary">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5">
          <div className="bg-primary h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Checklist */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 flex-1">
        {steps.map((step, index) => (
          <div key={step.id} className={`flex items-center gap-4 p-4 border-b border-gray-50 last:border-0 ${index === currentStep ? 'bg-blue-50/50 rounded-xl' : ''}`}>
            {step.completed ? (
              <CheckCircle className="text-success w-6 h-6 flex-shrink-0" />
            ) : (
              <Circle className={`w-6 h-6 flex-shrink-0 ${index === currentStep ? 'text-primary' : 'text-gray-300'}`} />
            )}
            
            <div className="flex-1">
              <h4 className={`font-medium text-sm ${step.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                {step.title}
              </h4>
              {step.required && <span className="text-[10px] uppercase font-bold text-alert bg-orange-50 px-2 py-0.5 rounded-md mt-1 inline-block">Required</span>}
            </div>
            
            {!step.completed && index === currentStep && (
              <button 
                onClick={handleNextStep}
                className="bg-primary text-white p-2 rounded-lg shadow-sm hover:bg-blue-600 transition"
              >
                <Upload className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button 
          onClick={handleNextStep}
          disabled={currentStep === -1}
          className="w-full bg-primary hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-3.5 px-4 rounded-xl transition duration-200 shadow-md flex justify-center items-center gap-2"
        >
          Proceed to Next Step <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Workflow;
