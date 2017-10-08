import React from 'react';
import PropTypes from 'prop-types';
import Book from '../../library/admin/Book';

const BookList = ({ books }) => {
  const emptyMessage = (
    <p>No books have been added yet.</p>
  );

  const booksList = (
    <table className="responsive-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Image</th>
          <th>Title</th>
          <th>Author</th>
          <th className="action-data">Quantity</th>
          <th className="action-data">Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        { books.map(book => <Book book={book} key={book.id} />)}
      </tbody>
    </table>
  );

  return (
    <div>
      <div className="card-panel row">
        {books.length === 0 ? emptyMessage : booksList}
      </div>
      <ul className="pagination center-align">
        <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
        <li className="active"><a href="#!">1</a></li>
        <li className="waves-effect"><a href="#!">2</a></li>
        <li className="waves-effect"><a href="#!">3</a></li>
        <li className="waves-effect"><a href="#!">4</a></li>
        <li className="waves-effect"><a href="#!">5</a></li>
        <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
      </ul>
    </div>
  );
};

BookList.propTypes = {
  books: PropTypes.array.isRequired,
};

export default BookList;

