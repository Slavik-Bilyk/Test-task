import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Notiflix from 'notiflix';
import { fetchUserDetails, updateTags } from '../../Api'
import avatar from '../../Contacts/avatar.svg'
import './UserPage.css'

const UserPage = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [newTag, setNewTag] = useState('')
  const [tags, setTags] = useState([])

  useEffect(() => {
    setLoading(true);
    fetchUserDetails(id)
      .then(data => {
        console.log('Fetched user details:', data); 
        if (Array.isArray(data) && data.length > 0) {
          const userData = data[0];
          setUser(userData);
          setTags(userData.tags || []); 
        } else {
          setError('Користувача не знайдено');
          Notiflix.Notify.failure('Користувача не знайдено');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Помилка при отриманні деталей користувача:', error);
        setError('Не вдалося отримати деталі користувача');
        Notiflix.Notify.failure('Не вдалося отримати деталі користувача');
        setLoading(false);
      });
  }, [id]);

  const handleAddTag = () => {
    if (!newTag) {
      Notiflix.Notify.warning('Тег не може бути порожнім');
      return;
    }

    // Додати новий тег
    updateTags(id, [...tags, newTag])
      .then(() => {
        setTags([...tags, newTag]);
        setNewTag('');
        Notiflix.Notify.success('Тег успішно додано');
      })
      .catch(error => {
        console.error('Помилка при додаванні тега:', error);
        Notiflix.Notify.failure('Не вдалося додати тег');
      });
  }

  if (loading) return <div>Завантаження...</div>
  if (error) return <div>{error}</div>

  return (
    <div className='userPage'>
      {user ? (
        <div className='userDetails'>
          <div className='userBlock'>
            <img src={user.avatar || avatar} alt="Avatar" className='userImg' />
            <h1 className='title'>
              {user.fields?.['first name']?.[0]?.value || 'Без імені'} {user.fields?.['last name']?.[0]?.value || 'Без прізвища'}
            </h1>
            <p className='description'>
              {user.fields?.['email']?.[0]?.value || 'Без електронної пошти'}
            </p>
            <h2>Теги</h2>
            <div className='tagsList'>
              {tags.length > 0 ? (
                <ul>
                  {tags.map((tag, index) => <li key={index}>{tag}</li>)}
                </ul>
              ) : (
                <p>Немає тегів</p>
              )}
            </div>
            <div className='inputContainer'>
              <input 
                type='text' 
                id='newTag' 
                placeholder='Додати новий тег' 
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
              />
              <button type='button' onClick={handleAddTag}>Додати тег</button>
            </div>
          </div>
        </div>
      ) : (
        <div>Користувача не знайдено</div>
      )}
    </div>
  )
}

export default UserPage
