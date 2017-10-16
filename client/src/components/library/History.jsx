/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { fetchAllBorrowedBooks } from '../../actions/borrowActions';

class Shelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  componentDidMount() {
    const userId = JSON.parse(localStorage.getItem('userDetails')).id;
    fetchAllBorrowedBooks(userId);
  }

  render() {
    const noBorrowHistory = (
      <p>You have not borrowed any book!</p>
    );
    const historySingle = this.props.books.map(borrowedBook =>
      (<tr key={borrowedBook.id}>
        <td className="teal-text">{borrowedBook.id}</td>
        <td className="green-text">
          <i
            className={classnames('fa', { 'fa-close red-text': !borrowedBook.returned, 'fa-check green-text': borrowedBook.returned })}
          /> {!borrowedBook.returned && <span className="red-text">Not Returned</span>}
          {borrowedBook.returned && <span className="green-text">Returned</span>}
        </td>
        <td>{borrowedBook.book.title}</td>
        <td>{borrowedBook.book.author}</td>
        <td>{(moment(borrowedBook.book.createdAt).format('MMMM Do YYYY, h:mm a'))}</td>
        <td>
          <b>{borrowedBook.returned && (moment(borrowedBook.book.updatedAt).format('MMMM Do YYYY, h:mm a'))}</b>
          <b>{!borrowedBook.returned && 'Not Yet'}</b>
        </td>
      </tr>),
    );
    console.log(this.props.books.length);
    return (
      <div>
        <div className="nav-bottom" />
        <div className="row available-books">
          <h3 className="col s12">Borrowing History</h3>
          <div className="row">
            <div className="col s12 m12 l3">
              <div className="row">
                <form action="" className="search-form">
                  <input className="col s9 white-text validate" placeholder="Search.." type="tel" />
                  <button type="submit" className="btn col s3"><i className="fa fa-search" /></button>
                </form>

                <div className="card-panel white col s12">
                  <h6 className="teal-text">SELECT A CATEGORY</h6>
                  <div className="collection">
                    <a href="#!" className="collection-item"><span className="new badge">14</span>Finance</a>
                    <a href="#!" className="collection-item"><span className="new badge">311</span>Science</a>
                    <a href="#!" className="collection-item"><span className="new badge">24</span>Computers</a>
                    <a href="#!" className="collection-item"><span className="new badge">32</span>Arts</a>
                    <a href="#!" className="collection-item"><span className="new badge">30</span>History</a>
                    <a href="#!" className="collection-item"><span className="new badge">10</span>Animal</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col s12 m12 l9">
              <div className="card-panel row">
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
                    { this.props.books.length > 0 ? historySingle : noBorrowHistory }
                  </tbody>
                </table>
              </div>
              {this.props.books.length > 0 &&
              <ul className="pagination center-align">
                <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
                <li className="active"><a href="#!">1</a></li>
                <li className="waves-effect"><a href="#!">2</a></li>
                <li className="waves-effect"><a href="#!">3</a></li>
                <li className="waves-effect"><a href="#!">4</a></li>
                <li className="waves-effect"><a href="#!">5</a></li>
                <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
              </ul>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Shelf.propTypes = {
  books: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    userId: state.users.user.id,
    books: state.borrows,
  };
}

export default connect(mapStateToProps, { fetchAllBorrowedBooks })(Shelf);
