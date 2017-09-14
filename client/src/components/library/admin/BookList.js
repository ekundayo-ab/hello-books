import React from 'react';
import PropTypes from 'prop-types';

const BookList = ({ books }) => {
  const emptyMessage = (
    <p>No books have been added yet.</p>
  );

  const booksList = (
    <p>Books List</p>
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

