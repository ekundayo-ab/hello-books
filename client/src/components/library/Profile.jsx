import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { getBorrowedNotReturned, returnBook }
  from '../../actions/borrowActions';
import paginate from './../../helpers/paginate';
import Paginator from './../../helpers/Paginator';
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
    this.state = {
      pages: [],
      pageId: 1,
    };
    this.query = new URLSearchParams(this.props.location.search);
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
    paginate(
      this.props.getBorrowedNotReturned,
      this.query.get('page'),
      this.userId
    )
      .then((res) => {
        this.setState({
          pages: res.pages,
          pageId: res.pageId
        });
      });
  }

  /**
   * @description handles returning of Book
   * @param {number} bookId
   * @param {number} borrowId
   * @returns {object} action
   * @memberof Profile
   */
  handleBookReturn(bookId, borrowId) {
    returnBook(this.userId, bookId, borrowId)
      .then(() =>
        paginate(
          this.props.getBorrowedNotReturned,
          this.query.get('page'),
          this.userId
        )
          .then((res) => {
            this.setState({
              pages: res.pages,
              pageId: res.pageId
            });
          }));
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
            <div className="col s12 m12 l12">
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
                            {moment(bookNotReturned.createdAt)
                              .format('MMMM Do YYYY, h:mm a')}
                          </td>
                          <td>
                            <button
                              className="btn"
                              onClick={() => {
                                this.handleBookReturn(
                                  bookNotReturned.book.id,
                                  bookNotReturned.id
                                );
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
              {this.state.pages.length > 1 ?
                <Paginator
                  pages={this.state.pages}
                  pageId={this.state.pageId.toString()}
                  redirect={this.props.history.push}
                  pageName={this.props.location.pathname}
                /> : ''
              }
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
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string
  }).isRequired,
  getBorrowedNotReturned: PropTypes.func.isRequired
};

/**
 * @description maps the state in redux store to Profile props
 * @param {object} state
 * @returns {object} books
 */
function mapStateToProps(state) {
  return {
    books: state.borrowsReducer.borrows,
  };
}

export default connect(mapStateToProps, { getBorrowedNotReturned })(Profile);
