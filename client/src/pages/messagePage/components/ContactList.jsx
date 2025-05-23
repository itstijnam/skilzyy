import React from 'react';
import './ContactList.scss';
import { setSelectedContact } from '../../../../redux/chatSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ContactList({ contacts, selectedContact }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.auth);

  const getContactName = (contact) => {
    // Find the other user in the chat (excluding current user)
    const otherUser = contact?.users?.find(u => u._id !== user._id);
    
    // If no other user found (chat with self) or if it's a group chat
    if (!otherUser || contact.users.length > 2) {
      return "Self";
    }
    
    return otherUser.person_name;
  };

  return (
    <div className="contact-list">
      <div className="contact-list__header">
        <h2 className='contact-back' onClick={()=>navigate(-1)} >↩</h2>
        <h2 className="contact-list__title">Contacts</h2>
      </div>
      <ul className="contact-list__items">
        {contacts?.map((contact) => (
          <li
            key={contact._id}
            className={`contact-list__item ${
              selectedContact?._id === contact._id ? 'contact-list__item--active' : ''
            }`}
            onClick={() => dispatch(setSelectedContact(contact))}
          >
            <div className="contact-list__name">
              {getContactName(contact)}
            </div>
            <div className="contact-list__last-message">
              {contact.latestMessage?.content || 'No messages yet'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactList;