/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

class Shelf extends Component {
  render() {
    return (
      <div>
        <div className="nav-bottom" />
        <div className="row available-books">
          <h3 className="col s12">Borrowing History</h3>
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
                      <th>Status</th>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Borrowed</th>
                      <th>Returned</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="teal-text">001</td>
                      <td className="green-text"><i className="fa fa-check green-text" /> Returned</td>
                      <td>Cavaler & Clay</td>
                      <td>Michael Chabon</td>
                      <td>31st May, 2016; 9:08 PM</td>
                      <td>22nd June, 2016; 3:34 PM</td>
                    </tr>
                    <tr>
                      <td className="teal-text">002</td>
                      <td className="red-text"><i className="fa fa-close red-text" /> Not returned</td>
                      <td>Cavaler & Clay</td>
                      <td>Michael Chabon</td>
                      <td>31st May, 2016; 9:08 PM</td>
                      <td>22nd June, 2016; 3:34 PM</td>
                    </tr>
                    <tr>
                      <td className="teal-text">003</td>
                      <td className="red-text"><i className="fa fa-close red-text" /> Not returned</td>
                      <td>Cavaler & Clay</td>
                      <td>Michael Chabon</td>
                      <td>31st May, 2016; 9:08 PM</td>
                      <td>22nd June, 2016; 3:34 PM</td>
                    </tr>
                    <tr>
                      <td className="teal-text">004</td>
                      <td className="green-text"><i className="fa fa-check green-text" /> Returned</td>
                      <td>Cavaler & Clay</td>
                      <td>Michael Chabon</td>
                      <td>31st May, 2016; 9:08 PM</td>
                      <td>22nd June, 2016; 3:34 PM</td>
                    </tr>
                    <tr>
                      <td className="teal-text">005</td>
                      <td className="green-text"><i className="fa fa-check green-text" /> Returned</td>
                      <td>Cavaler & Clay</td>
                      <td>Michael Chabon</td>
                      <td>31st May, 2016; 9:08 PM</td>
                      <td>22nd June, 2016; 3:34 PM</td>
                    </tr>
                    <tr>
                      <td className="teal-text">006</td>
                      <td className="green-text"><i className="fa fa-check green-text" /> Returned</td>
                      <td>Cavaler & Clay</td>
                      <td>Michael Chabon</td>
                      <td>31st May, 2016; 9:08 PM</td>
                      <td>22nd June, 2016; 3:34 PM</td>
                    </tr>
                    <tr>
                      <td className="teal-text">007</td>
                      <td className="red-text"><i className="fa fa-close red-text" /> Not returned</td>
                      <td>Cavaler & Clay</td>
                      <td>Michael Chabon</td>
                      <td>31st May, 2016; 9:08 PM</td>
                      <td>22nd June, 2016; 3:34 PM</td>
                    </tr>
                    <tr>
                      <td className="teal-text">008</td>
                      <td className="red-text"><i className="fa fa-close red-text" /> Not returned</td>
                      <td>Cavaler & Clay</td>
                      <td>Michael Chabon</td>
                      <td>31st May, 2016; 9:08 PM</td>
                      <td>22nd June, 2016; 3:34 PM</td>
                    </tr>
                    <tr>
                      <td className="teal-text">009</td>
                      <td className="red-text"><i className="fa fa-close red-text" /> Not returned</td>
                      <td>Cavaler & Clay</td>
                      <td>Michael Chabon</td>
                      <td>31st May, 2016; 9:08 PM</td>
                      <td>22nd June, 2016; 3:34 PM</td>
                    </tr>
                    <tr>
                      <td className="teal-text">010</td>
                      <td className="green-text"><i className="fa fa-check green-text" /> Returned</td>
                      <td>Cavaler & Clay</td>
                      <td>Michael Chabon</td>
                      <td>31st May, 2016; 9:08 PM</td>
                      <td>22nd June, 2016; 3:34 PM</td>
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
        </div>
      </div>
    );
  }
}

export default Shelf;
