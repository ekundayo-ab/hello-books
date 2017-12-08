import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchBooks, fetchBooksByCategory } from '../../actions/bookActions';
import { fetchCategories } from '../../actions/categoryActions';
import BookCard from '../../components/library/BookCard';
import paginate from '../../helpers/paginate';
import Paginator from '../../helpers/Paginator';
import CategoryList from '../../components/library/category/CategoryList';

/**
 * @description represents Shelf Page
 * @class Shelf
 * @extends {Component}
 */
export class Shelf extends Component {
  /**
   * Creates an instance of Shelf.
   * @param {object} props
   * @memberof Shelf
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
    this.query = (this.props.history.location.search).split('=')[1];
    this.filterBooksByCategory = this.filterBooksByCategory.bind(this);
  }

  /**
   * @description Invoked after the page loads
   * @param {void} null
   * @memberof Shelf
   * @returns {void} returns nothing
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
   * @description renders the shelf page
   * @param {void} null
   * @returns {string} - HTML markup of shelf page
   * @memberof Shelf
   */
  render() {
    return (
      <div>
        <div className="nav-bottom" />
        <div className="row available-books">
          <h3 className="col s12">Available Books &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                {this.props.categories > 10 ?
                  <p className="white-text">
                    Scroll inside above list to see remaining categories
                  </p> : ''}
              </div>
            </div>
            <div className="col s12 m12 l9">
              <div className="card-panel">
                <div className="row">
                  {
                    this.props.books.length > 0 ?
                      this.props.books.map(book =>
                        <BookCard book={book} key={book.id} />
                      ) :
                      <h5>Woof! No book(s) available in this
                       shelf currently, please check back later</h5>
                  }
                  <p><b>
                    Books borrowed must be returned
                    on or before 3 days after borrowing.
                    Borrowing credit deduction applies for late returns</b>
                  </p>
                </div>
              </div>
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

// Type checking for Shelf component
Shelf.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchBooks: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.object,
    push: PropTypes.func
  }).isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchBooksByCategory: PropTypes.func.isRequired
};

/**
 * @description maps the state in redux store to Shelf props
 * @param {object} state
 * @returns {object} books gotten from state
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
  fetchBooksByCategory
})(Shelf);
