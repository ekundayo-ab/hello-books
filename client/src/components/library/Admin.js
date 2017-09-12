/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

class Shelf extends Component {
  render() {
    return (
      <div>
        <div className="nav-bottom" />
        <div className="row available-books">
          <h3 className="col s12">Admin Dashboard</h3>
          <div className="row">
            <div className="col s12 m12 l3">
              <div className="row">
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
            </div>
            <div className="col s12 m12 l9">
              <div className="card-panel row">
                <table className="responsive-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Author</th>
                      <th className="action-data">Quantity</th>
                      <th className="action-data">Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="teal-text">001</td>
                      <td className="green-text"><i className="fa fa-book green-text" /></td>
                      <td>Cavaler & Clay</td>
                      <td>Michael Chabon</td>
                      <td>34</td>
                      <td>
                        <a className="btn white waves-effect waves-light btn modal-trigger" href="#modal1"><i className="fa fa-edit green-text" /></a>
                        <div id="modal1" className="modal modal-fixed-footer">
                          <div className="modal-content">
                            <div className="row">
                              <div className="center-align book-detail col s12 m6 l4">
                                <img className="center-align detail responsive-img" src="images/3.png" alt="" />
                              </div>
                              <div className="col s12 m6 l6">
                                <h1>Wolf Hall</h1>
                                <h5 className="teal-text">Hilary Mantel</h5>
                                <p>
                                    Lorem Ipsum dolor ameti, story of Wolf hall has a good ending
                                    with accompanying drama, suspense and intrigue, this is a real
                                    master deal, you should like it.
                                </p>
                                <p className="white-text badge green" style={{ display: 'block', padding: '5 !important' }}>
                                  <b>Total:</b> 28 <b>Borrowed:</b> 17 <b>Available:</b> 11
                                </p>
                                <blockquote style={{ borderLeft: '5 px solid green' }}>Added on 16th of January, 2016</blockquote>
                              </div>
                            </div>
                            <div className="row">
                              <h4 className="center-align">Modify Book Information</h4>
                              <div className="col s12">
                                <div className="input-field col s12">
                                  <i className="fa fa-pencil prefix teal-text" />
                                  <input id="icon_prefix" value="Wolf Hall" placeholder="Title" type="text" className="dark-text validate" />
                                </div>
                                <div className="input-field col s12">
                                  <i className="fa fa-list-ol prefix teal-text" />
                                  <input id="icon_prefix" value="236470BCD" placeholder="ISBN" type="text" className="dark-text validate" />
                                </div>
                                <div className="input-field col s12">
                                  <i className="fa fa-user-circle prefix teal-text" />
                                  <input id="icon_telephone" value="Hilary Mantel" placeholder="Author" type="tel" className="dark-text validate" />
                                </div>
                                <div className="input-field col s12">
                                  <i className="fa fa-plus-circle prefix teal-text" />
                                  <input id="icon_telephone" value="28" placeholder="Quantity" type="tel" className="dark-text validate" />
                                </div>
                                <div className="input-field col s12">
                                  <i className="fa fa-edit prefix teal-text" />
                                  <textarea id="description" rows="50" cols="50" className="dark-text validate materialize-textarea" placeholder="Enter description">Lorem Ipsum dolor ameti, story of Wolf hall has a good ending
                                    with accompanying drama, suspense and intrigue, this is a real
                                    master deal, you should like it.</textarea>
                                </div>
                                <div className="col s12">
                                  <i className="fa fa-list fa-2x prefix teal-text" />
                                  <select>
                                    <option value="" disabled>Select Book Category</option>
                                    <option value="1">Finance</option>
                                    <option value="1">Science</option>
                                    <option value="1">Computers</option>
                                    <option value="1" selected>Arts</option>
                                    <option value="1">History</option>
                                  </select>
                                </div>
                                <div className="center-align input-field col s12">
                                  <button type="submit" className="btn waves-effect teal"><i className="fa fa-send" />Save</button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Close</a>
                          </div>
                        </div>
                      </td>
                      <td><a className="btn white waves-effect"><i className="fa fa-trash red-text" /></a></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <ul className="pagination center-align">
                <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
                <li className="active"><a href="#!">1</a></li>
                <li className="waves-effect"><a href="#!">2</a></li>
                <li className="waves-effect"><a href="#!">3</a></li>
                <li className="waves-effect"><a href="#!">4</a></li>
                <li className="waves-effect"><a href="#!">5</a></li>
                <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m12 l8">
              <h4 className="white-text center-align">Add New Book</h4>
              <form action="">
                <div className="input-field col s12">
                  <i className="fa fa-pencil prefix white-text" />
                  <input id="icon_prefix" placeholder="Title" type="text" className="white-text validate" />
                </div>
                <div className="input-field col s12">
                  <i className="fa fa-list-ol prefix white-text" />
                  <input id="icon_prefix" placeholder="ISBN" type="text" className="white-text validate" />
                </div>
                <div className="input-field col s12">
                  <i className="fa fa-user-circle prefix white-text" />
                  <input id="icon_telephone" placeholder="Author" type="tel" className="white-text validate" />
                </div>
                <div className="input-field col s12">
                  <i className="fa fa-plus-circle prefix white-text" />
                  <input id="icon_telephone" placeholder="Quantity" type="tel" className="white-text validate" />
                </div>
                <div className="input-field col s12">
                  <i className="fa fa-edit prefix white-text" />
                  <textarea id="description" rows="50" cols="50" className="materialize-textarea white-text validate" placeholder="Enter description" />
                </div>
                <div className="col s12">
                  <i className="fa fa-list fa-2x prefix white-text" />
                  <select className="white-text">
                    <option value="" disabled selected>Choose your option</option>
                    <option value="1">Finance</option>
                    <option value="1">Science</option>
                    <option value="1">Computers</option>
                    <option value="1">Arts</option>
                    <option value="1">History</option>
                  </select>
                </div>
                <div className="center-align input-field col s12">
                  <button type="submit" className="btn waves-effect teal"><i className="fa fa-send" /> Add Book</button>
                </div>
              </form>
            </div>
            <div className="col s12 m12 l4">
              <h4 className="white-text center-align">Add New Category</h4>
              <form action="">
                <div className="input-field col s12">
                  <i className="fa fa-pencil prefix white-text" />
                  <input id="icon_prefix" placeholder="Category Name" type="text" className="white-text validate" />
                </div>
                <div className="center-align input-field col s12">
                  <button type="submit" className="btn waves-effect teal"><i className="fa fa-plus" /> Create Category</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Shelf;
