import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'react-materialize';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { handleDrop } from './../../../helpers/utilities';
import { saveBook, updateBook } from './../../../actions/bookActions';
import SingleInputWithIcon from '../../forms/SingleInputWithIcon';
import TextAreaInput from '../../forms/TextAreaInput';
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
    this.handleFileUpload = this.handleFileUpload.bind(this);
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

  handleFileUpload(files) {
    this.setState({ dropzoneLoader: true });
    handleDrop(files).then((cloudinaryResponse) => {
      if (cloudinaryResponse.imageUploaded) {
        this.setState({ coverUploaded: true });
        return this.setState({ dropzoneLoader: false, image: cloudinaryResponse.data.secure_url });
      }
      return cloudinaryResponse;
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const errors = {};
    const isbnField = `${this.state.isbn}`;
    if (isbnField.trim() === '' || isNaN(this.state.isbn)) {
      errors.isbn = 'Can\'t be empty and must be number';
    }
    if (this.state.title.trim() === '') errors.title = 'Can\'t be empty';
    if (this.state.author.trim() === '') errors.author = 'Can\'t be empty';
    if (this.state.quantity === '' || isNaN(this.state.quantity)) {
      errors.quantity = 'Can\'t be empty and must be number';
    }
    if (this.state.description.trim() === '') errors.description = 'Can\'t be empty';
    if (this.state.category.trim() === '') errors.category = 'Can\'t be empty';
    this.setState({ errors });
    const isValid = Object.keys(errors).length === 0;

    if (isValid) {
      const { id, isbn, title, author, description, quantity, category, image } = this.state;
      // this.setState({ loading: true });

      if (id) {
        updateBook({ id, isbn, title, author, description, quantity, category, image })
          .then((res) => {
            Materialize.toast(
              res.isDone ? res.result.message : res.result.errors.message,
              3000,
              res.isDone ? 'green' : 'red',
            );
            if (!res.isDone) {
              this.setState({ errors: res.result.errors, loading: false });
            }
          });
      }
    }
  }

  render() {
    const { errors } = this.state;
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
              <SingleInputWithIcon
                placeholder="ISBN"
                identifier="icon_prefix"
                inputName="isbn"
                inputType="text"
                inputClass="validate"
                controlFunc={this.onChange}
                content={this.state.isbn}
                fieldError={errors.isbn}
                iconClass={'fa fa-list-ol prefix'}
              />
              <SingleInputWithIcon
                placeholder="Title"
                identifier="icon_prefix"
                inputName="title"
                inputType="text"
                inputClass="validate"
                controlFunc={this.onChange}
                content={this.state.title}
                fieldError={errors.title}
                iconClass={'fa fa-pencil prefix'}
              />
              <SingleInputWithIcon
                placeholder="Author"
                identifier="icon_prefix"
                inputName="author"
                inputType="text"
                inputClass="validate"
                controlFunc={this.onChange}
                content={this.state.author}
                fieldError={errors.author}
                iconClass={'fa fa-user-circle prefix'}
              />
              <SingleInputWithIcon
                placeholder="Quantity"
                identifier="icon_prefix"
                inputName="quantity"
                inputType="text"
                inputClass="validate"
                controlFunc={this.onChange}
                content={this.state.quantity}
                fieldError={errors.quantity}
                iconClass={'fa fa-plus-circle prefix'}
              />
              <TextAreaInput
                placeholder={'Enter description'}
                identifier={'description'}
                name={'description'}
                rows={50}
                cols={50}
                controlFunc={this.onChange}
                content={this.state.description}
                fieldError={errors.description}
              />
              <div className={classnames('input-field col s12', { 'has-error': !!this.state.errors.category })}>
                <i className="fa fa-list fa-2x prefix " />
                <Input
                  style={{ marginLeft: '44px !important' }}
                  defaultValue={this.state.category}
                  name="category"
                  type="select"
                  onChange={this.onChange}
                >
                  <option value="">Unsorted</option>
                  {selectorOptions}
                </Input>
                <span style={{ textAlign: 'left', marginLeft: '45px' }}>{this.state.errors.category}</span>
              </div>
              <p>Drop book image file below or click below to upload</p>
              <Dropzone
                onDrop={this.handleFileUpload}
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

UpdateBookModal.defaultProps = {
  book: {},
};

UpdateBookModal.propTypes = {
  categories: PropTypes.array.isRequired,
  book: PropTypes.object,
};

function mapStateToProps(state, props) {
  return {
    book: state.books.find(item => item.id === props.book.id),
    categories: state.categories,
  };
}

export default connect(mapStateToProps, { saveBook, updateBook })(UpdateBookModal);
