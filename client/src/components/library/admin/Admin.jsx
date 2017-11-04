import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-materialize';
import swal from 'sweetalert';
import BookForm from './BookForm';
import CategoryForm from './CategoryForm';
import CategoryList from './../category/CategoryList';
import BookList from './BookList';
import { fetchBooks, deleteBook } from './../../../actions/bookActions';
import { fetchCategories } from './../../../actions/categoryActions';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.fetchBooks();
    this.props.fetchCategories();
    $(document).ready(() => {
      $('.modal').modal();
    });
  }
  /* eslint-disable */
  handleDelete(bookId) {
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
          return deleteBook(bookId);
        }
        return false;
      });
  }
  /* eslint-disable */

  render() {
    return (
      <div>
        <div className="nav-bottom" />
        <div className="row available-books">
          <h3 className="col s12">Admin Dashboard</h3>
          <div className="row">
            <div className="col s12 m12 l3">
              <div className="row">
                <CategoryList />
              </div>
            </div>
            <div className="col s12 m12 l9">
              <div className="center-align">
                <Modal
                  header="Add New Book"
                  trigger={<Button>ADD BOOK</Button>}
                >
                  <BookForm />
                </Modal>&nbsp;&nbsp;
                <Modal
                  header="Add New Category"
                  trigger={<Button>ADD CATEGORY</Button>}
                >
                  <CategoryForm />
                </Modal>
              </div>
              <BookList books={this.props.books} handleDelete={this.handleDelete} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Admin.propTypes = {
  books: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    books: state.books,
  };
}

export default connect(mapStateToProps, { fetchBooks, fetchCategories })(Admin);
