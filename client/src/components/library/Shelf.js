/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

class Shelf extends Component {
  render() {
    return (
      <div>
        <div className="nav-bottom" />
        <div className="row available-books">
          <h3 className="col s12">Available Books</h3>
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
              <div className="card-panel">
                <div className="row">

                  <div className="book col s12 m3 l3">
                    <div className="card">
                      <div className="card-image waves-effect waves-block waves-light">
                        <img className="activator" src="images/1.png" alt="cool-1" />
                      </div>
                      <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">Cavaler & Clay</span>
                        <span>Michael Chabon</span>
                        <p><a href="book.html" className="btn">Borrow Now</a></p>
                      </div>
                    </div>
                  </div>

                  <div className="book col s12 m3 l3">
                    <div className="card">
                      <div className="card-image waves-effect waves-block waves-light">
                        <img className="activator" src="images/5.png" alt="cool-5" />
                      </div>
                      <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">Jonathan Franzen</span>
                        <span>The Corrections</span>
                        <p><a href="book.html" className="btn">Borrow Now</a></p>
                      </div>
                    </div>
                  </div>

                  <div className="book col s12 m3 l3">
                    <div className="card">
                      <div className="card-image waves-effect waves-block waves-light">
                        <img className="activator" src="images/3.png" alt="cool-3" />
                      </div>
                      <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">Wolf Hall</span>
                        <span>Hilary Mantel</span>
                        <p><a href="book.html" className="btn">Borrow Now</a></p>
                      </div>
                    </div>
                  </div>

                  <div className="book col s12 m3 l3">
                    <div className="card">
                      <div className="card-image waves-effect waves-block waves-light">
                        <img className="activator" src="images/6.png" alt="cool-6" />
                      </div>
                      <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">Gilead</span>
                        <span>Marilynne Robinson</span>
                        <p><a href="book.html" className="btn">Borrow Now</a></p>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="row">

                  <div className="book col s12 m3 l3">
                    <div className="card">
                      <div className="card-image waves-effect waves-block waves-light">
                        <img className="activator" src="images/4.png" alt="cool-4" />
                      </div>
                      <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">White Teeth</span>
                        <span>Zadie Smith</span>
                        <p><a href="book.html" className="btn">Borrow Now</a></p>
                      </div>
                    </div>
                  </div>

                  <div className="book col s12 m3 l3">
                    <div className="card">
                      <div className="card-image waves-effect waves-block waves-light">
                        <img className="activator" src="images/5.png" alt="cool-3" />
                      </div>
                      <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">Jonathan Franzen</span>
                        <span>The Corrections</span>
                        <p><a href="book.html" className="btn">Borrow Now</a></p>
                      </div>
                    </div>
                  </div>

                  <div className="book col s12 m3 l3">
                    <div className="card">
                      <div className="card-image waves-effect waves-block waves-light">
                        <img className="activator" src="images/6.png" alt="cool-6" />
                      </div>
                      <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">Gilead</span>
                        <span>Marilynne Robinson</span>
                        <p><a href="book.html" className="btn">Borrow Now</a></p>
                      </div>
                    </div>
                  </div>

                  <div className="book col s12 m3 l3">
                    <div className="card">
                      <div className="card-image waves-effect waves-block waves-light">
                        <img className="activator" src="images/4.png" alt="cool" />
                      </div>
                      <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">White Teeth</span>
                        <span>Zadie Smith</span>
                        <p><a href="book.html" className="btn">Borrow Now</a></p>
                      </div>
                    </div>
                  </div>

                </div>
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
