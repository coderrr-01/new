import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

function Add({ fetchTitles, showToast, editId, existingTitle, setEditId }) {
  const [title, setTitle] = useState('');
  const [show, setShow] = useState(false);
  const inputRef = useRef(null);

  // Open modal for ADD
  const openAddModal = () => {
    setEditId(null);
    setTitle('');
    setShow(true);
  };

  // Close modal (reset everything)
  const closeModal = () => {
    setShow(false);
    setEditId(null);
    setTitle('');
  };

  // Open modal automatically when EDIT is triggered
  useEffect(() => {
    if (editId) {
      setTitle(existingTitle);
      setShow(true);
    }
  }, [editId, existingTitle]);

  // Auto focus input
  useEffect(() => {
    if (show && inputRef.current) {
      inputRef.current.focus();
    }
  }, [show]);

  // Add title
  const addTitle = async () => {
    if (!title.trim()) return;

    try {
      await axios.post('/api/add', { title: title.trim() });
      fetchTitles();
      showToast('Title added successfully', 'success');
      closeModal();
    } catch (err) {
      showToast('Failed to add title', 'danger');
    }
  };

  // Update title
  const updateTitle = async () => {
    if (!title.trim() || !editId) return;

    try {
      await axios.put(`/api/titles/${editId}`, { title: title.trim() });
      fetchTitles();
      showToast('Title updated successfully', 'warning');
      closeModal();
    } catch (err) {
      showToast('Failed to update title', 'danger');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editId ? updateTitle() : addTitle();
  };

  return (
    <>
      {/* ADD BUTTON ONLY */}
      <Button variant="primary" className="mb-3" onClick={openAddModal}>
        Add Title
      </Button>

      {/* MODAL */}
      <Modal show={show} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? 'Edit Title' : 'Add Title'}</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                ref={inputRef}
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editId ? 'Update' : 'Add'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default Add;
