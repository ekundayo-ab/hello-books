import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @description functional component for 404 Page
 *
 * @param {void} null - Has no parameter
 *
 * @returns {string} - HTML markup of the 404 component
 */
const NotFoundPage = () =>
  (
    <div>
      <div>
        <div style={{ padding: 300 }} className="card">
          <h1>OOPS PAGE NOT FOUND</h1>
          <h3>Please try out the links below!</h3>
          <nav>
            <div className="teal">
              <div className="notfound-nav-wrapper col s12 center-align">
                <Link
                  to="/shelf"
                  className="white-text breadcrumb"
                >Library Shelf
                </Link>
                <Link
                  to="/profile"
                  className="white-text text-darken-2 breadcrumb"
                >View Your Profile
                </Link>
                <Link
                  to="/history"
                  className="white-text breadcrumb"
                >Your Borrowing History
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );

export default NotFoundPage;
