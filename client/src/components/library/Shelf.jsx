import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { fetchBooks } from '../../actions/bookActions';
import BookCard from '../../components/library/BookCard';

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
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  /**
   * @description Invoked before page loads
   * @param {void} null
   * @memberof Shelf
   * @returns {void} returns nothing
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
   * @description generates next page of books
   * @param {void} null
   * @returns {void} returns nothing
   * @memberof Shelf
   */
  nextPage() {
    const nextPage = parseInt(this.state.pageId, 10) + 1;
    if (parseInt(this.state.pageId, 10) < this.state.pages.length) {
      this.props.history.push(`/shelf?page=${nextPage}`);
    }
  }

  /**
   * @description generates previous page of books
   * @param {void} null
   * @returns {void} returns nothing
   * @memberof Shelf
   */
  prevPage() {
    const prevPage = parseInt(this.state.pageId, 10) - 1;
    if (parseInt(this.state.pageId, 10) > 1) {
      this.props.history.push(`/shelf?page=${prevPage}`);
    }
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
                        <BookCard book={book} key={book.id} />) :
                      <h5>Woof! No books in the shelf now, check back later</h5>
                  }
                </div>
              </div>
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
                          <Link to={`/shelf?page=${page}`}>{page}</Link>
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
    books: state.books,
  };
}

export default connect(mapStateToProps, { fetchBooks })(Shelf);
