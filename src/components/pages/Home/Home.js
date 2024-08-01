import React, { useState, useEffect } from 'react';
import './Home.css';
import Contacts from '../../Contacts/Contacts';

const Home = () => {
  const [userContact, setUserContact] = useState({ firstName: '', lastName: '', email: '' });
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1/contacts?sort=created:desc', {
      method: 'GET',
      headers: { 'Authorization': 'Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn' },
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.contacts) {
          setContacts(data.contacts);
        } else {
          setError('Failed to fetch contacts');
        }
      })
      .catch(error => {
        console.error('Error fetching contacts:', error);
        setError('Failed to fetch contacts');
      });
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserContact(prevContact => ({ ...prevContact, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = {
      record_type: 'person',
      privacy: { edit: null, read: null },
      owner_id: null,
      fields: {
        'first name': [{ value: userContact.firstName, modifier: '', label: 'first name' }],
        'last name': [{ value: userContact.lastName, modifier: '', label: 'last name' }],
        'email': [{ value: userContact.email, modifier: '', label: 'email' }],
      }
    };

    fetch('https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn',
      },
      body: JSON.stringify(newContact)
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          setContacts(prevContacts => [data, ...prevContacts]);
          setUserContact({ firstName: '', lastName: '', email: '' });
          setError(null);
        } else {
          setError('Failed to add contact');
        }
      })
      .catch(error => {
        console.error('Error adding contact:', error);
        setError('Failed to add contact');
      });
  };

  const deleteContact = (id) => {
    fetch(`https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1/contact/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn' },
    })
      .then(response => {
        if (response.ok) {
          setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
        } else {
          setError('Failed to delete contact');
        }
      })
      .catch(error => {
        console.error('Error deleting contact:', error);
        setError('Failed to delete contact');
      });
  };

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
              <Contacts contacts={contacts} deleteContact={deleteContact} />
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
