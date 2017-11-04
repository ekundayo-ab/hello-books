import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-materialize';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import BookForm from './BookForm';
import CategoryForm from './CategoryForm';
import CategoryList from './../category/CategoryList';
import BookList from './BookList';
import { fetchBooks, deleteBook } from './../../../actions/bookActions';
import { fetchCategories } from './../../../actions/categoryActions';

/**
 * @description represents admin dashboard of the library
 * @class Admin
 * @extends {Component}
 */
class Admin extends Component {
  /**
   * Creates an instance of Admin.
   * @param {object} props
   * @memberof Admin
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      pageId: 1,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.query = new URLSearchParams(this.props.history.location.search);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  /**
   * @description Invoked before page loads
   * @param {void} null
   * @returns {void} returns nothing
   * @memberof Admin
   */
  componentWillMount() {
    let pageId = this.query.get('page');
    if (pageId === null) pageId = 1;
    this.props.fetchBooks(pageId)
      .then((numberOfPages) => {
        const pages = Array.from(Array(numberOfPages)).map((e, i) => i + 1);
        this.setState({ pages, pageId });
      });
  }

  /**
   * @description Invoked after component has mounted
   * @param {void} null
   * @returns {void} returns nothing
   * @memberof Admin
   */
  componentDidMount() {
    this.props.fetchCategories();
    $(document).ready(() => {
      $('.modal').modal();
    });
  }

  /**
   * @description generates next page of books
   * @param {void} null
   * @returns {void} returns nothing
   * @memberof Admin
   */
  nextPage() {
    const nextPage = parseInt(this.state.pageId, 10) + 1;
    if (parseInt(this.state.pageId, 10) < this.state.pages.length) {
      this.props.history.push(`/admin?page=${nextPage}`);
    }
  }

  /**
   * @description generates previous page of books
   * @param {void} null
   * @returns {void} returns nothing
   * @memberof Admin
   */
  prevPage() {
    const prevPage = parseInt(this.state.pageId, 10) - 1;
    if (parseInt(this.state.pageId, 10) > 1) {
      this.props.history.push(`/admin?page=${prevPage}`);
    }
  }

  /**
   * @description deletes a book from the library
   * @param {number} bookId
   * @returns {function} action
   * @memberof Admin
   */
  handleDelete(bookId) {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this book!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal('Poof! Book successfully deleted', {
            icon: 'success',
          });
          const pageId = this.query.get('page');
          // if (pageId === null) pageId = 1;
          this.props.fetchBooks(pageId)
            .then((numberOfPages) => {
              const pages = Array.from(Array(numberOfPages))
                .map((e, i) => i + 1);
              this.setState({ pages, pageId });
            });
          return deleteBook(bookId);
        }
        return false;
      });
  }

  /**
   * @description displays the admin dashboard
   * @param {void} null
   * @returns {string} - HTML markup for the dashboard
   * @memberof Admin
   */
  render() {
    return (
      <div>
        <div className="nav-bottom" />
        <div className="row available-books">
          <h3 className="col s12">Admin Dashboard</h3>
          <div className="row">
            <div className="col s12 m12 l3">
              <div className="row">
                <CategoryList />
              </div>
            </div>
            <div className="col s12 m12 l9">
              <div className="center-align">
                <Modal
                  header="Add New Book"
                  trigger={<Button>ADD BOOK</Button>}
                >
                  <BookForm />
                </Modal>&nbsp;&nbsp;
                <Modal
                  header="Add New Category"
                  trigger={<Button>ADD CATEGORY</Button>}
                >
                  <CategoryForm />
                </Modal>
              </div>
              <BookList
                books={this.props.books}
                handleDelete={this.handleDelete}
              />
              {this.props.books.length > 0 ?
                (<ul className="pagination center-align">
                  <li>
                    <button
                      className={classnames('btn', { disabled:
                        parseInt(this.state.pageId, 10) <= 1 })}
                      onClick={this.prevPage}
                    >
                      <i className="material-icons">chevron_left</i>
                    </button>
                  </li>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  {
                    this.state.pages.map(page =>
                      (
                        <li
                          key={page}
                          className={classnames('waves-effect',
                            { active: this.state.pageId === String(page) })}
                        >
                          <Link to={`/admin?page=${page}`}>{page}</Link>
                        </li>
                      ),
                    )
                  }
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <li>
                    <button
                      onClick={this.nextPage}
                      className={classnames('btn', 'waves-effect',
                        { disabled: parseInt(this.state.pageId, 10) >=
                          this.state.pages.length })}
                    >
                      <i className="material-icons">chevron_right</i>
                    </button></li>
                </ul>) : ''}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Type checking for Admin component
Admin.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchBooks: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired
  }).isRequired,
};

/**
 * @description maps the state in redux store to Admin props
 * @param {object} state
 * @returns {object} book
 */
function mapStateToProps(state) {
  return {
    books: state.books,
  };
}

export default connect(mapStateToProps, { fetchBooks, fetchCategories })(Admin);
