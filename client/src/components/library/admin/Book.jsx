import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-materialize';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import UpdateBookModal from '../../library/admin/UpdateBookModal';
import { deleteBook } from '../../../actions/bookActions';

/**
 * @description represents a single book component
 * @class Book
 * @extends {Component}
 */
class Book extends Component {
  /**
   * Creates an instance of Book.
   * @param {object} props
   * @memberof Book
   */
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  /**
   * @description ensures a book can be deleted
   * @param {void} null
   * @returns {object} action
   * @returns {boolean} false
   * @memberof Book
   */
  handleDelete() {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this book!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal('Poof! Book successfully deleted', {
            icon: 'success',
          });
          return deleteBook(this.props.book.id);
        }
        return false;
      });
  }

  /**
   * @description displays the book
   * @param {void} null
   * @returns {string} - HTML markup for the book
   * @memberof Book
   */
  render() {
    return (
      <tr>
        <td className="teal-text">{this.props.index}</td>
        <td className="green-text admin-book-list"><img src={this.props.book.image} alt="" /></td>
        <td>{this.props.book.title}</td>
        <td>{this.props.book.author}</td>
        <td>{this.props.book.quantity}</td>
        <td>
          <Modal
            header="Update Book"
            trigger={<button className="btn white waves-effect waves-light"><i className="fa fa-edit green-text" /></button>}
          >
            <UpdateBookModal book={this.props.book} />
          </Modal>
        </td>
        <td>
          <a
            role="button"
            tabIndex={0}
            className="btn white waves-effect"
            onClick={this.handleDelete}
          >
            <i className="fa fa-trash red-text" />
          </a>
        </td>
      </tr>
    );
  }
}

Book.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number,
    isbn: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    description: PropTypes.string,
    quantity: PropTypes.number,
    category: PropTypes.string,
    image: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default connect(null, { deleteBook })(Book);
