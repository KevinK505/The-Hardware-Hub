// src/components/Chat.js
import React, { useState, useEffect, useRef } from 'react';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import './Chat.css';

function Chat({ user }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const db = getDatabase();
    const chatRef = ref(db, 'messages');

    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      const msgs = [];
      for (let id in data) {
        msgs.push({ id, ...data[id] });
      }
      setMessages(msgs);
    });
  }, []);

  // 🔽 Auto-scroll every time messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() === '') return;

    const db = getDatabase();
    const chatRef = ref(db, 'messages');

    push(chatRef, {
      user: user.email,
      text: message.trim(),
      timestamp: Date.now(),
    });

    setMessage('');
  };

  return (
    <div className="chat-container">
      <h2>💬 Community Chat</h2>

      <div className="chat-box">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message ${msg.user === user.email ? 'own' : 'other'}`}
          >
            <div className="message-user">{msg.user}</div>
            <div className="message-text">{msg.text}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-bar">
        <input
          type="text"
          value={message}
          placeholder="Type a message..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
