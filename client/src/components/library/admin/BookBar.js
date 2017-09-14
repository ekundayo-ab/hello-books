import React, { Component } from 'react';

export default class BookBar extends Component {
  render() {
    return (
      <div>
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
                  <div id="modal1" className="modal">
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
                          <div className="center-align col s12">
                            <button type="submit" className="btn waves-effect teal">Save <i className="fa fa-send" /></button>
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
    );
  }
}
