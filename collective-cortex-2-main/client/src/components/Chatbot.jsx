import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_KEY || '';

export default function Chatbot({ systemPrompt, buttonLabel = 'Ask AI', inline = false, darkMode }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m your Gemini-powered assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      if (!GEMINI_API_KEY) {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: '⚠️ Gemini API key not configured. Please add VITE_GEMINI_KEY to your .env file. Get one at aistudio.google.com'
          }]);
          setLoading(false);
        }, 1000);
        return;
      }

      // Gemini API Request
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: `${systemPrompt}\n\nUser Question: ${input}` }]
            }]
          })
        }
      );

      const data = await response.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (aiText) {
        setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);
      } else {
        throw new Error('No response from Gemini');
      }
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '❌ Unable to reach Gemini. Please check your API key or internet connection.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const bg = darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200';
  const msgBg = darkMode ? 'bg-slate-800' : 'bg-slate-100';
  const textColor = darkMode ? 'text-white' : 'text-slate-900';
  const subText = darkMode ? 'text-slate-400' : 'text-slate-500';
  const inputBg = darkMode ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400';

  const ChatWindow = (
    <div className={`flex flex-col h-full ${bg} rounded-2xl border shadow-2xl overflow-hidden`}>
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-600 to-teal-600">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Bot size={16} className="text-white" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Cortex AI (Gemini)</p>
            <p className="text-indigo-200 text-xs">Public Transparency Platform</p>
          </div>
        </div>
        {!inline && (
          <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors">
            <X size={18} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === 'assistant' ? 'bg-gradient-to-br from-indigo-500 to-teal-500' : 'bg-slate-300'
            }`}>
              {msg.role === 'assistant' ? <Bot size={13} className="text-white" /> : <User size={13} className="text-slate-600" />}
            </div>
            <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-indigo-600 text-white rounded-tr-sm'
                : `${msgBg} ${textColor} rounded-tl-sm`
            }`}>
              {msg.content}
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex gap-2 items-center">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-teal-500 flex items-center justify-center">
              <Bot size={13} className="text-white" />
            </div>
            <div className={`px-3 py-2 rounded-2xl rounded-tl-sm ${msgBg}`}>
              <div className="flex gap-1 items-center">
                <span className={`text-xs ${subText}`}>Gemini is thinking</span>
                <Loader2 size={12} className="text-indigo-500 animate-spin ml-1" />
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className={`p-3 border-t ${darkMode ? 'border-slate-700' : 'border-slate-100'}`}>
        <div className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Ask AI anything..."
            className={`flex-1 px-3 py-2 rounded-xl border text-sm outline-none focus:border-indigo-400 transition-colors ${inputBg}`}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="w-9 h-9 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 flex items-center justify-center transition-colors"
          >
            <Send size={15} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );

  if (inline) return <div className="h-full">{ChatWindow}</div>;

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-5 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-indigo-600 to-teal-600 shadow-lg shadow-indigo-500/30 flex items-center justify-center animate-pulse-glow"
      >
        <MessageCircle size={24} className="text-white" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.95 }}
            className="fixed bottom-44 right-5 z-50 w-80 h-[460px]"
          >
            {ChatWindow}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
