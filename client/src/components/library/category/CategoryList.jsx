import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

/**
 * @description displays categories of books
 *
 * @param {object} props
 *
 * @returns {string} - HTML markup of CategoryList component
 *
 * @memberof CategoryList
 */
const CategoryList = props =>
  (
    <div
      className={
        classnames(props.categories.length > 10 ? 'ct-fixed-height' : '')
      }
    >
      {/* TODO: Filter books by searching
        <form action="" className="search-form">
          <input
            className="col s9 white-text validate"
            placeholder="Search.."
            type="tel"
          />
          <button
            type="submit"
            className="btn col s3"
          >
            <i className="fa fa-search" /></button>
        </form>
      */}
      <div className="card-panel white col s12">
        <h6 className="teal-text">SELECT A CATEGORY</h6>
        {props.categories.length > 0 ?
          <div className="collection">
            {
              props.categories.map(category => (
                <a
                  id={`cat${category.id}`}
                  key={category.id}
                  href="#!"
                  onClick={event => props.handleFilterBooksByCategory(
                    category.id,
                    event,
                    category.title
                  )}
                  className="collection-item"
                >
                  <span className="new badge">
                    {category.cat.length}
                  </span>{category.title}
                </a>
              ))
            }
          </div> : <p>No categories yet, check later</p>
        }
      </div>
    </div>
  );

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CategoryList;
