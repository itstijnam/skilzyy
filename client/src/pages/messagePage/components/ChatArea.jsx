// ChatArea.js
import React, { useState, useEffect, useRef } from 'react';
import './ChatArea.scss';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { baseUrl } from '../../../utils/baseUrl';
import useGetAllChats from '../../../../hooks/useGetAllChats';
import { setChats } from '../../../../redux/chatSlice';

function ChatArea({ contact, onCloseChat }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const messagesEndRef = useRef(null);
  
  const { user } = useSelector((store) => store.auth);
  const { selectedContact } = useSelector((store) => store.chat);
  const chatId = selectedContact?._id;

  useEffect(() => {
    const fetchMessages = async () => {
      if (!chatId) return;
      
      try {
        setLoading(true);
        const res = await axios.get(
          `${baseUrl}/api/message/${chatId}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          setMessages(res.data.messages);
          setHasMore(res.data.pagination?.hasMore || false);
        }
      } catch (error) {
        setError(error?.response?.data?.message || "Failed to load messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim() || !chatId) return;

    try {
      const res = await axios.post(
        `${baseUrl}/api/message`,
        { content: message, chatId },
        { withCredentials: true }
      );

      if (res.data.success) {
        setMessages([...messages, res.data.message]);
        setMessage('');
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to send message");
    }
  };


  const getContactName = (contact) => {
    const otherUser = contact?.users?.find(u => u?._id !== user?._id);
    return !otherUser || contact?.users?.length > 2 ? "Self" : otherUser?.person_name;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-area">
      <div className="chat-area__header">
        <button className="chat-area__back-button" onClick={onCloseChat}>
          &larr;
        </button>
        <h2 className="chat-area__contact-name">
          {getContactName(selectedContact)}
        </h2>
      </div>

      <div className="chat-area__messages-container">
        {loading && messages.length === 0 ? (
          <div className="chat-area__loading">Loading messages...</div>
        ) : error ? (
          <div className="chat-area__error">{error}</div>
        ) : (
          <div className="chat-area__messages-scrollable">
            <div className="chat-area__messages">
              {messages?.map((msg) => (
                <div
                key={msg?._id}
                className={`chat-area__message-wrapper ${
                  msg?.sender?._id === user?._id
                    ? 'chat-area__message-wrapper--sent'
                    : 'chat-area__message-wrapper--received'
                }`}
              >
                
                  <div className="chat-area__message">
                    <div className="chat-area__message-content">
                      {msg?.content}
                    </div>
                    <div className="chat-area__message-meta">
                      <span className="chat-area__message-time">
                        {new Date(msg?.createdAt).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                      {msg?.sender?._id === user?._id && (
                        <span className="chat-area__message-status">
                          {msg?.readBy?.length > 0 ? '✓✓' : '✓'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
      </div>

      <div className="chat-area__input-container">
        <div className="chat-area__input-wrapper">
          <input
            type="text"
            className="chat-area__input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            disabled={loading}
          />
          <button
            className="chat-area__send-button"
            onClick={handleSendMessage}
            disabled={!message.trim() || loading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatArea;