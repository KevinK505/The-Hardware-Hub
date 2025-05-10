// src/components/Chat.js
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, onValue } from 'firebase/database';

function Chat({ user }) {
  const db = getDatabase();
  const chatRef = ref(db, 'messages');

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      const msgs = [];
      for (let id in data) {
        msgs.push({ id, ...data[id] });
      }
      setMessages(msgs);
    });
  }, []);

  const sendMessage = () => {
    if (message.trim() === '') return;

    push(chatRef, {
      user: user.email,
      text: message,
      timestamp: Date.now(),
    });

    setMessage('');
  };

  return (
    <div>
      <h2>Community Chat</h2>
      <div style={{ height: '200px', overflowY: 'scroll', border: '1px solid gray', padding: '10px' }}>
        {messages.map((msg) => (
          <p key={msg.id}><strong>{msg.user}</strong>: {msg.text}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        placeholder="Type your message"
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
