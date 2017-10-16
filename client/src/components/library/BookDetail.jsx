import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { fetchBook } from '../../actions/bookActions';
import { borrowBook, fetchBorrowedBook } from '../../actions/borrowActions';

class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleBorrowClick = this.handleBorrowClick.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    fetchBook(id)
      .then((resp) => {
        if (resp.response) {
          this.props.history.push('/shelf');
          Materialize.toast(resp.response.data.message, 1000, 'red');
        }
      });
    fetchBorrowedBook(this.props.match.params.id);
  }

  handleBorrowClick() {
    borrowBook(this.props.userId, { bookId: this.props.book.id });
  }

  render() {
    const detailStyle = {
      p: {
        display: 'block',
        padding: '5px !important',
      },
      bq: {
        borderLeft: '5px solid green',
      },
    };

    const dateCreated = new Date(this.props.book.createdAt);
    return (
      <div>
        <div className="nav-bottom" />
        <div className="row available-books">
          <div className="container">
            <h3 className="col s12">Book Detail</h3>
            <div className="row">
              <div className="book-detail col s12 m6 l4">
                <img className="detail responsive-img" src={this.props.book.image} alt="" />
              </div>
              <div className="col white-text s12 m6 l6">
                <h1>{this.props.book.title} </h1>
                <small className="text-white"><b>Category: </b>{this.props.book.category}</small>
                <h5 className="teal-text">{this.props.book.author}</h5>
                <p>{this.props.book.description}</p>
                <p
                  className={classnames('book-count', 'badge', 'white',
                    { 'red-text': this.props.book.quantity < 0, 'green-text': this.props.book.quantity > 0 })}
                  style={detailStyle.p}
                >
                  <b>{this.props.book.quantity > 0 ? 'Available' : ''}</b>
                  <b> {this.props.book.quantity}</b>
                </p>
                <button onClick={this.handleBorrowClick} disabled={Object.keys(this.props.borrow).length > 0 ? 'disabled' : ''} className="btn green">Borrow</button> {Object.keys(this.props.borrow).length > 0 && <small>You borrowed this book, please return</small>}
                <blockquote style={detailStyle.bq}>Added on {dateCreated.toUTCString()}</blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BookDetail.propTypes = {
  book: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  userId: PropTypes.number,
  borrow: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    book: state.book,
    borrow: state.borrow,
    userId: state.users.user.id,
  };
}

export default connect(mapStateToProps, { fetchBook, borrowBook })(BookDetail);
