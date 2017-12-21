import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { fetchAllBorrowedBooks } from '../../actions/borrowActions';
import Paginator from '../../helpers/Paginator';

/**
 * @description represents History Page
 *
 * @class History
 *
 * @extends {Component}
 */
export class History extends Component {
  /**
   * Creates an instance of Shelf.
   *
   * @param {object} props
   *
   * @memberof History
   *
   * @constructor
   */
  constructor(props) {
    super(props);
    this.userId = JSON.parse(localStorage.getItem('userDetails')).id;
  }

  /**
   * @description Displays the History Page
   *
   * @param {void} null
   *
   * @returns {string} - HTML markup of the History Page
   *
   * @memberof History
   */
  render() {
    const noBorrowHistory = (
      <h5>You have not borrowed any book(s)!</h5>
    );
    const historySingle = this.props.books.map((borrowedBook, index) =>
      (<tr key={borrowedBook.id}>
        <td className="teal-text">{index + 1}</td>
        <td className="green-text">
          <i
            className={classnames('fa',
              { 'fa-close red-text': !borrowedBook.returned,
                'fa-check green-text': borrowedBook.returned })}
          /> {!borrowedBook.returned
            && <span className="red-text">Not Returned</span>}
          {borrowedBook.returned
            && <span className="green-text">Returned</span>}
        </td>
        <td>{borrowedBook.book.title}</td>
        <td>{borrowedBook.book.author}</td>
        <td>{(moment(borrowedBook.createdAt)
          .format('MMMM Do YYYY, h:mm a'))}</td>
        <td>
          <b>{borrowedBook.returned
            && (moment(borrowedBook.updatedAt)
              .format('MMMM Do YYYY, h:mm a'))}</b>
          <b>{!borrowedBook.returned && 'Not Yet'}</b>
        </td>
      </tr>),
    );
    return (
      <div>
        <div className="nav-bottom" />
        <div className="row available-books">
          <h3 className="col s12">Borrowing History</h3>
          <div className="row">
            <div className="col s12 m12 l12">
              <div className="card-panel row">
                {this.props.books.length > 0 ?
                  <table className="responsive-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Status</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Borrowed</th>
                        <th>Returned</th>
                      </tr>
                    </thead>
                    <tbody>
                      { historySingle }
                    </tbody>
                  </table> : noBorrowHistory }
              </div>
              <Paginator
                fetchData={this.props.fetchAllBorrowedBooks}
                redirect={this.props.history}
                pageName={this.props.history.location.pathname}
                userId={this.userId}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Type checking for History component
History.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchAllBorrowedBooks: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired
  }).isRequired,
};

/**
 *
 * @description maps the state in redux store to Shelf props
 *
 * @param {object} state
 *
 * @returns {object} userId and books
 */
export function mapStateToProps(state) {
  return {
    userId: state.users.user.id,
    books: state.borrowsReducer.borrows,
  };
}

export default connect(mapStateToProps, { fetchAllBorrowedBooks })(History);
