import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description displays form for updating books
 * @param {object} props
 * @returns {string} - HTML markup of UpdateBookDetails component
 * @memberof BookList
 */
const UpdateBookDetails = (props) => {
  const dateCreated = new Date(props.book.createdAt);
  return (
    <div id="update-book-details" className="row">
      <div className="center-align book-detail col s12 m6 l4">
        <img
          className="center-align detail responsive-img"
          src={props.book.image}
          alt=""
        />
      </div>
      <div className="col s12 m6 l6">
        <h1>{props.book.title}</h1>
        <h5 className="teal-text">{props.book.author}</h5>
        <p>{props.book.description}</p>
        <p
          className="white-text badge green"
          style={{ display: 'block', padding: '5px !important' }}
        >
          <b>Total:</b> 28 <b>Borrowed:</b> 17 <b>Available:</b> 11
        </p>
        <blockquote
          style={{ borderLeft: '5px solid green' }}
        >Added on { dateCreated.toUTCString() }</blockquote>
      </div>
    </div>
  );
};

UpdateBookDetails.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number,
    isbn: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    description: PropTypes.string,
    quantity: PropTypes.number,
    category: PropTypes.string,
    image: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired
};

export default UpdateBookDetails;
