import React, { Component } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import paginate from '../helpers/paginate';

/**
 * @class Paginator
 *
 * @description Pagination component for certain pages with tabular data
 *
 */
export class Paginator extends Component {
  /**
   * Creates an instance of Shelf.
   *
   * @param {object} props - properties passed into the component
   *
   * @memberof Paginator
   *
   * @constructor
   */
  constructor(props) {
    super(props);
    this.query = (props.redirect.location.search).split('=')[1];
  }

  /**
   * @description Invoked after the page loads
   *
   * @param {void} null - Has no parameter
   *
   * @memberof Shelf
   *
   * @returns {void} returns nothing
   */
  componentDidMount() {
    this.props
      .paginate(this.props.fetchData, this.query, this.props.userId, false);
  }

  /**
   * Generates the next pagination
   *
   * @description generates next page of books
   *
   * @param {void} null - Has no parameter
   *
   * @returns {void} returns nothing
   */
  nextPage = () => {
    const nextPageNumber = parseInt(this.props.pageId, 10) + 1;
    if (parseInt(this.props.pageId, 10) < this.props.pages.length) {
      this.props.redirect.push(`${this.props.pageName}?page=${nextPageNumber}`);
    }
  };

  /**
   * Generates the previous pagination
   *
   * @description generates previous page of books
   *
   * @param {void} null - Has no parameter
   *
   * @returns {void} returns nothing
   */
  prevPage = () => {
    const prevPageNumber = parseInt(this.props.pageId, 10) - 1;
    if (parseInt(this.props.pageId, 10) > 1) {
      this.props.redirect.push(`${this.props.pageName}?page=${prevPageNumber}`);
    }
  };

  /**
   * @description Displays the History Page
   *
   * @param {void} null - Has no parameter
   *
   * @returns {string} - HTML markup of the Paginator Component
   *
   * @memberof History
   */
  render() {
    const paginationComponent = this.props.pages.length > 1 ? (
      <ul className="pagination center-align">
        <li>
          <button
            className={
              classnames('btn', 'prev',
                {
                  disabled: parseInt(this.props.pageId, 10) <= 1
                }
              )
            }
            onClick={this.prevPage}
          >
            <i className="material-icons">chevron_left</i>
          </button>
        </li>
        &nbsp;&nbsp;&nbsp;&nbsp;
        {
          this.props.pages.map(page =>
            (
              <li
                key={page}
                id={`page${page}`}
                className={
                  classnames(
                    'waves-effect',
                    { active: this.props.pageId === page }
                  )
                }
              >
                <Link
                  to={`${this.props.pageName}?page=${page}`}
                >{page}
                </Link>
              </li>
            ))
        }
        &nbsp;&nbsp;&nbsp;&nbsp;
        <li>
          <button
            onClick={this.nextPage}
            className={
              classnames('btn', 'waves-effect', 'next',
                {
                  disabled: parseInt(this.props.pageId, 10) >=
                  this.props.pages.length
                })}
          >
            <i className="material-icons">chevron_right</i>
          </button></li>
      </ul>
    ) : (<div />);
    return paginationComponent;
  }
}

Paginator.defaultProps = {
  userId: null,
};

Paginator.propTypes = {
  userId: PropTypes.number,
  pageId: PropTypes.number.isRequired,
  pages: PropTypes.arrayOf(PropTypes.number).isRequired,
  pageName: PropTypes.string.isRequired,
  redirect: PropTypes.shape({
    location: PropTypes.object,
    push: PropTypes.func
  }).isRequired,
  paginate: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired
};

/**
 * @description maps the state in redux store to Shelf props
 *
 * @param {object} state - The application state payload gotten from the store
 *
 * @returns {object} books - List of books gotten from the state
 */
export function mapStateToProps(state) {
  return {
    pages: state.paginationReducer.pages,
    pageId: parseInt(state.paginationReducer.pageId, 10),
    books: state.booksReducer.books,
    categories: state.categoryReducer.categories,
  };
}

export default connect(mapStateToProps, { paginate })(Paginator);
