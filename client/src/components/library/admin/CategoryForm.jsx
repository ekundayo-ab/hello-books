import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Helper from '../../../helpers/Helper';
import { saveCategory } from '../../../actions/categoryActions';

/**
 * @description represents form for adding Category
 *
 * @class CategoryForm
 *
 * @extends {Component}
 */
export class CategoryForm extends Component {
  /**
   * Creates an instance of CategoryForm.
   *
   * @param {object} props
   *
   * @memberof CategoryForm
   *
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      errors: {},
      loading: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @description handles changes to the input fields value
   *
   * @param {object} event
   *
   * @returns {void} nothing
   *
   * @memberof CategoryForm
   */
  onChange(event) {
    const categoryState = this.state;
    const formChanges = Helper.handleFormChange(categoryState, event);
    this.setState(formChanges);
  }

  /**
   * @description handles Category form submission
   *
   * @param {object} event
   *
   * @returns {string} alert message
   *
   * @memberof CategoryForm
   */
  onSubmit(event) {
    event.preventDefault();
    const errors = {};
    if (this.state.title === '') {
      errors.title = 'Field cannot be empty';
      this.setState({ errors });
    }
    const isValid = Object.keys(errors).length === 0;
    if (isValid) {
      this.setState({ errors: {}, isLoading: true });
      this.props.saveCategory(this.state)
        .then((response) => {
          if (response.isDone) $('#category-form-modal').modal('close');
          this.setState({ title: '' });
        });
    }
  }

  /**
   * @description displays the form for adding category
   *
   * @param {void} null
   *
   * @returns {string} - HTML markup for the form
   *
   * @memberof CategoryForm
   */
  render() {
    const { errors } = this.state;
    return (
      <div id="category-form">
        <form onSubmit={this.onSubmit}>
          <div className={classnames('input-field', 'col s12',
            { 'has-error': errors.title })}
          >
            <i className="fa fa-pencil prefix" />
            <input
              id="category-title"
              onChange={this.onChange}
              name="title"
              placeholder="Category Name"
              type="text"
              value={this.state.title}
              className="validate"
            />
            {errors.title
              && <span className="help-block">{errors.title}</span> }
          </div>
          <div className="center-align col s12">
            <button
              id="save-category"
              type="submit"
              className="btn waves-effect teal"
            >
              <i className="fa fa-plus" /> Create Category</button>
          </div>
        </form>
      </div>
    );
  }
}

CategoryForm.propTypes = {
  saveCategory: PropTypes.func.isRequired
};

export default connect(null, { saveCategory })(withRouter(CategoryForm));
