import React from 'react';

/**
 * @description functional component footer for the library pages
 *
 * @param {void} null - Has no parameter
 *
 * @returns {string} - HTML markup of the Footer component
 */
const Footer = () => (
  <footer className="teal page-footer">
    <div className="row">
      <div className="center-align">
        <ul className="helpful-links" >
          <li>
            <a href="https://hellobooks-e.herokuapp.com/api/docs/">
              <i className="fa fa-book" />&nbsp; API Docs
            </a>
          </li>
          <li>
            <a href="https://github.com/ekundayo-ab/hello-books" >
              <i className="fa fa-code-fork" />&nbsp; Github Repo
            </a>
          </li>
          <li>
            <a href="https://www.pivotaltracker.com/n/projects/2087065" >
              <i className="fa fa-briefcase" />&nbsp; Project Management Board
            </a>
          </li>
        </ul>
      </div>
      <div className="center-align">
        <h5 className="white-text">Grow by reading</h5>
        <p
          className="grey-text text-lighten-4"
        >Help this library grow, please return any book you borrow
        </p>
      </div>
    </div>
    <div className="footer-copyright">
      <div className="container">
      &copy; MIT 2017 Hello books
        <a className="grey-text text-lighten-4 right" href="#!">Ekundayo A.E</a>
      </div>
    </div>
  </footer>
);

export default Footer;
