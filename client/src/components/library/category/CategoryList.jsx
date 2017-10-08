/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

class CategoryList extends Component {
  render() {
    return (
      <div>
        <form action="" className="search-form">
          <input className="col s9 white-text validate" placeholder="Search.." type="tel" />
          <button type="submit" className="btn col s3"><i className="fa fa-search" /></button>
        </form>
        <div className="card-panel white col s12">
          <h6 className="teal-text">SELECT A CATEGORY</h6>
          <div className="collection">
            <a href="#!" className="collection-item"><span className="new badge">14</span>Finance</a>
            <a href="#!" className="collection-item"><span className="new badge">311</span>Science</a>
            <a href="#!" className="collection-item"><span className="new badge">24</span>Computers</a>
            <a href="#!" className="collection-item"><span className="new badge">32</span>Arts</a>
            <a href="#!" className="collection-item"><span className="new badge">30</span>History</a>
            <a href="#!" className="collection-item"><span className="new badge">10</span>Animal</a>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryList;
