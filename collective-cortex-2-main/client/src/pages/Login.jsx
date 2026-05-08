import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';
import { sendOtp, verifyOtp } from '../api';

const Login = () => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (step === 1) {
        await sendOtp(phone);
        setStep(2);
      } else {
        const { data } = await verifyOtp(phone, otp);
        localStorage.setItem('userInfo', JSON.stringify(data));
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <BrainCircuit className="text-primary w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Collective Cortex</h1>
        <p className="text-gray-500 mb-6 text-center text-sm">AI-Powered Civic Workflow & Transparency Platform</p>
        
        {error && <div className="w-full bg-red-50 text-red-500 p-3 rounded-xl mb-4 text-sm font-medium text-center border border-red-100">{error}</div>}
        
        <form onSubmit={handleLogin} className="w-full">
          {step === 1 ? (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input 
                type="tel" 
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                placeholder="+91 XXXXX XXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          ) : (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition tracking-widest text-center text-lg font-semibold"
                placeholder="• • • • • •"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <p className="text-xs text-center text-gray-500 mt-2">Sent to your registered mobile number</p>
            </div>
          )}
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary hover:bg-blue-600 disabled:bg-blue-300 text-white font-bold py-3 px-4 rounded-xl transition duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            {loading ? 'Processing...' : step === 1 ? 'Send OTP' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
