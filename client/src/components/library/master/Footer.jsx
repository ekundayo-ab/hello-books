import React from 'react';

/**
 * @description functional component footer for the library pages
 * @param {void} null
 * @returns {string} - HTML markup of the Footer component
 */
const Footer = () => (
  <footer className="teal page-footer">
    <div className="container">
      <div className="row">
        <div className="col l6 s12">
          <h5 className="white-text">Grow by reading</h5>
          <p
            className="grey-text text-lighten-4"
          >Help this library grow, please return any book you borrow</p>
        </div>
      </div>
    </div>
    <div className="footer-copyright">
      <div className="container">
      &copy; 2017 Hello books
        <a className="grey-text text-lighten-4 right" href="#!">Ekundayo</a>
      </div>
    </div>
  </footer>
);

export default Footer;
