import React, { useState } from 'react';
import AddBookForm from './components/AddBookForm';
import BookList from './components/BookList';

function App() {
  const [books, setBooks] = useState([]);
  const [nextId, setNextId] = useState(1); // Simple ID generator for now

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

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Personal Reading List Manager</h1>
        <p>Your personal library, organized with ease.</p>
      </header>
      <main className="app-main-content">
        <AddBookForm onAddBook={handleAddBook} />
        <BookList
          books={books}
          onUpdateBook={handleUpdateBook}
          onDeleteBook={handleDeleteBook}
        />
      </main>
    </div>
  );
}

export default App;
