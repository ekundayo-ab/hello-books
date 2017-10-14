import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import UpdateBookModal from '../../library/admin/UpdateBookModal';
import { deleteBook } from '../../../actions/bookActions';

class Book extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

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

  render() {
    return (
      <tr>
        <td className="teal-text">{this.props.book.id}</td>
        <td className="green-text admin-book-list"><img src={this.props.book.image} alt="" /></td>
        <td>{this.props.book.title}</td>
        <td>{this.props.book.author}</td>
        <td>{this.props.book.quantity}</td>
        <td>
          <a onClick={this.hc} className="btn white waves-effect waves-light modasl-trigger" href="#modasl1"><i className="fa fa-edit green-text" /></a>
          <div id="modal1" className="modal modal-fixed-footer">
            <UpdateBookModal />
          </div>
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
  book: PropTypes.object.isRequired,
};

export default connect(null, { deleteBook })(Book);
