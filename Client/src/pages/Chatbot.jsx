
import { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaUser } from 'react-icons/fa';
import { BsRobot } from "react-icons/bs";
import { RiLoader4Fill } from 'react-icons/ri';
import React, { useContext } from "react";
import moment from "moment";
import "moment/locale/ar-ma";
import "moment-timezone";
import { 
  PrayerContext,
  AdkarContext,
  HadithContext,
  AlarmContext,
  UIStateContext,
  PDFContext
} from '../components/Mainn';

moment.locale("ar-ma");

export default function Chatbot() {
  const {
    seCitie,
    prayers,
    aprayerIndex,
    bprayerIndex,
    nDate,
    aTime,
    bTime,
    nTime,
    hijri,
  } = {
    ...useContext(PrayerContext),
    ...useContext(AdkarContext),
    ...useContext(HadithContext),
    ...useContext(AlarmContext),
    ...useContext(UIStateContext),
    ...useContext(PDFContext)
  };

  const API_URL = '';
  const GAPI_URL = '';
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { 
      sender: 'bot', 
      text: 'As-salamu alaykum! I am your Islamic assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const API_BASE = '/api/ai';

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { 
      sender: 'user', 
      text: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.slice(-3).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      const response = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: input,
          history: history
        })
      });

      const data = await response.json();
      
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: data.response,
        timestamp: new Date()
      }]);
      
    } catch (error) {
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: 'Sorry, I encountered an error. Please try again.',
        isError: true,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <div
        className={`text-center m-3 mt-5 grid grid-cols-1 gap-x-1 ssm:gap-x-10 text-white border-b pb-2 
        ${bTime ? "ssm:grid-cols-3" : "ssm:grid-cols-2"}`}
      >
        <div className={`justify-self-center`}>
          <h2 className="text-center text-base ssm:text-xl">
            تبقى حتى صلاة {prayers[aprayerIndex].name}
          </h2>
          <h1 className="text-center text-xl ssm:text-3xl font-semibold">
            {aTime}
          </h1>
        </div>
        <div className={`justify-self-center ${!bTime && "hidden"}`}>
          <h2 className="text-center text-base ssm:text-xl">
            فاتت على صلاة {prayers[bprayerIndex].name}
          </h2>
          <h1 className="text-center text-xl ssm:text-3xl font-semibold">
            {bTime}
          </h1>
        </div>
        <div className="justify-self-left">
          <h2
            className="text-center ssm:text-start text-base ssm:text-l"
            dir="rtl"
          >
            {hijri.day} {hijri.month.ar} {hijri.year}|{nDate}
          </h2>
          <h1 className="text-center ssm:text-end text-xl ssm:text-3xl font-semibold">
            {seCitie.arabicName ? seCitie.arabicName : "المغرب"} {nTime}
          </h1>
        </div>
      </div>
      
      <div className="flex flex-col h-[calc(100vh-220px)] max-w-3xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-center p-4 bg-blue-header rounded-t-lg">
          <h2 className="text-xl font-semibold text-dark-yellow">المرشد</h2>
          <BsRobot className="text-dark-yellow text-2xl ml-2" />
        </div>
        
        {/* Messages container with scroll */}
        <div 
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 bg-blue-sidebar scrollbar"
          style={{ maxHeight: 'calc(100vh - 320px)' }}
        >
          {messages.map((msg, i) => (
            <div 
              key={i} 
              className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-xs md:max-w-md lg:max-w-lg ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`flex-shrink-0 mx-2 ${msg.sender === 'user' ? 'text-dark-yellow' : 'text-gray-300'}`}>
                  {msg.sender === 'user' ? <FaUser size={20} /> : <BsRobot size={20} />}
                </div>
                <div 
                  className={`p-3 rounded-lg ${msg.sender === 'user' 
                    ? 'bg-dark-yellow text-white' 
                    : msg.isError
                      ? 'bg-red-900 text-white'
                      : 'bg-gray-700 text-white'}`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="flex items-center p-3 bg-gray-700 rounded-lg text-white">
                <RiLoader4Fill className="animate-spin mr-2" />
                Thinking...
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input area */}
        <div className="p-4 bg-blue-header rounded-b-lg">
          {error && (
            <div className="text-red-400 text-sm mb-2">
              Error: {error}
            </div>
          )}
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-dark-yellow resize-none"
              placeholder="Ask about Islam..."
              rows="1"
              disabled={isLoading}
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className={`p-3 rounded-lg flex items-center justify-center ${isLoading || !input.trim()
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-dark-yellow hover:bg-arrow-yellow text-white'}`}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}