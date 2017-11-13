import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-materialize';
import swal from 'sweetalert';
import BookForm from './BookForm';
import CategoryForm from './CategoryForm';
import CategoryList from './../category/CategoryList';
import BookList from './BookList';
import { fetchBooks, deleteBook } from './../../../actions/bookActions';
import { fetchCategories } from './../../../actions/categoryActions';
import paginate from './../../../helpers/paginate';
import Paginator from './../../../helpers/Paginator';

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
    paginate(this.props.fetchBooks, this.query.get('page'))
      .then((res) => {
        this.setState({
          pages: res.pages,
          pageId: res.pageId
        });
      });
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
          const pageId = this.query.get('page');
          this.setState({ pageId });
          deleteBook(bookId)
            .then(() =>
              paginate(this.props.fetchBooks, this.query.get('page'))
                .then((res) => {
                  this.setState({
                    pages: res.pages,
                    pageId: res.pageId
                  });
                }));
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
    books: state.booksReducer.books,
  };
}

export default connect(mapStateToProps, {
  fetchBooks,
  fetchCategories,
  deleteBook
})(Admin);
