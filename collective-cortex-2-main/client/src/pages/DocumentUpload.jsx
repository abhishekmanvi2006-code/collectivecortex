import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, CheckCircle, AlertCircle, File, Smartphone } from 'lucide-react';
import { verifyDocumentOcr } from '../api';

const DocumentUpload = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, uploading, verifying, verified, error
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleFileUpload = async (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus('uploading');
      
      // Simulate immediate upload finish then verification start
      setTimeout(async () => {
        setStatus('verifying');
        try {
          // Since it's a mock, we don't need real FormData, but we send it anyway
          const formData = new FormData();
          formData.append('document', e.target.files[0]);
          const { data } = await verifyDocumentOcr(formData);
          
          setStatus(data.status); // 'verified'
          setMessage(data.message);
        } catch (error) {
          setStatus('error');
          setMessage('AI verification failed due to unreadable format or mismatch.');
        }
      }, 1000);
    }
  };

  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Upload Document</h1>
        <p className="text-sm text-gray-500 mt-1">Income Certificate</p>
      </div>

      {/* Upload Area */}
      <div className="bg-white border-2 border-dashed border-blue-200 rounded-2xl p-8 flex flex-col items-center justify-center mb-6 hover:bg-blue-50/50 transition cursor-pointer relative overflow-hidden">
        <input 
          type="file" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileUpload}
        />
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-primary">
          <UploadCloud className="w-8 h-8" />
        </div>
        <h3 className="font-bold text-gray-800 mb-1">Tap to Upload File</h3>
        <p className="text-xs text-gray-500 text-center">JPG, PNG or PDF (Max 5MB)</p>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="h-px bg-gray-200 flex-1"></div>
        <span className="text-xs font-bold text-gray-400 uppercase">OR</span>
        <div className="h-px bg-gray-200 flex-1"></div>
      </div>

      {/* DigiLocker Button */}
      <button className="w-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 text-gray-800 font-bold py-3.5 px-4 rounded-xl transition duration-200 flex justify-center items-center gap-3 mb-8">
        <Smartphone className="w-5 h-5 text-blue-500" />
        Fetch from DigiLocker
      </button>

      {/* Status Area */}
      {file && (
        <div className={`p-4 rounded-xl border ${
          status === 'verified' ? 'bg-green-50 border-green-200' :
          status === 'error' ? 'bg-red-50 border-red-200' :
          'bg-blue-50 border-blue-200'
        }`}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${
              status === 'verified' ? 'bg-green-100 text-success' :
              status === 'error' ? 'bg-red-100 text-red-500' :
              'bg-blue-100 text-primary'
            }`}>
              <File className="w-5 h-5" />
            </div>
            <div className="flex-1 overflow-hidden">
              <h4 className="font-bold text-sm text-gray-800 truncate">{file.name}</h4>
              <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
            {status === 'verified' && <CheckCircle className="text-success w-6 h-6" />}
            {status === 'error' && <AlertCircle className="text-red-500 w-6 h-6" />}
          </div>

          {(status === 'uploading' || status === 'verifying') && (
            <div className="mt-3">
              <div className="flex justify-between text-xs font-medium mb-1 text-primary">
                <span>{status === 'uploading' ? 'Uploading...' : 'AI Verifying Document...'}</span>
              </div>
              <div className="w-full bg-blue-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-primary h-1.5 rounded-full animate-pulse w-full"></div>
              </div>
            </div>
          )}

          {status === 'error' && (
            <p className="text-xs text-red-600 mt-2 font-medium">{message || 'Error: Name mismatch detected by AI.'}</p>
          )}
          {status === 'verified' && (
            <p className="text-xs text-success mt-2 font-medium">{message || 'Document verified successfully by AI.'}</p>
          )}
        </div>
      )}

      {status === 'verified' && (
        <button 
          onClick={() => navigate('/workflow/pmay')}
          className="w-full mt-6 bg-primary hover:bg-blue-600 text-white font-bold py-3.5 px-4 rounded-xl transition duration-200 shadow-md"
        >
          Continue
        </button>
      )}
    </div>
  );
};

export default DocumentUpload;
