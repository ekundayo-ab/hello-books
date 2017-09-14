import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BookForm from './BookForm';
import CategoryForm from './CategoryForm';
import CategoryList from './../category/CategoryList';
import BookList from './BookList';
import { fetchBooks } from './../../../actions/createActions';

class Admin extends Component {
  componentDidMount() {
    this.props.fetchBooks();
  }
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
              <BookList books={this.props.books} />
            </div>
          </div>
          <div className="row">
            <div className="col s12 m12 l8">
              <BookForm />
            </div>
            <div className="col s12 m12 l4">
              <CategoryForm />
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
};

function mapStateToProps(state) {
  return {
    books: state.books,
  };
}

export default connect(mapStateToProps, { fetchBooks })(Admin);
