import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';

const SingleInput = props => (
  <div className={classname('input-field', 'col s12', { 'has-error': props.fieldError })}>
    <input
      placeholder={props.placeholder}
      id={props.identifier}
      type={props.inputType}
      className={props.inputClass}
      name={props.inputName}
      onChange={props.controlFunc}
      onBlur={props.effectFunc}
      value={props.content}
    />
    {props.fieldError && <span className="help-block">{props.fieldError}</span> }
  </div>
);

SingleInput.propTypes = {
  identifier: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  fieldError: PropTypes.string,
  effectFunc: PropTypes.func,
  controlFunc: PropTypes.func.isRequired,
  inputClass: PropTypes.string,
  inputName: PropTypes.string.isRequired,
  inputType: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  placeholder: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

SingleInput.defaultProps = {
  fieldError: null,
  inputClass: '',
  effectFunc: null,
  placeholder: '',
};

export default SingleInput;

