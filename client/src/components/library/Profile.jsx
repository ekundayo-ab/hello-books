import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import classnames from 'classnames';
import Helper from '../../helpers/Helper';
import { changePassword } from '../../actions/authActions';
import { getBorrowedNotReturned, returnBook }
  from '../../actions/borrowActions';
import Validators from '../../helpers/Validators';
import paginate from './../../helpers/paginate';
import Paginator from './../../helpers/Paginator';
import SingleInput from './../forms/SingleInput';

/**
 * @description represents Profile Page
 *
 * @class Profile
 *
 * @extends {Component}
 */
export class Profile extends Component {
  /**
   * Creates an instance of Profile.
   *
   * @param {object} props
   *
   * @memberof Profile
   *
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      oldPass: '',
      newPass: '',
      newPassConfirm: '',
      errors: {},
      loading: null
    };
    this.query = (this.props.history.location.search).split('=')[1];
    this.handleBookReturn = this.handleBookReturn.bind(this);
    this.userId = JSON.parse(localStorage.getItem('userDetails')).id;
    this.username = JSON.parse(localStorage.getItem('userDetails')).username;
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * @description handles changes to the input fields value
   *
   * @param {object} event
   *
   * @returns {void} returns nothing
   *
   * @memberof Profile
   */
  onChange(event) {
    const categoryState = this.state;
    const changeResults = Helper.handleFormChange(categoryState, event);
    this.setState(changeResults);
  }

  /**
   * @description handles returning of Book
   *
   * @param {number} bookId
   * @param {number} borrowId
   * @param {object} borrow - specific borrowing record
   *
   * @returns {object} action
   *
   * @memberof Profile
   */
  handleBookReturn(bookId, borrowId, borrow) {
    this.setState({ loading: bookId });
    this.props.returnBook(this.userId, bookId, borrowId, this.username, borrow)
      .then(() =>
        this.props.paginate(
          this.props.getBorrowedNotReturned,
          this.query,
          this.userId
        ));
  }

  /**
 * @description handles returning of Book
 *
 * @param {number} event - form submission event
 *
 * @returns {object} action
 *
 * @memberof Profile
 */
  handleSubmit(event) {
    event.preventDefault();
    const { isValid, errors } = Validators.validatePassForm(this.state);
    this.setState({ errors });
    if (isValid) {
      changePassword(this.state);
      this.setState({
        oldPass: '',
        newPass: '',
        newPassConfirm: '',
      });
    }
  }

  /**
   * @description displays the Profile Page
   *
   * @param {void} null
   *
   * @returns {string} - HTML markup for Profile Page
   *
   * @memberof Profile
   */
  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="row available-books">
          <h3 className="col s12">Profile</h3>

