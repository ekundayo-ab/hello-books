import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveBook } from './../../../actions/bookActions';

class BookForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isbn: '',
      title: '',
      author: '',
      quantity: '',
      description: '',
      category: 'unsorted',
      errors: {},
      loading: false,
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    if (!this.state.errors[e.target.name]) {
      const errors = Object.assign({}, this.state.errors);
      delete errors[e.target.name];
      this.setState({
        [e.target.name]: e.target.value,
        errors,
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    // Validation
    const errors = {};
    if (this.state.isbn === '') errors.isbn = 'Can\'t be empty';
    if (this.state.title === '') errors.title = 'Can\'t be empty';
    if (this.state.author === '') errors.author = 'Can\'t be empty';
    if (this.state.quantity === '') errors.quantity = 'Can\'t be empty and must be number';
    if (this.state.description === '') errors.description = 'Can\'t be empty';
    if (this.state.category === '') errors.category = 'Can\'t be empty';
    this.setState({ errors });
    const isValid = Object.keys(errors).length === 0;

    if (isValid) {
      const { isbn, title, author, description, quantity, category } = this.state;
      // this.setState({ loading: true });
      this.props.saveBook({ isbn, title, author, description, quantity, category });
    }
  }

  render() {
    return (
      <div>
        {!!this.state.errors.global && <div className="alert-danger">{this.state.errors.global}</div>}
        <h4 className="white-text center-align">Add New Book</h4>
        <form onSubmit={this.handleSubmit}>
          <div className={classnames('input-field col s12', { 'has-error': !!this.state.errors.isbn })}>
            <i className="fa fa-list-ol prefix white-text" />
            <input
              id="icon_prefix"
              name="isbn"
              onChange={this.onChange}
              value={this.state.isbn}
              placeholder="ISBN"
              type="text"
              className="white-text validate"
            /><br />
            <span style={{ textAlign: 'left', marginLeft: '45px' }} className="has-error">{this.state.errors.isbn}</span>
          </div>
          <div className={classnames('input-field col s12', { 'has-error': !!this.state.errors.title })}>
            <i className="fa fa-pencil prefix white-text" />
            <input id="icon_prefix" name="title" onChange={this.onChange} value={this.state.title} placeholder="Title" type="text" className="white-text validate" />
            <span style={{ textAlign: 'left', marginLeft: '45px' }} className="help-block">{this.state.errors.title}</span>
          </div>
          <div className={classnames('input-field col s12', { 'has-error': !!this.state.errors.author })}>
            <i className="fa fa-user-circle prefix white-text" />
            <input id="icon_telephone" name="author" onChange={this.onChange} value={this.state.author} placeholder="Author" type="tel" className="white-text validate" />
            <span style={{ textAlign: 'left', marginLeft: '45px' }}>{this.state.errors.author}</span>
          </div>
          <div className={classnames('input-field col s12', { 'has-error': !!this.state.errors.quantity })}>
            <i className="fa fa-plus-circle prefix white-text" />
            <input id="icon_telephone" name="quantity" onChange={this.onChange} value={this.state.quantity} placeholder="Quantity" type="number" className="white-text validate" />
            <span style={{ textAlign: 'left', marginLeft: '45px' }}>{this.state.errors.quantity}</span>
          </div>
          <div className={classnames('input-field col s12', { 'has-error': !!this.state.errors.description })}>
            <i className="fa fa-edit prefix white-text" />
            <textarea id="description" name="description" onChange={this.onChange} value={this.state.description} rows="50" cols="50" className="materialize-textarea white-text validate" placeholder="Enter description" />
            <span style={{ textAlign: 'left', marginLeft: '45px' }}>{this.state.errors.description}</span>
          </div>
          <div className={classnames('input-field col s12', { 'has-error': !!this.state.errors.category })}>
            <i className="fa fa-list fa-2x prefix white-text" />
            <select onChange={this.onChange} value="{this.state.category}" className="white-text">
              <option value="" disabled>Choose your option</option>
              <option value="1">Unsorted</option>
              <option value="1">Finance</option>
              <option value="1">Science</option>
              <option value="1">Computers</option>
              <option value="1">Arts</option>
              <option value="1">History</option>
            </select>
            <span style={{ textAlign: 'left', marginLeft: '45px' }}>{this.state.errors.category}</span>
          </div>
          <div className="center-align col s12">
            <button type="submit" className="btn waves-effect teal" disabled={classnames(this.state.loading ? 'disabled' : '')} ><i className="fa fa-send" /> Add Book</button>
          </div>
        </form>
      </div>
    );
  }
}

BookForm.propTypes = {
  saveBook: PropTypes.func.isRequired,
};

export default connect(null, { saveBook })(BookForm);
