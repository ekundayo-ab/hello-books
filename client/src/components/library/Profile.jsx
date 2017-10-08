/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import img1 from '../../../public/images/1.png';
import img2 from '../../../public/images/2.png';
import img3 from '../../../public/images/3.png';
import img4 from '../../../public/images/4.png';
import img5 from '../../../public/images/5.png';
import dayo from '../../../public/images/dayo.png';

class Shelf extends Component {
  render() {
    return (
      <div>
        <div className="row available-books">
          <h3 className="col s12">Profile</h3>

          <div className="row">
            <div className="col s12 m12 l3">
              <div className="col s12 card">
                <div className="card">
                  <div className="card-image">
                    <img src={dayo} alt="dayo" />
                  </div>
                  <div className="card-content">
                    <p>Ekundayo A. Abiona</p>
                    <small>Computer Programmer</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="col s12 m12 l9">
              <div className="card-panel row">
                <h4>Info & Details</h4>
                <p>Books borrowed details, Level Status and others.</p>
                <div className="row">
                  <div className="col s12 m4 l4">
                    <div className="center promo promo-example">
                      <i className="fa fa-flash fa-5x teal-text" />
                      <p className="promo-caption">Total Books Borrowed</p>
                      <p className="light center">50</p>
                    </div>
                  </div>
                  <div className="col s12 m4 l4">
                    <div className="center promo promo-example">
                      <i className="fa fa-users fa-5x teal-text" />
                      <p className="promo-caption">Level</p>
                      <p className="light center">Bronze</p>
                    </div>
                  </div>
                  <div className="col s12 m4 l4">
                    <div className="center promo promo-example">
                      <i className="fa fa-code fa-5x teal-text" />
                      <p className="promo-caption">Other Details</p>
                      <p className="light center">Surcharges not paid.</p>
                    </div>
                  </div>
                </div>
                <div className="center-align row">
                  <i className="fa fa-google fa-2x red-text" />
                  <i className="fa fa-facebook fa-2x indigo-text" />
                  <i className="fa fa-github fa-2x grey-text" />
                  <i className="fa fa-twitter fa-2x blue-text" />
                  <i className="fa fa-skype fa-2x cyan-text" />
                  <i className="fa fa-phone fa-2x dark-text" />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <h3 className="col s12">Unreturned Books</h3>
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
                      <th>S/N</th>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Date Borrowed</th>
                      <th>Return</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>1</td>
                      <td className="return-image"><img src={img1} alt="" /> </td>
                      <td>Kaveller & Clay</td>
                      <td>Thomas Jenkins</td>
                      <td>March 13th, 2016</td>
                      <td><a href="" className="btn"><i className="fa fa-2x fa-mail-forward" />> Return</a></td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td className="return-image"><img src={img2} alt="" /></td>
                      <td>Half of a yellow sun</td>
                      <td>Chimamanda Adichie</td>
                      <td>March 13th, 2016</td>
                      <td><a href="" className="btn"><i className="fa fa-2x fa-mail-forward" /> Return</a></td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td className="return-image"><img src={img3} alt="" /></td>
                      <td>Half of a yellow sun</td>
                      <td>Chimamanda Adichie</td>
                      <td>March 13th, 2016</td>
                      <td><a href="" className="btn"><i className="fa fa-2x fa-mail-forward" /> Return</a></td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td className="return-image"><img src={img4} alt="" /></td>
                      <td>Title Marks</td>
                      <td>First Line finish</td>
                      <td>March 13th, 2016</td>
                      <td><a href="" className="btn"><i className="fa fa-2x fa-mail-forward" /> Return</a></td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td className="return-image"><img src={img5} alt="" /></td>
                      <td>Kaveller & Clay</td>
                      <td>Thomas Jenkins</td>
                      <td>March 13th, 2016</td>
                      <td><a href="" className="btn"><i className="fa fa-2x fa-mail-forward" /> Return</a></td>
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