          <div className="row">
            <div className="col s12 m12 l3">
              <div className="change-password-card col s12 card">
                <div className="card">
                  <div className="card-image">
                    <h5 className="center-align">Change Password</h5>
                    <form onSubmit={this.handleSubmit}>
                      <SingleInput
                        placeholder="Old Password"
                        identifier="oldPass"
                        inputName="oldPass"
                        inputType="password"
                        inputClass="validate"
                        controlFunc={this.onChange}
                        content={this.state.oldPass}
                        fieldError={errors.oldPass}
                      />
                      <SingleInput
                        placeholder="New Password"
                        identifier="newPass"
                        inputName="newPass"
                        inputType="password"
                        inputClass="validate"
                        controlFunc={this.onChange}
                        content={this.state.newPass}
                        fieldError={errors.newPass || errors.mismatch}
                      />
                      <SingleInput
                        placeholder="Confirm New Password"
                        identifier="newPassConfirm"
                        inputName="newPassConfirm"
                        inputType="password"
                        inputClass="validate"
                        controlFunc={this.onChange}
                        content={this.state.newPassConfirm}
                        fieldError={errors.newPassConfirm}
                      />
                      <div className="center-align col s12">
                        <button type="submit" className="btn waves-effect teal">
                          <i className="fa fa-send" /> Change Password
                        </button><br /><br />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="col s12 m12 l9">
              <div className="profile-card card-panel row">
                <h4>Info & Details</h4>
                <div className="row">
                  <div className="col s12 m4 l4">
                    <div className="center promo promo-example">
                      <i className="fa fa-flash fa-5x teal-text" />
                      <p className="promo-caption">Total Books Borrowed</p>
                      <p className="light center">
                        {this.props.user.totalBorrow}
                      </p>
                    </div>
                  </div>
                  <div className="col s12 m4 l4">
                    <div className="center promo promo-example">
                      <i className="fa fa-users fa-5x teal-text" />
                      <p className="promo-caption">Level</p>
                      <p className="light center">{this.props.user.level}</p>
                    </div>
                  </div>
                  <div className="col s12 m4 l4">
                    <div className="center promo promo-example">
                      <i className="fa fa-code fa-5x teal-text" />
                      <p className="promo-caption">Borrow Credit</p>
                      <p className="light center">
                        {this.props.user.borrowLimit}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <h3 className="col s12">Library Guide</h3>
            <div className="lg col s12 m4 l4">
              <div className="card small ">
                <h5>Default Membership Points</h5>
                <p><i className="fa fa-hand-o-right" />
                  &nbsp; Bronze - 2 Credit Points
                </p>
                <p><i className="fa fa-hand-o-right" />
                &nbsp; Silver - 3 Credit Points
                </p>
                <p><i className="fa fa-hand-o-right" />
                  &nbsp; Gold - 5 Credit Points
                </p>
              </div>
            </div>
            <div className="lg col s12 m4 l4">
              <div className="card small">
                <h5>Borrowing Modalities</h5>
                <p><i className="fa fa-hand-o-right" />
                &nbsp; Credit point deducted for every borrow
                </p>
                <p><i className="fa fa-hand-o-right" />
                &nbsp; Credit point added back after return
                </p>
                <p><i className="fa fa-hand-o-right" />
                  &nbsp; Inability to borrow on low (0) Credit point
                </p>
              </div>
            </div>
            <div className="lg col s12 m4 l4">
              <div className="card small">
                <h5> Membership Upgrade Eligibility </h5>
                <p><i className="fa fa-hand-o-right" />
                  &nbsp; Bronze to Silver - Minimum of 10 borrows
                </p>
                <p><i className="fa fa-hand-o-right" />
                &nbsp; Silver to Gold - Minimum of 20 borrows
                </p>
                <p><i className="fa fa-hand-o-right" />
                   &nbsp; Gold to Unlimited - Minimum of 30 borrows
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <h3 className="col s12">Unreturned Books</h3>
            <div className="col s12 m12 l12">
              <div className="card-panel">
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
                              id={`return-btn${index}`}
                              className={classnames('btn',
                                { disabled: this.state.loading ===
                                   bookNotReturned.book.id })}
                              onClick={() => {
                                this.handleBookReturn(
                                  bookNotReturned.book.id,
                                  bookNotReturned.id,
                                  bookNotReturned
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
              <Paginator
                fetchData={this.props.getBorrowedNotReturned}
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

// Type checking for Profile Component
Profile.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.shape({
    totalBorrow: PropTypes.number,
    borrowLimit: PropTypes.number,
    level: PropTypes.string
  }).isRequired,
  history: PropTypes.shape({
    location: PropTypes.object,
    push: PropTypes.func
  }).isRequired,
  getBorrowedNotReturned: PropTypes.func.isRequired,
  returnBook: PropTypes.func.isRequired,
  paginate: PropTypes.func.isRequired
};

/**
 * @description maps the state in redux store to Profile props
 *
 * @param {object} state
 *
 * @returns {object} books
 */
export function mapStateToProps(state) {
  return {
    user: state.users.user,
    books: state.returnsReducer.returns,
  };
}

export default connect(mapStateToProps, {
  paginate,
  getBorrowedNotReturned,
  returnBook,
})(Profile);
