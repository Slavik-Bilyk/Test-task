import React from 'react';
import avatar from './avatar.svg';
import { TiDeleteOutline } from "react-icons/ti";
import { NavLink } from 'react-router-dom';

const Contacts = ({ contacts, deleteContact }) => {
  return (
    <>
      {contacts.length > 0 ? (
        contacts.map((contact) => (
          <li key={contact.id} className='contactItem'>
            <img src={contact.avatar || avatar} alt="Avatar" />
            <div>
              <NavLink to={`/user/${contact.id}`} className='navLink'>
                <div className='name'>
                  {contact.fields['first name']?.[0]?.value || 'No first name'} {contact.fields['last name']?.[0]?.value || 'No last name'}
                </div>
                <div className='email'>
                  {contact.fields['email']?.[0]?.value || 'No email'}
                </div>
                <div className='tags'>
                  {Array.isArray(contact.tags) && contact.tags.length > 0 ? contact.tags.join(', ') : 'No tags'}
                </div>
              </NavLink>
              <div className='delete'>
                <TiDeleteOutline size={25} onClick={() => deleteContact(contact.id)} />
              </div>
            </div>
          </li>
        ))
      ) : (
        <li>No contacts available</li>
      )}
    </>
  );
};

export default Contacts;
