import React, { useState, useEffect } from 'react';
import AddBookForm from './components/AddBookForm';
import BookList from './components/BookList';

function App() {
  const [books, setBooks] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All'); // New state for status filter

  const handleAddBook = (newBookData) => {
    const bookWithId = { ...newBookData, id: nextId };
    setBooks([...books, bookWithId]);
    setNextId(nextId + 1);
    alert('Book added successfully!');
  };

  const handleUpdateBook = (id, updatedData) => {
    setBooks(books.map(book =>
      book.id === id ? { ...book, ...updatedData } : book
    ));
    alert('Book updated successfully!');
  };

  const handleDeleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
    alert('Book deleted successfully!');
  };

  // Filtered books based on search term and status
  const filteredBooks = books.filter(book => {
    const matchesSearchTerm = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || book.status === filterStatus;
    return matchesSearchTerm && matchesStatus;
  });

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Personal Reading List Manager</h1>
        <p>Your personal library, organized with ease.</p>
      </header>
      <main className="app-main-content">
        <AddBookForm onAddBook={handleAddBook} />

        <div className="filter-controls">
            <input
                type="text"
                placeholder="Search by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="status-filter-select"
            >
                <option value="All">All Statuses</option>
                <option value="To Read">To Read</option>
                <option value="Reading">Reading</option>
                <option value="Completed">Completed</option>
            </select>
        </div>

        <BookList
          books={filteredBooks} {/* Pass filtered books */}
          onUpdateBook={handleUpdateBook}
          onDeleteBook={handleDeleteBook}
        />
      </main>
    </div>
  );
}

export default App;
