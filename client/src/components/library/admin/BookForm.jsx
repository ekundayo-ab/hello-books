import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Input } from 'react-materialize';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import SingleInputWithIcon from '../../forms/SingleInputWithIcon';
import TextAreaInput from '../../forms/TextAreaInput';
import { saveBook, updateBook } from './../../../actions/bookActions';
import { fetchCategories } from './../../../actions/categoryActions';
import Validators from './../../../helpers/validators';
import handleDrop from './../../../helpers/utilities';
import droploader from '../../../../public/images/dropzone.gif';
import UpdateBookDetails from '../../library/admin/UpdateBookDetails';

/**
 * @description represents form used in Adding a Book detail
 * @class BookForm
 * @extends {Component}
 */
class BookForm extends Component {
  /**
   * Creates an instance of BookForm.
   * @param {object} props
   * @memberof BookForm
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.book.id ? this.props.book.id : '',
      isbn: this.props.book.isbn ? this.props.book.isbn : '',
      title: this.props.book.title ? this.props.book.title : '',
      author: this.props.book.author ? this.props.book.author : '',
      quantity: this.props.book.quantity ? this.props.book.quantity : '',
      description: this.props.book.description ?
        this.props.book.description : '',
      image: this.props.book.image ? this.props.book.image : '',
      category: this.props.book.category ? this.props.book.category : '',
      errors: {},
      loading: false,
      coverUploaded: false,
      dropzoneLoader: false,
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  /**
   * @description Invoked after component has mounted
   * @param {void} null
   * @returns {void} returns nothing
   * @memberof BookForm
   */
  componentDidMount() {
    this.props.fetchCategories();
  }

  /**
   * @description handles changes to the input fields value
   * @param {object} event
   * @returns {void} returns nothing
   * @memberof BookForm
   */
  onChange(event) {
    if (!this.state.errors[event.target.name]) {
      const errors = Object.assign({}, this.state.errors);
      delete errors[event.target.name];
      this.setState({
        [event.target.name]: event.target.value,
        errors,
      });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  /**
   * @description handles file upload to cloudinary
   * @param {array} files
   * @returns {string} // Image url from cloudinary
   * @memberof BookForm
   */
  handleFileUpload(files) {
    this.setState({ dropzoneLoader: true });
    handleDrop(files).then((cloudinaryResponse) => {
      if (cloudinaryResponse.imageUploaded) {
        this.setState({ coverUploaded: true });
        return this.setState({
          dropzoneLoader: false,
          image: cloudinaryResponse.data.secure_url });
      }
      return cloudinaryResponse;
    });
  }

  /**
   * @description handles Book update form submission
   * @param {object} event
   * @returns {void} returns nothing
   * @memberof BookForm
   */
  handleSubmit(event) {
    event.preventDefault();
    const { isValid, errors } = Validators.validateBookForm(this.state);
    if (!isValid) this.setState({ errors });
    if (isValid) {
      const { id, isbn, title, author,
        description, quantity, category, image } = this.state;
      if (id) {
        updateBook({
          id,
          isbn,
          title,
          author,
          description,
          quantity,
          category,
          image
        })
          .then((res) => {
            if (!res.isDone) {
              this.setState({ errors: res.result.errors, loading: false });
            }
          });
      } else {
        saveBook({
          isbn,
          title,
          author,
          description,
          quantity,
          category,
          image
        })
          .then((res) => {
            if (res.isDone) {
              this.setState({ errors: {}, loading: false });
              this.setState({
                isbn: '',
                title: '',
                author: '',
                description: '',
                quantity: '',
                image: '',
                category: 'Unsorted',
              });
            }
          });
      }
    }
  }

  /**
   * @description displays the form for updating
   * @param {void} null
   * @returns {string} - HTML markup for the form
   * @memberof BookForm
   */
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
    const selectorOptions = this.props.categories.map(category =>
      (
        <option key={category} value={category.title}>
          {category.title}
        </option>
      ),
    );
    return (
      <div>
        {this.state.id ? <UpdateBookDetails book={this.props.book} /> : ''}
        {!!this.state.errors.global && <div className="alert-danger">
          {this.state.errors.global}</div>}
        <form onSubmit={this.handleSubmit}>
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
          <div className={classnames('input-field col s12',
            { 'has-error': !!this.state.errors.category })}
          >
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
            <span style={{ textAlign: 'left', marginLeft: '45px' }}>
              {this.state.errors.category}</span>
          </div>
          <p>Drop book image file below or click below to upload</p>
          <Dropzone
            onDrop={this.handleFileUpload}
            multiple
            accept="image/*"
          >
            {this.state.dropzoneLoader
              && <img style={style} src={droploader} alt="" />}
            {!this.state.dropzoneLoader
              && <img
                style={style.fit}
                src={this.state.image}
                alt=""
                className="card"
              />}
          </Dropzone>
          <div className="center-align col s12">
            <button
              type="submit"
              className="btn waves-effect teal"
              disabled={classnames(this.state.loading ? 'disabled' : '')}
            >
              <i className="fa fa-send" />
              {this.state.id ? 'Save' : 'Add Book'}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

BookForm.defaultProps = {
  book: {
    id: null,
    isbn: null,
    title: '',
    author: '',
    description: '',
    quantity: null,
    category: '',
    image: '',
    createdAt: '',
  }
};

// Type checking for BookForm component
BookForm.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchCategories: PropTypes.func.isRequired,
  book: PropTypes.shape({
    id: PropTypes.number,
    isbn: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    description: PropTypes.string,
    quantity: PropTypes.number,
    category: PropTypes.string,
    image: PropTypes.string,
    createdAt: PropTypes.string,
  }),
};

/**
 * @description maps the state in redux store to BookForm props
 * @param {object} state
 * @returns {object} categories
 */
function mapStateToProps(state) {
  return {
    categories: state.categoryReducer.categories,
  };
}

export default connect(mapStateToProps, {
  saveBook, fetchCategories })(BookForm);
