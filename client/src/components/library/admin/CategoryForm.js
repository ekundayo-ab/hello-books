import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { saveCategory } from '../../../actions/categoryActions';
import { addFlashMessage } from '../../../actions/messageActions';
import FlashMessagesList from '../../../components/flash/FlashMessagesList';

class CategoryForm extends Component {
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

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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

  onSubmit(e) {
    e.preventDefault();
    const errors = {};
    if (this.state.title === '') {
      errors.title = 'Field cannot be empty';
      this.setState({ errors });
    }
    const isValid = Object.keys(errors).length === 0;
    if (isValid) {
      this.setState({ errors: {}, isLoading: true });
      saveCategory(this.state)
        .then((response) => {
          if (response.isDone) {
            return this.props.addFlashMessage({
              type: 'success',
              text: response.res.message,
            });
          }
          return this.props.addFlashMessage({
            type: 'error',
            text: response.errors.message,
          });
        });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        {this.props.location.pathname === '/admin' && <FlashMessagesList />}
        <form onSubmit={this.onSubmit}>
          <div className={classnames('input-field', 'col s12', { 'has-error': errors.title })}>
            <i className="fa fa-pencil prefix" />
            <input
              id="icon_prefix"
              onChange={this.onChange}
              name="title"
              placeholder="Category Name"
              type="text"
              value={this.state.title}
              className="validate"
            />
            {errors.title && <span className="help-block">{errors.title}</span> }
          </div>
          <div className="center-align col s12">
            <button type="submit" className="btn waves-effect teal"><i className="fa fa-plus" /> Create Category</button>
          </div>
        </form>
      </div>
    );
  }
}

CategoryForm.propTypes = {
  location: PropTypes.object.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
};

export default connect(null, { saveCategory, addFlashMessage })(withRouter(CategoryForm));
