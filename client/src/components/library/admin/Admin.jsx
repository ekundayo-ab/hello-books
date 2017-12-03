import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-materialize';
import swal from 'sweetalert';
import BookForm from './BookForm';
import CategoryForm from './CategoryForm';
import CategoryList from './../category/CategoryList';
import BookList from './BookList';
import { fetchBooks, deleteBook, fetchBooksByCategory }
  from './../../../actions/bookActions';
import { fetchCategories } from './../../../actions/categoryActions';
import paginate from './../../../helpers/paginate';
import Paginator from './../../../helpers/Paginator';

/**
 * @description represents admin dashboard of the library
 * @class Admin
 * @extends {Component}
 */
export class Admin extends Component {
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
      showCategoryTitle: false,
      categoryTitle: ''
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.filterBooksByCategory = this.filterBooksByCategory.bind(this);
    this.query = (this.props.history.location.search).split('=')[1];
  }

  /**
   * @description Invoked before the component mounts
   * @param {void} null
   * @returns {void} returns nothing
   * @memberof Admin
   */
  componentWillMount() {
    const { role } = JSON.parse(localStorage.getItem('userDetails'));
    if (role === 'normal' || role === undefined) {
      this.props.history.push('/shelf');
    }
  }

  /**
   * @description Invoked after component has mounted
   * @param {void} null
   * @returns {void} returns nothing
   * @memberof Admin
   */
  componentDidMount() {
    this.props.fetchCategories();
    paginate(this.props.fetchBooks, this.query)
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
          this.props.deleteBook(bookId)
            .then(() =>
              paginate(this.props.fetchBooks, this.query)
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
   * @description deletes a book from the library
   * @param {number} categoryId - id of the category to filter by
   * @param {object} event - click event
   * @param {string} title - category name
   * @returns {function} action
   * @memberof Admin
   */
  filterBooksByCategory(categoryId, event, title) {
    event.preventDefault();
    this.props.fetchBooksByCategory(this.state.pageId, categoryId)
      .then((res) => {
        if (res.isDone) {
          return this.setState({
            showCategoryTitle: true,
            categoryTitle: title
          });
        }
        this.setState({
          showCategoryTitle: true,
          categoryTitle: `${title} Sorry! ${res.message}`
        });
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
          <h3 className="col s12">
          Admin Dashboard &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {this.state.showCategoryTitle && (
              <small className="white-text">
                Filtering by: {this.state.categoryTitle}
              </small>)}
          </h3>
          <div className="row">
            <div className="col s12 m12 l3">
              <div className="row">
                <CategoryList
                  handleFilterBooksByCategory={this.filterBooksByCategory}
                  categories={this.props.categories}
                />
                {this.props.categories > 10 ? <p className="white-text">
                Scroll inside above list to see remaining categories
                </p> : ''}
              </div>
            </div>
            <div className="col s12 m12 l9">
              <div className="center-align">
                <Modal
                  header="Add New Book"
                  trigger={<Button id="book-form-btn">ADD BOOK</Button>}
                  id="book-form-modal"
                >
                  <BookForm />
                </Modal>&nbsp;&nbsp;
                <Modal
                  header="Add New Category"
                  trigger={<Button id="cat-form-btn" >ADD CATEGORY</Button>}
                  id="category-form-modal"
                >
                  <CategoryForm />
                </Modal>
              </div>
              <BookList
                books={this.props.books}
                handleDelete={this.handleDelete}
              />
              {!this.state.showCategoryTitle && this.state.pages.length > 1 ?
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
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchBooksByCategory: PropTypes.func.isRequired,
  deleteBook: PropTypes.func.isRequired
};

/**
 * @description maps the state in redux store to Admin props
 * @param {object} state
 * @returns {object} book
 */
export function mapStateToProps(state) {
  return {
    books: state.booksReducer.books,
    categories: state.categoryReducer.categories
  };
}

export default connect(mapStateToProps, {
  fetchBooks,
  fetchCategories,
  fetchBooksByCategory,
  deleteBook
})(Admin);
