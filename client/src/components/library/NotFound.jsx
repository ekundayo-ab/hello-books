import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @description functional component for 404 Page
 * @param {void} null
 * @returns {string} - HTML markup of the 404 component
 */
const NotFoundPage = () =>
  (
    <div>
      <div>
        <div style={{ padding: '300' }} className="card">
          <h1>OOPS PAGE NOT FOUND</h1>
          <h3>Please try out the links below!</h3>
          <nav>
            <div className="nav-wrapper">
              <div className="col s12">
                <Link to="/shelf" className="breadcrumb">Library Shelf</Link>
                <Link
                  to="/profile"
                  className="breadcrumb"
                >View Your Profile</Link>
                <Link
                  to="/history"
                  className="breadcrumb"
                >Your Borrowing History</Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );

export default NotFoundPage;
