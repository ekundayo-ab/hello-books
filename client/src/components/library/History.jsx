import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { fetchAllBorrowedBooks } from '../../actions/borrowActions';
import paginate from '../../helpers/paginate';
import Paginator from '../../helpers/Paginator';

/**
 * @description represents History Page
 * @class History
 * @extends {Component}
 */
class History extends Component {
  /**
   * Creates an instance of Shelf.
   * @param {object} props
   * @memberof History
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      pageId: 1,
    };
    this.query = new URLSearchParams(this.props.history.location.search);
  }

  /**
   * @description Invoked before History Page loads
   * @param {void} null
   * @returns {void} null
   * @memberof History
   */
  componentDidMount() {
    const userId = JSON.parse(localStorage.getItem('userDetails')).id;
    paginate(this.props.fetchAllBorrowedBooks, this.query.get('page'), userId)
      .then((res) => {
        this.setState({
          pages: res.pages,
          pageId: res.pageId
        });
      });
  }

  /**
   * @description Displays the History Page
   * @param {void} null
   * @returns {string} - HTML markup of the History Page
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
              {this.props.books.length > 0 ?
                <Paginator
                  pages={this.state.pages}
                  pageId={this.state.pageId.toString()}
                  redirect={this.props.history.push}
                  pageName={this.props.history.location.pathname}
                /> : ''
              }
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
 * @param {object} state
 * @returns {object} userId and books
 */
function mapStateToProps(state) {
  return {
    userId: state.users.user.id,
    books: state.borrowsReducer.borrows,
  };
}

export default connect(mapStateToProps, { fetchAllBorrowedBooks })(History);
