import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { fetchAllBorrowedBooks } from '../../actions/borrowActions';

/**
 * @description represents History Page
 * @class History
 * @extends {Component}
 */
class History extends Component {
  /**
   * @description Invoked before History Page loads
   * @param {void} null
   * @returns {void} null
   * @memberof History
   */
  componentWillMount() {
    const userId = JSON.parse(localStorage.getItem('userDetails')).id;
    fetchAllBorrowedBooks(userId);
  }

  /**
   * @description Displays the History Page
   * @param {void} null
   * @returns {string} - HTML markup of the History Page
   * @memberof History
   */
  render() {
    const noBorrowHistory = (
      <p>You have not borrowed any book!</p>
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
            <div className="col s12 m12 l3">
              <div className="row">
                <form action="" className="search-form">
                  <input
                    className="col s9 white-text validate"
                    placeholder="Search.."
                    type="tel"
                  />
                  <button
                    type="submit"
                    className="btn col s3"
                  ><i className="fa fa-search" /></button>
                </form>

                <div className="card-panel white col s12">
                  <h6 className="teal-text">SELECT A CATEGORY</h6>
                  <div className="collection">
                    <a href="#!" className="collection-item">
                      <span className="new badge">14</span>Finance</a>
                    <a href="#!" className="collection-item">
                      <span className="new badge">311</span>Science</a>
                    <a href="#!" className="collection-item">
                      <span className="new badge">24</span>Computers</a>
                    <a href="#!" className="collection-item">
                      <span className="new badge">32</span>Arts</a>
                    <a href="#!" className="collection-item">
                      <span className="new badge">30</span>History</a>
                    <a href="#!" className="collection-item">
                      <span className="new badge">10</span>Animal</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col s12 m12 l9">
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
              {this.props.books.length > 0 &&
              <ul className="pagination center-align">
                <li className="disabled"><a href="#!">
                  <i className="material-icons">chevron_left</i></a></li>
                <li className="active"><a href="#!">1</a></li>
                <li className="waves-effect"><a href="#!">2</a></li>
                <li className="waves-effect"><a href="#!">3</a></li>
                <li className="waves-effect"><a href="#!">4</a></li>
                <li className="waves-effect"><a href="#!">5</a></li>
                <li className="waves-effect"><a href="#!">
                  <i className="material-icons">chevron_right</i></a></li>
              </ul>}
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
};

/**
 *
 * @description maps the state in redux store to Shelf props
 * @param {object} state
 * @returns {object} userId and books
 */
function mapStateToProps(state) {
  return {
    userId: state.users.user.id,
    books: state.borrows,
  };
}

export default connect(mapStateToProps, { fetchAllBorrowedBooks })(History);
