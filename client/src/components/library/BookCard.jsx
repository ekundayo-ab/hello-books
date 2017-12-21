import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * @description Abstracts each book into a functional component
 *
 * @param {object} book
 *
 * @returns {string} HTML markup of BookCard component
 */
const BookCard = ({ book }) =>
  (
    <div className="book col s12 m4 l3">
      <div className="card medium">
        <div className="card-image waves-block waves-light">
          <img
            className="activator responsive-img"
            src={book.image}
            alt="book cover"
          />
        </div>
        <div className="shelf-book card-content">
          <p
            className="card-title activator grey-text text-darken-4"
          >{book.title}
          </p>
          <p>{book.author}</p>
          <Link
            id={`book${book.id}`}
            to={`/shelf/${book.id}`}
            className="btn borrow-now-btn"
          >Borrow Now</Link>
        </div>
      </div>
    </div>
  );

// Type checking for BookCard component
BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    description: PropTypes.string,
    quantity: PropTypes.number,
    category: PropTypes.string,
    image: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
};

export default BookCard;

