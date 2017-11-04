import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextAreaInput = props => (
  <div className={classnames('input-field col s12', { 'has-error': !!props.fieldError })}>
    <i className="fa fa-edit prefix " />
    <textarea
      id={props.identifier}
      className="materialize-textarea validate"
      name={props.name}
      rows={props.rows}
      cols={props.cols}
      value={props.content}
      onChange={props.controlFunc}
      placeholder={props.placeholder}
    />
    <span style={{ textAlign: 'left', marginLeft: '45px' }}>{props.fieldError}</span>
  </div>
);

TextAreaInput.propTypes = {
  fieldError: PropTypes.string,
  identifier: PropTypes.string.isRequired,
  rows: PropTypes.number.isRequired,
  cols: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  controlFunc: PropTypes.func.isRequired,
};

TextAreaInput.defaultProps = {
  fieldError: '',
};

export default TextAreaInput;
