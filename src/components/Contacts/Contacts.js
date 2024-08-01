import React from 'react'
import avatar from './avatar.svg'
import { TiDeleteOutline } from "react-icons/ti";
import { NavLink, Outlet } from 'react-router-dom';


const Contacts = ({ contacts, deleteContact }) => {
    return (
      <>
        {contacts.map((contact, index) => (
          <li key={index} className='contactItem'>
            <img src={avatar} alt="Avatar" />
            <div>
           <NavLink to='/contact' className='navLink'>
            <div className='name'>
              {contact.firstName} {contact.lastName}
            </div>
            <div className='email'>
              {contact.email}
            </div>
           </NavLink>
           <div className='delete'><TiDeleteOutline size={25} onClick={() => deleteContact(index)} /></div>
          </div>
          </li>
        ))}
      </>
    );
  };

export default Contacts
