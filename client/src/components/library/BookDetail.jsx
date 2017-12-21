import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { fetchBook } from '../../actions/bookActions';
import { borrowBook, fetchBorrowedBook } from '../../actions/borrowActions';

/**
 * @description represents BookDetail Page
 *
 * @class BookDetail
 *
 * @extends {Component}
 */
export class BookDetail extends Component {
  /**
   * Creates an instance of BookDetail.
   *
   * @param {object} props
   *
   * @memberof BookDetail
   *
   * @constructor
   */
  constructor(props) {
    super(props);
    this.handleBorrowClick = this.handleBorrowClick.bind(this);
  }

  /**
   * @description Invoked after component has mounted
   *
   * @param {void} null
   *
   * @returns {void} returns nothing
   *
   * @memberof BookDetail
   */
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchBook(id);
    this.props.fetchBorrowedBook(this.props.match.params.id);
  }

  /**
   * @description handles borrowing of book
   *
   * @param {void} null
   *
   * @returns {void} nothing
   *
   * @memberof BookDetail
   */
  handleBorrowClick() {
    this.props.borrowBook(
      this.props.user.id,
      { bookId: this.props.book.id },
      this.props.user.username
    );
  }

  /**
   * @description Displays the page showing the book details
   *
   * @param {void} null
   *
   * @returns {string} - HTML markup of BookDetail Page
   *
   * @memberof BookDetail
   */
  render() {
    const detailStyle = {
      p: {
        display: 'block',
        padding: '5px !important',
      },
      bq: {
        borderLeft: '5px solid green',
      },
    };

    const dateCreated = new Date(this.props.book.createdAt);
    return (
      <div>
        <div className="nav-bottom" />
        <div className="row available-books">
          <div className="container">
            <h3 className="col s12">Book Detail</h3>
            <div className="row">
              <div className="book-detail col s12 m6 l4">
                <img
                  className="detail responsive-img"
                  src={this.props.book.image}
                  alt=""
                />
              </div>
              <div className="col white-text s12 m6 l6">
                <h1>{this.props.book.title} </h1>
                <h6
                  className="text-white"
                ><b>Category: </b>{this.props.book.categoryName &&
                  this.props.book.categoryName}</h6>
                <h5 className="teal-text">{this.props.book.author}</h5>
                <p>{this.props.book.description}</p>
                <p
                  className={classnames('book-count', 'badge', 'white',
                    { 'red-text': this.props.book.quantity === 0,
                      'green-text': this.props.book.quantity > 0 })}
                  style={detailStyle.p}
                >
                  <b>
                    {this.props.book.quantity > 0 ?
                      'Available' : 'Not Available'}
                  </b>
                  <b> {this.props.book.quantity}</b>
                </p>
                <button
                  onClick={this.handleBorrowClick}
                  disabled={Object.keys(this.props.borrow).length > 0
                    ? 'disabled' : ''}
                  className="btn green"
                >Borrow
                </button> {Object.keys(this.props.borrow).length > 0
                  && <small className="borrow-notify">
                  You borrowed this book, please return
                  </small>}
                <blockquote
                  style={detailStyle.bq}
                >Added on {dateCreated.toUTCString()}</blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Type checking for BookDetail Component
BookDetail.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string
  }).isRequired,
  book: PropTypes.shape({
    id: PropTypes.number,
    isbn: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    description: PropTypes.string,
    quantity: PropTypes.number,
    category: PropTypes.string,
    categoryName: PropTypes.String,
    image: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
    id: PropTypes.number,
  }).isRequired,
  borrow: PropTypes.shape({
    id: PropTypes.number,
    isbn: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    status: PropTypes.bool,
    quantity: PropTypes.number,
    category: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string
  }).isRequired,
  fetchBook: PropTypes.func.isRequired,
  borrowBook: PropTypes.func.isRequired,
  fetchBorrowedBook: PropTypes.func.isRequired
};

/**
 * @description maps the state in redux store to BookDetail props
 *
 * @param {object} state
 *
 * @returns {object} book, borrow, user
 */
export function mapStateToProps(state) {
  return {
    book: state.bookReducer.book,
    borrow: state.borrowReducer.borrow,
    user: state.users.user,
  };
}

export default connect(mapStateToProps, {
  fetchBook,
  borrowBook,
  fetchBorrowedBook
})(BookDetail);
