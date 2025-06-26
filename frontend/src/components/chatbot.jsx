import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import '../ChatBot.css';

const ChatBot = () => {
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hi! Ask me anything.' }]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const chatEndRef = useRef(null);

  const handleSend = async () => {
    if (input.trim() === '') return;
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await axios.post('http://localhost:8000/api/chatbot/', {
        message: input,
      });

      setMessages([...newMessages, { sender: 'bot', text: response.data.reply }]);
    } catch (err) {
      setMessages([...newMessages, { sender: 'bot', text: 'Error connecting to server.' }]);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-box">
          <div className="chatbot-header">AI Chat Assistant</div>
          <div className="chatbot-body">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="chatbot-footer">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
      <button className="chatbot-toggle" onClick={toggleChat}>
        💬
      </button>
    </div>
  );
};

export default ChatBot;
