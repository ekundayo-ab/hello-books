import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * @description functional component for 404 Page
 * @param {object} props - component data
 * @returns {string} - HTML markup of the 404 component
 */
const Paginator = (props) => {
  /**
   * Generates the next pagination
   * @description generates next page of books
   * @param {void} null
   * @returns {void} returns nothing
   */
  const nextPage = () => {
    const nextPageNumber = parseInt(props.pageId, 10) + 1;
    if (parseInt(props.pageId, 10) < props.pages.length) {
      props.redirect(`${props.pageName}?page=${nextPageNumber}`);
    }
  };

  /**
   * Generates the previous pagination
   * @description generates previous page of books
   * @param {void} null
   * @returns {void} returns nothing
   */
  const prevPage = () => {
    const prevPageNumber = parseInt(props.pageId, 10) - 1;
    if (parseInt(props.pageId, 10) > 1) {
      props.redirect(`${props.pageName}?page=${prevPageNumber}`);
    }
  };
  return (
    <ul className="pagination center-align">
      <li>
        <button
          className={
            classnames('btn', {
              disabled:
            parseInt(props.pageId, 10) <= 1
            })}
          onClick={prevPage}
        >
          <i className="material-icons">chevron_left</i>
        </button>
      </li>
      &nbsp;&nbsp;&nbsp;&nbsp;
      {
        props.pages.map(page =>
          (
            <li
              key={page}
              className={classnames(
                'waves-effect',
                { active: props.pageId === String(page)
                })}
            >
              <Link to={`${props.pageName}?page=${page}`}>{page}</Link>
            </li>
          ))
      }
      &nbsp;&nbsp;&nbsp;&nbsp;
      <li>
        <button
          onClick={nextPage}
          className={classnames(
            'btn',
            'waves-effect',
            {
              disabled: parseInt(props.pageId, 10) >=
              props.pages.length
            }
          )}
        >
          <i className="material-icons">chevron_right</i>
        </button>
      </li>
    </ul>
  );
};

Paginator.propTypes = {
  pageId: PropTypes.string.isRequired,
  pages: PropTypes.arrayOf(PropTypes.number).isRequired,
  pageName: PropTypes.string.isRequired,
  redirect: PropTypes.func.isRequired
};

export default Paginator;
