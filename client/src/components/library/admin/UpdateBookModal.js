import React, { Component } from 'react';
import img3 from '../../../../public/images/3.png';

export default class UpdateBookModal extends Component {
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
        <div className="modal-content">
          <div className="row">
            <div className="center-align book-detail col s12 m6 l4">
              <img className="center-align detail responsive-img" src={img3} alt="" />
            </div>
            <div className="col s12 m6 l6">
              <h1>Wolf Hall</h1>
              <h5 className="teal-text">Hilary Mantel</h5>
              <p>
                  Lorem Ipsum dolor ameti, story of Wolf hall has a good ending
                  with accompanying drama, suspense and intrigue, this is a real
                  master deal, youll like it.
              </p>
              <p className="white-text badge green" style={{ display: 'block', padding: '5px !important' }}>
                <b>Total:</b> 28 <b>Borrowed:</b> 17 <b>Available:</b> 11
              </p>
              <blockquote style={{ borderLeft: '5px solid green' }}>Added on 16th of January, 2016</blockquote>
            </div>
          </div>
          <div className="row">
            <h4 className="center-align">Modify Book Information</h4>
            <div className="col s12">
              <form onSubmit={this.handleSubmit} >
                <div className="input-field col s12">
                  <i className="fa fa-pencil prefix teal-text" />
                  <input id="icon_prefix" onChange={this.onChange} value="Wolf Hall" placeholder="Title" type="text" className="dark-text validate" />
                </div>
                <div className="input-field col s12">
                  <i className="fa fa-list-ol prefix teal-text" />
                  <input id="icon_prefix" onChange={this.onChange} value="236470BCD" placeholder="ISBN" type="text" className="dark-text validate" />
                </div>
                <div className="input-field col s12">
                  <i className="fa fa-user-circle prefix teal-text" />
                  <input id="icon_telephone" onChange={this.onChange} value="Hilary Mantel" placeholder="Author" type="tel" className="dark-text validate" />
                </div>
                <div className="input-field col s12">
                  <i className="fa fa-plus-circle prefix teal-text" />
                  <input id="icon_telephone" onChange={this.onChange} value="28" placeholder="Quantity" type="tel" className="dark-text validate" />
                </div>
                <div className="input-field col s12">
                  <i className="fa fa-edit prefix teal-text" />
                  <textarea
                    id="description"
                    rows="50"
                    cols="50"
                    className="dark-text validate materialize-textarea"
                    placeholder="Enter description"
                    defaultValue="Lorem Ipsum dolor ameti, story of Wolf hall has a good ending with accompanying drama, suspense and intrigue, this is a real master deal, youll like it."
                    onChange={this.onChange}
                  />
                </div>
                <div className="col s12">
                  <i className="fa fa-list fa-2x prefix teal-text" />
                  <select onChange={this.onChange} value={this.state.category} className="white-text">
                    <option value="" disabled>Choose your option</option>
                    <option value="1">Unsorted</option>
                    <option value="1">Finance</option>
                    <option value="1">Science</option>
                    <option value="1">Computers</option>
                    <option value="1">Arts</option>
                    <option value="1">History</option>
                  </select>
                </div>
                <div className="center-align col s12">
                  <button type="submit" className="btn waves-effect teal"><i className="fa fa-send" /> Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
        </div>
      </div>
    );
  }
}
