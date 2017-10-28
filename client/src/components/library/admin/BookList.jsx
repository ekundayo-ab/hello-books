import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-materialize';
import UpdateBookModal from '../../library/admin/UpdateBookModal';

const BookList = (props) => {
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
        {props.books.map((book, index) =>
          (
            <tr key={book.id}>
              <td className="teal-text">{ index + 1}</td>
              <td className="green-text admin-book-list"><img src={book.image} alt="" /></td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.quantity}</td>
              <td>
                <Modal
                  header="Update Book"
                  trigger={<button className="btn white waves-effect waves-light"><i className="fa fa-edit green-text" /></button>}
                >
                  <UpdateBookModal book={book} />
                </Modal>
              </td>
              <td>
                <a
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

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  // handleDelete: PropTypes.func.isRequired,
};

export default BookList;
