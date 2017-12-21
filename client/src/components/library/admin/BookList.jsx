import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description displays list of books
 *
 * @param {object} props
 *
 * @returns {string} - HTML markup of CategoryList component
 *
 * @memberof BookList
 */
const BookList = (props) => {
  // message to display if no books
  const emptyMessage = (
    <p>No book(s) have been added to this shelf yet.</p>
  );

  // markup to render if books exist
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
        {props.books.map((book, index) =>
          (
            <tr key={book.id}>
              <td className="teal-text">{ index + 1}</td>
              <td className="green-text admin-book-list">
                <img src={book.image} alt="" /></td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.quantity}</td>
              <td>
                <button
                  id={`edit-btn${book.id}`}
                  className="btn white waves-effect waves-light"
                  onClick={() => props.handleEdit(book)}
                >
                  <i className="fa fa-edit green-text" />
                </button>
              </td>
              <td>
                <a
                  id={`delete-book-btn${book.id}`}
                  role="button"
                  tabIndex={0}
                  className="btn white waves-effect"
                  onClick={() => props.handleDelete(book.id)}
                >
                  <i className="fa fa-trash red-text" />
                </a>
              </td>
            </tr>
          ),
        )}
      </tbody>
    </table>
  );

  return (
    <div>
      <div className="card-panel row">
        {props.books.length === 0 ? emptyMessage : booksList}
      </div>
    </div>
  );
};

// Type checking for the BookList component
BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BookList;
