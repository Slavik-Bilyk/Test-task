import React, { useState, useEffect } from 'react';
import './Home.css';
import Contacts from '../../Contacts/Contacts';
import Notiflix from 'notiflix';
import { fetchContacts, addContact, deleteContact } from '../../Api';

Notiflix.Notify.init({
    width: '280px',
    position: 'right-top',
    distance: '10px',
    timeout: 3000,
    fontSize: '14px',
    cssAnimation: true,
  });
  
  const Home = () => {
    const [userContact, setUserContact] = useState({
      firstName: '',
      lastName: '',
      email: '',
    });
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)
  
    useEffect(() => {
    setLoading(true)
      fetchContacts()
        .then(data => setContacts(data))
        .catch(error => {
          setError('Failed to fetch contacts');
          Notiflix.Notify.failure('Failed to fetch contacts');
        })
        .finally(() => setLoading(false))
    }, []);
  
    const handleChange = (e) => {
      const { id, value } = e.target;
      setUserContact(prevContact => ({
        ...prevContact,
        [id]: value
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (userContact.firstName || userContact.lastName) {
        if (userContact.email && !/\S+@\S+\.\S+/.test(userContact.email)) {
          setError('Invalid email format');
          Notiflix.Notify.warning('Invalid email format');
          return;
        }
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
  
        addContact(newContact)
          .then(data => {
            setContacts(prevContacts => [data, ...prevContacts]);
            setUserContact({ firstName: '', lastName: '', email: '' });
            setError(null);
            Notiflix.Notify.success('Contact added successfully');
          })
          .catch(error => {
            setError('Failed to add contact: ' + error.message);
            Notiflix.Notify.failure('Failed to add contact');
          });
      } else {
        setError('Either first name or last name is required');
        Notiflix.Notify.warning('Either first name or last name is required');
      }
    };
  
    const handleDelete = (id) => {
      deleteContact(id)
        .then(() => {
          setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
          Notiflix.Notify.success('Contact deleted successfully');
        })
        .catch(error => {
          setError('Failed to delete contact');
          Notiflix.Notify.failure('Failed to delete contact');
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
        {loading ? (
          <div>Loading...</div>
        ) : contacts.length > 0 ? (
          <div className='bgBlock'>
            <ul className='contactList'>
              <Contacts contacts={contacts} deleteContact={handleDelete} />
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