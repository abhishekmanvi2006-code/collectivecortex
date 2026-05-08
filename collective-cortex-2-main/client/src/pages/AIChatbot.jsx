import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, BrainCircuit } from 'lucide-react';
import { askChatbot } from '../api';

const AIChatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hello! I am your AI Civic Assistant. I can help you with scheme eligibility, document requirements, or application tracking. What do you need help with?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = input;
    setInput('');
    
    // Add user message
    const newMsg = { id: Date.now(), sender: 'user', text: userMessage };
    setMessages(prev => [...prev, newMsg]);
    
    try {
      const { data } = await askChatbot(userMessage);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'ai',
        text: data.reply
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'ai',
        text: "I'm having trouble connecting right now. Please try again."
      }]);
    }
  };

  const handleSuggestion = (text) => {
    setInput(text);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] animate-in fade-in duration-300">
      <div className="flex items-center gap-3 mb-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="w-10 h-10 bg-blue-100 text-primary rounded-full flex items-center justify-center">
          <BrainCircuit className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-bold text-gray-800">Cortex Assistant</h2>
          <p className="text-xs text-success flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-success inline-block"></span> Online
          </p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 px-1">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${
              msg.sender === 'user' 
                ? 'bg-primary text-white rounded-br-none' 
                : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-2 no-scrollbar">
        <button onClick={() => handleSuggestion('Check my application status')} className="whitespace-nowrap bg-blue-50 text-primary border border-blue-100 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-blue-100 transition">
          Check my application status
        </button>
        <button onClick={() => handleSuggestion('Required documents for PMAY')} className="whitespace-nowrap bg-blue-50 text-primary border border-blue-100 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-blue-100 transition">
          Required documents for PMAY
        </button>
      </div>

      {/* Input Area */}
      <div className="bg-white rounded-full border border-gray-200 p-1 flex items-center shadow-sm">
        <button className="p-2.5 text-gray-400 hover:text-primary transition rounded-full hover:bg-gray-50">
          <Mic className="w-5 h-5" />
        </button>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask anything..." 
          className="flex-1 bg-transparent border-none focus:outline-none px-2 text-sm"
        />
        <button 
          onClick={handleSend}
          className="p-2.5 bg-primary text-white rounded-full hover:bg-blue-600 transition shadow-sm"
        >
          <Send className="w-4 h-4 ml-0.5" />
        </button>
      </div>
    </div>
  );
};

export default AIChatbot;
