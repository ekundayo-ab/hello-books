import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-materialize';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
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
    this.state = {
      pages: [],
      pageId: 1,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.query = new URLSearchParams(this.props.history.location.search);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  componentWillMount() {
    let pageId = this.query.get('page');
    if (pageId === null) pageId = 1;
    this.props.fetchBooks(pageId)
      .then((numberOfPages) => {
        const pages = Array.from(Array(numberOfPages)).map((e, i) => i + 1);
        this.setState({ pages, pageId });
      });
  }

  componentDidMount() {
    this.props.fetchCategories();
    $(document).ready(() => {
      $('.modal').modal();
    });
  }

  nextPage() {
    const nextPage = parseInt(this.state.pageId, 10) + 1;
    if (parseInt(this.state.pageId, 10) < this.state.pages.length) {
      this.props.history.push(`/admin?page=${nextPage}`);
    }
  }

  prevPage() {
    const prevPage = parseInt(this.state.pageId, 10) - 1;
    if (parseInt(this.state.pageId, 10) > 1) {
      this.props.history.push(`/admin?page=${prevPage}`);
    }
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
              <ul className="pagination center-align">
                <li>
                  <button
                    className={classnames('btn', { disabled:
                      parseInt(this.state.pageId, 10) <= 1 })}
                    onClick={this.prevPage}
                  >
                    <i className="material-icons">chevron_left</i>
                  </button>
                </li>
                &nbsp;&nbsp;&nbsp;&nbsp;
                {
                  this.state.pages.map(page =>
                    (
                      <li
                        key={page}
                        className={classnames('waves-effect',
                          { active: this.state.pageId === String(page) })}
                      >
                        <Link to={`/admin?page=${page}`}>{page}</Link>
                      </li>
                    ),
                  )
                }
                &nbsp;&nbsp;&nbsp;&nbsp;
                <li>
                  <button
                    onClick={this.nextPage}
                    className={classnames('btn', 'waves-effect',
                      { disabled: parseInt(this.state.pageId, 10) >=
                        this.state.pages.length })}
                  >
                    <i className="material-icons">chevron_right</i>
                  </button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Admin.propTypes = {
  books: PropTypes.array.isRequired,
  fetchBooks: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    books: state.books,
  };
}

export default connect(mapStateToProps, { fetchBooks, fetchCategories })(Admin);
