import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TitleManager = () => {
  const [title, setTitle] = useState('');
  const [titles, setTitles] = useState([]);
  const [editId, setEditId] = useState(null); 

  const fetchTitles = async () => {
    try {
      const response = await axios.get('/api/titles');
      setTitles(response.data);
    } catch (error) {
      console.error('Error fetching titles:', error);
    }
  };

  useEffect(() => {
    fetchTitles();
  }, []);

  
  const addTitle = async () => {
    if (!title) return;

    const newTitle = { title }; 
    try {
      const response = await axios.post('/api/add', newTitle);
      console.log(response.data);
      
      fetchTitles();
      setTitle('');
    } catch (error) {
      console.error('Error adding title:', error);
    }
  };

  
  const updateTitle = async () => {
    if (!title || editId === null) return;

    const updatedTitle = { title };

    try {
      const response = await axios.put(`/api/titles/${editId}`, updatedTitle);
      setTitles(
        titles.map((item) =>
          item.id === editId ? { ...item, title: response.data.title } : item
        )
      );
      fetchTitles();
      setTitle(''); 
      setEditId(null);
    } catch (error) {
      console.error('Error updating title:', error);
    }
  };

  
  const deleteTitle = async (id) => {
    try {
      await axios.delete(`/api/titles/${id}`);
      setTitles(titles.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting title:', error);
    }
  };

  return (
    <div className="container-fluid bg-dark text-center py-5">
      <div className="card mx-auto" style={{ maxWidth: '800px' }}>
        <div className="card-body">
          <h2 className="card-title mb-4">{editId ? 'Edit Title' : 'Add Title'}</h2>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button 
              onClick={editId ? updateTitle : addTitle}
              type="button" 
              className="btn btn-info ml-2"
            >
              {editId ? 'Update' : 'Add'}
            </button>
          </div>

          <h3 className="mt-5">Titles from DB</h3>
          <ul className="list-group">
            {titles.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                {item.title}
                <div>
                  <button 
                    onClick={() => {
                      setTitle(item.title);
                      setEditId(item.id);
                    }}
                    className="btn btn-warning btn-sm mr-2"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteTitle(item.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TitleManager;
