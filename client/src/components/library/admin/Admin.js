/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import BookForm from './BookForm';
import CategoryForm from './CategoryForm';
import CategoryBar from './../category/CategoryBar';
import BookBar from './BookBar';

class Admin extends Component {
  render() {
    return (
      <div>
        <div className="nav-bottom" />
        <div className="row available-books">
          <h3 className="col s12">Admin Dashboard</h3>
          <div className="row">
            <div className="col s12 m12 l3">
              <div className="row">
                <CategoryBar />
              </div>
            </div>
            <div className="col s12 m12 l9">
              <BookBar />
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

export default Admin;
