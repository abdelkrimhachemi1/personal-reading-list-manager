import React, { useState } from 'react';
import AddBookForm from './components/AddBookForm';

function App() {
  const [books, setBooks] = useState([]); // State to hold our books

  const handleAddBook = (newBook) => {
    setBooks([...books, newBook]);
    alert('Book added successfully!'); // Using alert as per coursework context
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Personal Reading List Manager</h1>
        <p>Your personal library, organized with ease.</p>
      </header>
      <main className="app-main-content">
        <AddBookForm onAddBook={handleAddBook} />
        {/* Book list will go here later */}
        <div className="book-list-placeholder">
          <h3>Your Reading List</h3>
          {books.length === 0 ? (
            <p>No books added yet. Add one using the form above!</p>
          ) : (
            <ul>
              {books.map((book, index) => (
                <li key={index}>{book.title} by {book.author} ({book.status})</li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
