import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { getBorrowedNotReturned, returnBook }
  from '../../actions/borrowActions';
import dayo from '../../../public/images/dayo.png';

/**
 * @description represents Profile Page
 * @class Profile
 * @extends {Component}
 */
class Profile extends Component {
  /**
   * Creates an instance of Profile.
   * @param {object} props
   * @memberof Profile
   * @constructor
   */
  constructor(props) {
    super(props);
    this.handleBookReturn = this.handleBookReturn.bind(this);
    this.userId = JSON.parse(localStorage.getItem('userDetails')).id;
  }

  /**
   * @description Invoked after component has mounted
   * @param {void} null
   * @returns {void} returns nothing
   * @memberof Profile
   */
  componentDidMount() {
    getBorrowedNotReturned(this.userId);
  }

  /**
   * @description handles returning of Book
   * @param {number} bookId
   * @returns {void} nothing
   * @memberof Profile
   */
  handleBookReturn(bookId) {
    returnBook(this.userId, bookId);
  }

  /**
   * @description displays the Profile Page
   * @param {void} null
   * @returns {string} - HTML markup for Profile Page
   * @memberof Profile
   */
  render() {
    return (
      <div>
        <div className="row available-books">
          <h3 className="col s12">Profile</h3>

          <div className="row">
            <div className="col s12 m12 l3">
              <div className="col s12 card">
                <div className="card">
                  <div className="card-image">
                    <img src={dayo} alt="dayo" />
                  </div>
                  <div className="card-content">
                    <p>Ekundayo A. Abiona</p>
                    <small>Computer Programmer</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="col s12 m12 l9">
              <div className="card-panel row">
                <h4>Info & Details</h4>
                <p>Books borrowed details, Level Status and others.</p>
                <div className="row">
                  <div className="col s12 m4 l4">
                    <div className="center promo promo-example">
                      <i className="fa fa-flash fa-5x teal-text" />
                      <p className="promo-caption">Total Books Borrowed</p>
                      <p className="light center">50</p>
                    </div>
                  </div>
                  <div className="col s12 m4 l4">
                    <div className="center promo promo-example">
                      <i className="fa fa-users fa-5x teal-text" />
                      <p className="promo-caption">Level</p>
                      <p className="light center">Bronze</p>
                    </div>
                  </div>
                  <div className="col s12 m4 l4">
                    <div className="center promo promo-example">
                      <i className="fa fa-code fa-5x teal-text" />
                      <p className="promo-caption">Other Details</p>
                      <p className="light center">Surcharges not paid.</p>
                    </div>
                  </div>
                </div>
                <div className="center-align row">
                  <i className="fa fa-google fa-2x red-text" />
                  <i className="fa fa-facebook fa-2x indigo-text" />
                  <i className="fa fa-github fa-2x grey-text" />
                  <i className="fa fa-twitter fa-2x blue-text" />
                  <i className="fa fa-skype fa-2x cyan-text" />
                  <i className="fa fa-phone fa-2x dark-text" />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <h3 className="col s12">Unreturned Books</h3>
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
                  (<table className="responsive-table">
                    <thead>
                      <tr>
                        <th>S/N</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Date Borrowed</th>
                        <th>Return</th>
                      </tr>
                    </thead>

                    <tbody>
                      {this.props.books.map((bookNotReturned, index) =>
                        (<tr key={bookNotReturned.id}>
                          <td>{index + 1}</td>
                          <td className="return-image">
                            <img
                              src={bookNotReturned.book.image}
                              alt=""
                            /> </td>
                          <td>{bookNotReturned.book.title}</td>
                          <td>{bookNotReturned.book.author}</td>
                          <td>
                            {moment(bookNotReturned.book.createdAt)
                              .format('MMMM Do YYYY')}
                          </td>
                          <td>
                            <button
                              className="btn"
                              onClick={() => {
                                this.handleBookReturn(bookNotReturned.book.id);
                              }}
                            >
                              <i className="fa fa-2x fa-mail-forward" />
                              Return
                            </button>
                          </td>
                        </tr>),
                      )}
                    </tbody>
                  </table>) :
                  (<h5>All Clean!, You have no books to return</h5>)}
              </div>
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
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Tye checking for Profile Component
Profile.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
};

/**
 * @description maps the state in redux store to Profile props
 * @param {object} state
 * @returns {object} books
 */
function mapStateToProps(state) {
  return {
    books: state.borrows,
  };
}

export default connect(mapStateToProps, { getBorrowedNotReturned })(Profile);
