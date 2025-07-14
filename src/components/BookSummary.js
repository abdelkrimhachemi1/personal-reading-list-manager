import React from 'react';

function BookSummary({ books }) {
  // Calculate the counts for each status
  const summary = books.reduce((acc, book) => {
    acc[book.status] = (acc[book.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="summary-container">
      <h2>Reading Summary</h2>
      <div className="summary-cards">
        <div className="summary-card status-to-read-card">
          <p className="summary-count">{summary['To Read'] || 0}</p>
          <p className="summary-label">To Read</p>
        </div>
        <div className="summary-card status-reading-card">
          <p className="summary-count">{summary['Reading'] || 0}</p>
          <p className="summary-label">Reading</p>
        </div>
        <div className="summary-card status-completed-card">
          <p className="summary-count">{summary['Completed'] || 0}</p>
          <p className="summary-label">Completed</p>
        </div>
      </div>
    </div>
  );
}

export default BookSummary;
