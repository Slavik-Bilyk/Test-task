import React from 'react';
import avatar from './avatar.svg';
import { TiDeleteOutline } from "react-icons/ti";
import { NavLink } from 'react-router-dom';

const Contacts = ({ contacts, deleteContact }) => {
  return (
    <>
      {contacts.map((contact) => (
        <li key={contact.id} className='contactItem'>
          <img src={contact.avatar || avatar} alt="Avatar" />
          <div>
            <NavLink to={`/contact/${contact.id}`} className='navLink'>
              <div className='name'>
                {contact.fields['first name'][0]?.value} {contact.fields['last name'][0]?.value}
              </div>
              <div className='email'>
                {contact.fields['email'][0]?.value}
              </div>
              <div className='tags'>
                {contact.tags ? contact.tags.join(', ') : 'No tags'}
              </div>
            </NavLink>
            <div className='delete'>
              <TiDeleteOutline size={25} onClick={() => deleteContact(contact.id)} />
            </div>
          </div>
        </li>
      ))}
    </>
  );
};

export default Contacts;
