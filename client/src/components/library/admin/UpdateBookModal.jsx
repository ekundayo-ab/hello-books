import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'react-materialize';
import axios from 'axios';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { saveBook, updateBook } from './../../../actions/bookActions';
import droploader from '../../../../public/images/dropzone.gif';

class UpdateBookModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.book ? this.props.book.id : '',
      isbn: this.props.book ? this.props.book.isbn : '',
      title: this.props.book ? this.props.book.title : '',
      author: this.props.book ? this.props.book.author : '',
      quantity: this.props.book ? this.props.book.quantity : '',
      description: this.props.book ? this.props.book.description : '',
      category: this.props.book ? this.props.book.category : '',
      image: this.props.book ? this.props.book.image : '',
      errors: {},
      loading: false,
      coverUploaded: false,
      dropzoneLoader: false,
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
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

  handleDrop(files) {
    // Push all the axios request promise into a single array
    const uploaders = files.map((file) => {
      // Initial FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'bdnqjpo9'); // Replace the preset name with your own
      formData.append('api_key', '135232672986957'); // Replace API key with your own Cloudinary key
      formData.append('timestamp', (Date.now() / 1000) | 0); // eslint-disable-line no-bitwise
      this.setState({ dropzoneLoader: true });
      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      return axios.post('https://api.cloudinary.com/v1_1/dcl7tqhww/image/upload', formData, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        transformRequest: [(data, headers) => {
          delete headers.common['x-access-token']; // eslint-disable-line no-param-reassign
          return data;
        }],
      }).then((response) => {
        const data = response.data;
        // You should store this URL for future references in your app
        // const fileURL = data.secure_url;
        this.setState({ dropzoneLoader: false, image: data.url });
      });
    });
    // Once all the files are uploaded
    axios.all(uploaders).then(() => {
      this.setState({ coverUploaded: true });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
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
      const { id, isbn, title, author, description, quantity, category, image } = this.state;
      // this.setState({ loading: true });

      if (id) {
        updateBook({ id, isbn, title, author, description, quantity, category, image })
          .then((res) => {
            console.log(res);
            Materialize.toast(
              res.isDone ? res.result.message : res.result.errors.message,
              3000,
              res.isDone ? 'green' : 'red',
            );
            if (!res.isDone) {
              this.setState({ errors: res.result.errors, loading: false });
            }
          });
      } else {
        saveBook({ isbn, title, author, description, quantity, category, image })
          .then((res) => {
            Materialize.toast(
              res.isDone ? res.res.message : res.errors.message,
              3000,
              res.isDone ? 'green' : 'red',
            );
            if (res.isDone) {
              this.setState({
                isbn: '',
                title: '',
                author: '',
                description: '',
                quantity: '',
                category: 'Unsorted',
              });
            }
          });
      }
    }
  }

  render() {
    const style = {
      marginLeft: '25%',
      width: '50%',
      fit: {
        height: '200px',
        position: 'absolute',
      },
    };
    const selectorOptions = this.props.categories.map(option =>
      (
        <option key={option.id} value={option.title}>
          {option.title}
        </option>
      ),
    );
    const dateCreated = new Date(this.props.book.createdAt);
    return (
      <div>
        <div className="row">
          <div className="center-align book-detail col s12 m6 l4">
            <img className="center-align detail responsive-img" src={this.props.book.image} alt="" />
          </div>
          <div className="col s12 m6 l6">
            <h1>{this.props.book.title}</h1>
            <h5 className="teal-text">{this.props.book.author}</h5>
            <p>{this.props.book.description}</p>
            <p className="white-text badge green" style={{ display: 'block', padding: '5px !important' }}>
              <b>Total:</b> 28 <b>Borrowed:</b> 17 <b>Available:</b> 11
            </p>
            <blockquote style={{ borderLeft: '5px solid green' }}>Added on { dateCreated.toUTCString() }</blockquote>
          </div>
        </div>
        <div className="row">
          <h4 className="center-align">Modify Book Information</h4>
          <div className="col s12">
            <form onSubmit={this.handleSubmit} >
              <div className={classnames('input-field col s12', { 'has-error': !!this.state.errors.isbn })}>
                <i className="fa fa-list-ol prefix " />
                <input
                  id="icon_prefix"
                  name="isbn"
                  onChange={this.onChange}
                  value={this.state.isbn}
                  placeholder="ISBN"
                  type="text"
                  className=" validate"
                /><br />
                <span style={{ textAlign: 'left', marginLeft: '45px' }} className="has-error">{this.state.errors.isbn}</span>
              </div>
              <div className={classnames('input-field col s12', { 'has-error': !!this.state.errors.title })}>
                <i className="fa fa-pencil prefix " />
                <input id="icon_prefix" name="title" onChange={this.onChange} value={this.state.title} placeholder="Title" type="text" className=" validate" />
                <span style={{ textAlign: 'left', marginLeft: '45px' }} className="help-block">{this.state.errors.title}</span>
              </div>
              <div className={classnames('input-field col s12', { 'has-error': !!this.state.errors.author })}>
                <i className="fa fa-user-circle prefix " />
                <input id="icon_telephone" name="author" onChange={this.onChange} value={this.state.author} placeholder="Author" type="tel" className=" validate" />
                <span style={{ textAlign: 'left', marginLeft: '45px' }}>{this.state.errors.author}</span>
              </div>
              <div className={classnames('input-field col s12', { 'has-error': !!this.state.errors.quantity })}>
                <i className="fa fa-plus-circle prefix " />
                <input id="icon_telephone" name="quantity" onChange={this.onChange} value={this.state.quantity} placeholder="Quantity" type="number" className=" validate" />
                <span style={{ textAlign: 'left', marginLeft: '45px' }}>{this.state.errors.quantity}</span>
              </div>
              <div className={classnames('input-field col s12', { 'has-error': !!this.state.errors.description })}>
                <i className="fa fa-edit prefix " />
                <textarea id="description" name="description" onChange={this.onChange} value={this.state.description} rows="50" cols="50" className="materialize-textarea  validate" placeholder="Enter description" />
                <span style={{ textAlign: 'left', marginLeft: '45px' }}>{this.state.errors.description}</span>
              </div>
              <div className={classnames('input-field col s12', { 'has-error': !!this.state.errors.category })}>
                <i className="fa fa-list fa-2x prefix " />
                <Input
                  style={{ marginLeft: '44px !important' }}
                  defaultValue={this.state.category}
                  name="category"
                  type="select"
                  onChange={this.onChange}
                >
                  <option value="Unsorted">Unsorted</option>
                  {selectorOptions}
                </Input>
                <span style={{ textAlign: 'left', marginLeft: '45px' }}>{this.state.errors.category}</span>
              </div>
              <p>Drop book image file below or click below to upload</p>
              <Dropzone
                onDrop={this.handleDrop}
                multiple
                accept="image/*"
              >
                {this.state.dropzoneLoader && <img style={style} src={droploader} alt="" />}
                {!this.state.dropzoneLoader && <img style={style.fit} src={this.state.image} alt="" className="card" />}
              </Dropzone>
              <div className="center-align col s12">
                <button type="submit" className="btn waves-effect teal"><i className="fa fa-send" /> Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

UpdateBookModal.propTypes = {
  book: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
};

function mapStateToProps(state, props) {
  return {
    book: state.books.find(item => item.id === props.book.id),
    categories: state.categories,
  };
}

export default connect(mapStateToProps, { saveBook, updateBook })(UpdateBookModal);
