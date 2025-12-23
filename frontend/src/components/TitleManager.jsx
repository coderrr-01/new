import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddPage from './AddPage.jsx';

function TitleManager() {
  const [titles, setTitles] = useState([]);
  const [title, setTitle] = useState('');
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: '' });



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
  // ---------- Toast helper ----------
  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  };

  // ---------- Filter titles safely ----------
  const filteredTitles = titles.filter((item) =>
    (item.title || '').toLowerCase().includes(search.toLowerCase())
  );

  // ---------- Delete function ----------
  const deleteTitle = async (id) => {
    if (!window.confirm('Are you sure you want to delete this title?')) return;

    try {
      await axios.delete(`/api/titles/${id}`);
      // Update state after deletion
      setTitles((prev) => prev.filter((item) => item.id !== id));
      showToast('Title deleted successfully', 'danger');
    } catch (error) {
      console.error('Error deleting title:', error);
      showToast('Failed to delete title', 'danger');
    }
  };

  return (
    <div className="bg-dark min-vh-100 d-flex align-items-center">
      <div className="container">

        {/* -------- Card -------- */}
        <div className="card app-card mx-auto p-4">
          <AddPage
            fetchTitles={fetchTitles}
            showToast={showToast}
            editId={editId}
            existingTitle={title}
            setEditId={setEditId}
          />


          {/* -------- Search -------- */}
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search titles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* -------- Titles List -------- */}
          <ul className="list-group">
            {filteredTitles.length > 0 ? (
              filteredTitles.map((item, index) => (
                <li
                  key={item.id}
                  className={`list-group-item d-flex justify-content-between align-items-center ${editId === item.id ? 'list-group-item-warning' : ''
                    }`}
                >
                  <div className="d-flex align-items-center">
                    <span className="me-3 fw-bold">{index + 1}</span>
                    <span>{item.title}</span>
                  </div>

                  <div className="btn-group btn-group-sm">
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => {
                        setTitle(item.title || '');
                        setEditId(item.id);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-outline-danger"
                      onClick={() => deleteTitle(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="list-group-item text-center">No titles found</li>
            )}
          </ul>
        </div>
        {toast.show && (
          <div className="toast-container position-fixed bottom-0 end-0 p-3">
            <div className={`toast show text-bg-${toast.type}`}>
              <div className="toast-body">{toast.message}</div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default TitleManager;