// MessagePage.js (no changes needed to this file)
import React, { useState, useEffect } from 'react';
import './MessagePage.scss';
import Header from './components/Header';
import ContactList from './components/ContactList';
import ChatArea from './components/ChatArea';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedContact } from '../../../redux/chatSlice';

function MessagePage() {
  const [isMobileView, setIsMobileView] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const {chats, selectedContact} = useSelector((store) => store.chat);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (selectedContact) {
      setShowChat(true);
    }
  }, [selectedContact]);

  const handleCloseChat = () => {
    setShowChat(false);
    dispatch(setSelectedContact(null))
  };

  return (
    <div className="message-page">
      <Header />
      <div className="message-page__content">
        <div 
          className={`message-page__sidebar ${
            isMobileView ? (showChat ? 'message-page__sidebar--hidden' : '') : ''
          }`}
        >
          <ContactList 
            contacts={chats} 
            selectedContact={selectedContact}
          />
        </div>
        <div 
          className={`message-page__chat-area ${
            isMobileView ? (showChat ? '' : 'message-page__chat-area--hidden') : ''
          }`}
        >
          {selectedContact ? (
            <ChatArea 
              contact={selectedContact} 
              onCloseChat={handleCloseChat}
            />
          ) : (
            <div className="message-page__empty-chat">
              {isMobileView ? 'Select a chat to start messaging' : 'Select a contact to start chatting'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MessagePage;