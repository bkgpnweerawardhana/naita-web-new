import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './ChatBot.css';

import { MessageCircle, X } from 'lucide-react';


const ChatBot = () => {
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hi! Ask me anything.' }]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;
    
    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:8000/api/chat/',
        { message: input },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: response.data.response || "I didn't get that" 
      }]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: err.response?.data?.error || 'Error connecting to server' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-box">
          <div className="chatbot-header">
            AI Chat Assistant
            <button onClick={toggleChat} className="close-btn">×</button>
          </div>
          <div className="chatbot-body">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="chat-message bot">Thinking...</div>
            )}
            <div ref={chatEndRef} />
          </div>
          <div className="chatbot-footer">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? '...' : 'Send'}
            </button>
          </div>
        </div>
      )}
        <button
  onClick={toggleChat}
  className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-rose-700 to-blue-800 text-white flex items-center justify-center shadow-lg hover:scale-105 transition"
>
  {isOpen ? <X size={24} strokeWidth={2.25} /> : <MessageCircle size={24} strokeWidth={2.25} />}
</button>


    </div>
  );
};

export default ChatBot;