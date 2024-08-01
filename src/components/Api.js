const API_BASE_URL = '/api/v1'; 

const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn',
};

export const fetchContacts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/contacts`, { method: 'GET', headers });
    if (!response.ok) throw new Error(`Failed to fetch contacts: ${response.status} ${response.statusText}`);
    const data = await response.json();
    return data.resources || [];
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};

export const addContact = async (contact) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers,
      body: JSON.stringify(contact),
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Error adding contact: ${text}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding contact:', error);
    throw error;
  }
};

export const deleteContact = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact/${id}`, {
      method: 'DELETE',
      headers,
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Error deleting contact: ${text}`);
    }
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error;
  }
};

export const fetchUserDetails = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact/${id}`, {
        method: 'GET',
        headers,
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error('Error fetching user details: ' + errorText);
      }
      const data = await response.json();
      return data.resources || [];
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  export const updateTags = async (id, tags) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact/${id}/tags`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ tags }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error('Помилка при оновленні тегів: ' + errorText);
      }
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };