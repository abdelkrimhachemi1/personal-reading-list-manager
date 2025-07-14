import React, { useState } from 'react';

function BookList({ books, onUpdateBook, onDeleteBook }) {
  const [editingBookId, setEditingBookId] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const [editNotes, setEditNotes] = useState('');

  const handleEditClick = (book) => {
    setEditingBookId(book.id);
    setEditStatus(book.status);
    setEditNotes(book.notes || '');
  };

  const handleSaveEdit = (book) => {
    onUpdateBook(book.id, { status: editStatus, notes: editNotes });
    setEditingBookId(null);
    setEditStatus('');
    setEditNotes('');
  };

  const handleCancelEdit = () => {
    setEditingBookId(null);
    setEditStatus('');
    setEditNotes('');
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'To Read': return 'status-to-read';
      case 'Reading': return 'status-reading';
      case 'Completed': return 'status-completed';
      default: return '';
    }
  };

  return (
    <div className="book-list-container">
      <h2>My Reading List</h2>
      {books.length === 0 ? (
        <p className="empty-list-message">No books in your list yet. Add one using the form above!</p>
      ) : (
        <div className="table-responsive">
            <table>
            <thead>
                <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Date Added</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book) => (
                <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>
                    {editingBookId === book.id ? (
                        <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                        className="status-select"
                        >
                        <option value="To Read">To Read</option>
                        <option value="Reading">Reading</option>
                        <option value="Completed">Completed</option>
                        </select>
                    ) : (
                        <span className={`status-label ${getStatusClass(book.status)}`}>
                        {book.status}
                        </span>
                    )}
                    </td>
                    <td>
                    {editingBookId === book.id ? (
                        <textarea
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                        rows="2"
                        className="notes-textarea"
                        ></textarea>
                    ) : (
                        book.notes || <span className="no-notes">No notes</span>
                    )}
                    </td>
                    <td>{new Date(book.dateAdded).toLocaleDateString()}</td>
                    <td className="actions-cell">
                    {editingBookId === book.id ? (
                        <>
                        <button onClick={() => handleSaveEdit(book)} className="action-button save-button">Save</button>
                        <button onClick={handleCancelEdit} className="action-button cancel-button">Cancel</button>
                        </>
                    ) : (
                        <>
                        <button onClick={() => handleEditClick(book)} className="action-button edit-button">Edit</button>
                        <button onClick={() => {
                            if (window.confirm('Are you sure you want to delete this book?')) {
                                onDeleteBook(book.id);
                            }
                        }} className="action-button delete-button">Delete</button>
                        </>
                    )}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      )}
    </div>
  );
}

export default BookList;
