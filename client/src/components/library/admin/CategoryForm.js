import React, { Component } from 'react';

export default class CategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log('hi');
  }

  render() {
    return (
      <div>
        <h4 className="white-text center-align">Add New Category</h4>
        <form onSubmit={this.onSubmit}>
          <div className="input-field col s12">
            <i className="fa fa-pencil prefix white-text" />
            <input id="icon_prefix" onChange={this.onChange} name="title" placeholder="Category Name" type="text" value={this.state.title} className="white-text validate" />
          </div>
          <div className="center-align col s12">
            <button type="submit" className="btn waves-effect teal"><i className="fa fa-plus" /> Create Category</button>
          </div>
        </form>
      </div>
    );
  }
}
