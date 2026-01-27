import { useState, useRef, useEffect } from 'react';

export default function MessageBox({ cartId, onSendMessage }) {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      await onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="message-box">
      <form onSubmit={handleSend} className="message-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="message-input"
        />
        <button type="submit" className="btn-send">
          Send
        </button>
      </form>
      <div ref={messagesEndRef} />
    </div>
  );
}
