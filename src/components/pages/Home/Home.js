import React, { useState } from 'react';
import './Home.css';
import Contacts from '../../Contacts/Contacts';

const Home = () => {
  const [userContact, setUserContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserContact(prevContact => ({
      ...prevContact,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userContact.firstName && userContact.lastName && userContact.email) {
      setContacts(prevContacts => [...prevContacts, userContact]);
      setUserContact({ firstName: '', lastName: '', email: '' }); 
    } else {
      setError('All fields are required');
    }
  };

  const deleteContact = (index) => {

    setContacts(prevContacts => prevContacts.filter((_, i) => i !== index))

  }

  return (
    <div className='container'>
      <div className='blockForm'>
        <form onSubmit={handleSubmit}>
          <h1>Create contact</h1>
          <div className='block'>
            <label htmlFor='firstName' className='labelForm'>
              First Name
              <input
                type='text'
                id='firstName'
                className='inputForm'
                value={userContact.firstName}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className='block'>
            <label htmlFor='lastName' className='labelForm'>
              Last Name
              <input
                type='text'
                id='lastName'
                className='inputForm'
                value={userContact.lastName}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className='block'>
            <label htmlFor='email' className='labelForm'>
              Email
              <input
                type='email'
                id='email'
                className='inputForm'
                value={userContact.email}
                onChange={handleChange}
              />
            </label>
          </div>
          <button type='submit' className='btnForm'>Add Contact</button>
          {error && <div className='error'>{error}</div>}
        </form>
      </div>

      <div className='blockContacts'>
        <h1>Contacts</h1>
      
        {contacts.length > 0 ? (
          <div className='bgBlock'>
            <ul className='contactList'>
           <Contacts contacts={contacts} deleteContact={deleteContact}/>
          </ul>
          </div>
        ) : (
          <div>No contacts available</div>
        )}
        
      </div>
    </div>
  );
};

export default Home;
