import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Input } from 'react-materialize';
import Dropzone from 'react-dropzone';
import SingleInputWithIcon from '../../forms/SingleInputWithIcon';
import TextAreaInput from '../../forms/TextAreaInput';
import droploader from '../../../../public/images/dropzone.gif';
import UpdateBookDetails from '../../library/admin/UpdateBookDetails';

/**
 * @description represents form used in Adding a Book detail
 *
 * @param {object} props
 *
 * @returns {string} - HTML markup of CategoryList component
 */
const BookForm = (props) => {
  const { errors, submitForm, formChange, uploadFile, loading, book,
    dropzoneLoader } = props;
  const { id, isbn, title, author, quantity, description, categoryId, image }
  = book;
  const style = {
    marginLeft: '25%',
    width: '50%',
    fit: { height: '200px', position: 'absolute' },
  };
  const selectorOptions = props.categories.map(category =>
    (<option key={category} value={category.id}>
      {category.title}
    </option>),
  );

  return (
    <div>
      {props.book.id ? <UpdateBookDetails book={props.book} /> : ''}
      <form onSubmit={submitForm}>
        <SingleInputWithIcon
          placeholder="ISBN"
          identifier="isbn"
          inputName="isbn"
          inputType="text"
          inputClass={`validate isbn${id}`}
          controlFunc={formChange}
          content={isbn || ''}
          fieldError={errors.isbn}
          iconClass={'fa fa-list-ol prefix'}
        />
        <SingleInputWithIcon
          placeholder="Title"
          identifier="title"
          inputName="title"
          inputType="text"
          inputClass={`validate title${id}`}
          controlFunc={formChange}
          content={title || ''}
          fieldError={errors.title}
          iconClass={'fa fa-pencil prefix'}
        />
        <SingleInputWithIcon
          placeholder="Author"
          identifier="author"
          inputName="author"
          inputType="text"
          inputClass="validate"
          controlFunc={formChange}
          content={author || ''}
          fieldError={errors.author}
          iconClass={'fa fa-user-circle prefix'}
        />
        <SingleInputWithIcon
          placeholder="Quantity"
          identifier="quantity"
          inputName="quantity"
          inputType="text"
          inputClass={`validate quantity${id}`}
          controlFunc={formChange}
          content={quantity || ''}
          fieldError={errors.quantity}
          iconClass={'fa fa-plus-circle prefix'}
        />
        <TextAreaInput
          placeholder="Enter description"
          identifier="description"
          name="description"
          rows={50}
          cols={50}
          content={description || ''}
          controlFunc={formChange}
          fieldError={errors.description}
        />
        <div
          id="category-list-area"
          className={classnames('input-field col s12',
            { 'has-error': !!errors.category })}
        >
          <i className="fa fa-list fa-2x prefix " />
          <Input
            id="categoryId"
            style={{ marginLeft: '44px !important' }}
            name="categoryId"
            type="select"
            defaultValue={categoryId || ''}
            onChange={formChange}
          >
            <option disabled value="">Please select a category</option>
            {selectorOptions}
          </Input>
          <span style={{ textAlign: 'left', marginLeft: '45px' }}>
            {errors.category}</span>
        </div>
        <p>Drop book image file below or click below to upload</p>
        <Dropzone
          id="image-upload-container"
          onDrop={uploadFile}
          multiple
          accept="image/*"
        >
          {dropzoneLoader
            && <img style={style} src={droploader} alt="" />}
          {!dropzoneLoader
            && <img
              style={style.fit}
              src={image || ''}
              alt=""
              className="card"
            />}
        </Dropzone>
        <div className="center-align col s12">
          <button
            type="submit"
            id="save-book"
            className={
              `btn waves-effect teal save-update${id}`
            }
            disabled={classnames(loading ? 'disabled' : '')}
          >
            <i className="fa fa-send" />
            {id ? 'Save' : 'Add Book'}
          </button>
        </div>
      </form>
    </div>
  );
};

BookForm.defaultProps = {
  book: {
    id: null,
    isbn: null,
    title: '',
    author: '',
    description: '',
    quantity: null,
    categoryId: null,
    image: '',
    createdAt: '',
  },
  errors: {}
};

// Type checking for BookForm component
BookForm.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  book: PropTypes.shape({
    id: PropTypes.number,
    isbn: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    description: PropTypes.string,
    quantity: PropTypes.number,
    categoryId: PropTypes.number,
    image: PropTypes.string,
    createdAt: PropTypes.string,
  }),
  errors: PropTypes.shape({}),
  submitForm: PropTypes.func.isRequired,
  formChange: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  dropzoneLoader: PropTypes.bool.isRequired,
};

export default BookForm;
