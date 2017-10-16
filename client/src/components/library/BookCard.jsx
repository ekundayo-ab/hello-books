import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) =>
  (
    <div className="book col s12 m3 l3">
      <div className="card">
        <div className="card-image waves-block waves-light">
          <img className="activator responsive-img" src={book.image} alt="book cover" />
        </div>
        <div className="card-content">
          <span className="card-title activator grey-text text-darken-4">{book.title}</span>
          <span>{book.author}</span>
          <p><Link to={`/shelf/${book.id}`} className="btn">Borrow Now</Link></p>
        </div>
      </div>
    </div>
  );


BookCard.propTypes = {
  book: PropTypes.object.isRequired,
};

export default BookCard;

