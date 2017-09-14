import React, { Component } from 'react';

export default class BookForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isbn: '',
      title: '',
      author: '',
      quantity: '',
      description: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    //this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e, title) {
    e.preventDefault();
    console.log('hi');
    this.setState({ title });
  }

  render() {
    return (
      <div>
        <h4 className="white-text center-align">Add New Book</h4>
        <form onSubmi={this.onSubmit}>
          <div className="input-field col s12">
            <i className="fa fa-list-ol prefix white-text" />
            <input id="icon_prefix" name="isbn" onChange={this.onChange} value={this.state.isbn} placeholder="ISBN" type="text" className="white-text validate" />
          </div>
          <div className="input-field col s12">
            <i className="fa fa-pencil prefix white-text" />
            <input id="icon_prefix" name="title" onChange={this.onChange} value={this.state.title} placeholder="Title" type="text" className="white-text validate" />
          </div>
          <div className="input-field col s12">
            <i className="fa fa-user-circle prefix white-text" />
            <input id="icon_telephone" name="author" onChange={this.onChange} value={this.state.author} placeholder="Author" type="tel" className="white-text validate" />
          </div>
          <div className="input-field col s12">
            <i className="fa fa-plus-circle prefix white-text" />
            <input id="icon_telephone" name="quantity" onChange={this.onChange} value={this.state} placeholder="Quantity" type="tel" className="white-text validate" />
          </div>
          <div className="input-field col s12">
            <i className="fa fa-edit prefix white-text" />
            <textarea id="description" name="description" onChange={this.onChange} value={this.state.description} rows="50" cols="50" className="materialize-textarea white-text validate" placeholder="Enter description" />
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
          <div className="center-align col s12">
            <button type="submit" className="btn waves-effect teal"><i className="fa fa-send" /> Add Book</button>
          </div>
        </form>
      </div>
    );
  }
}
