import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UpdateBookModal from '../../library/admin/UpdateBookModal';

export default class Book extends Component {
  render() {
    return (
      <tr>
        <td className="teal-text">{this.props.book.id}</td>
        <td className="green-text"><i className="fa fa-book green-text" /></td>
        <td>{this.props.book.title}</td>
        <td>{this.props.book.author}</td>
        <td>{this.props.book.quantity}</td>
        <td>
          <a data-target="modal1" className="btn white waves-effect waves-light modal-trigger" href="#modal1"><i className="fa fa-edit green-text" /></a>
          <div id="modal1" className="modal modal-fixed-footer">
            <UpdateBookModal />
          </div>
        </td>
        <td><a className="btn white waves-effect" onClick="return ConfirmDelete();"><i className="fa fa-trash red-text" /> </a></td>
      </tr>
    );
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
};
