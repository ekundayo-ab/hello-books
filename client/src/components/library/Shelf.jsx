import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchBooks } from '../../actions/bookActions';
import BookCard from '../../components/library/BookCard';
import paginate from '../../helpers/paginate';
import Paginator from '../../helpers/Paginator';

/**
 * @description represents Shelf Page
 * @class Shelf
 * @extends {Component}
 */
class Shelf extends Component {
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
    };
    this.query = new URLSearchParams(this.props.history.location.search);
  }

  /**
   * @description Invoked before page loads
   * @param {void} null
   * @memberof Shelf
   * @returns {void} returns nothing
   */
  componentDidMount() {
    paginate(this.props.fetchBooks, this.query.get('page'))
      .then((res) => {
        this.setState({
          pages: res.pages,
          pageId: res.pageId
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
          <h3 className="col s12">Available Books</h3>
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
                </div>
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

// Type checking for Shelf component
Shelf.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchBooks: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired
  }).isRequired,
};

/**
 * @description maps the state in redux store to Shelf props
 * @param {object} state
 * @returns {object} books gotten from state
 */
function mapStateToProps(state) {
  return {
    books: state.booksReducer.books,
  };
}

export default connect(mapStateToProps, { fetchBooks })(Shelf);
