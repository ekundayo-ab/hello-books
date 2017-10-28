/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { fetchBooks } from '../../actions/bookActions';
import BookCard from '../../components/library/BookCard';

class Shelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      pageId: null,
    };
    this.query = new URLSearchParams(this.props.history.location.search);
  }
  componentDidMount() {
    let pageId = this.query.get('page');
    if (pageId === null) pageId = 1;
    this.props.fetchBooks(pageId)
      .then((numberOfPages) => {
        const pages = Array.from(Array(numberOfPages)).map((e, i) => i + 1);
        this.setState({ pages, pageId });
      });
  }

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
              <ul className="pagination center-align">
                <li className="disabled">
                  <a href="#!">
                    <i className="material-icons">chevron_left</i>
                  </a>
                </li>
                {
                  this.state.pages.map(page =>
                    (
                      <li
                        key={page}
                        className={classnames('waves-effect',
                          { active: this.state.pageId === page })}
                      >
                        <Link to={`/shelf?page=${page}`}>{page}</Link>
                      </li>
                    ),
                  )
                }
                <li className="waves-effect">
                  <a href="#!"><i className="material-icons">chevron_right</i>
                  </a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Shelf.propTypes = {
  books: PropTypes.array.isRequired,
  fetchBooks: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    books: state.books,
  };
}

export default connect(mapStateToProps, { fetchBooks })(Shelf);
