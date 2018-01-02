import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';

/**
 * Abstracts Input form fields with Icon
 *
 * @description abstracts the input form fields with icons
 *
 * @param {object} props - The properties passed into the component
 *
 * @returns {void} returns nothing
 */
const SingleInputWithIcon = props => (
  <div
    className={
      classname('input-field col s12', { 'has-error': !!props.fieldError })}
  >
    <i className={props.iconClass} />
    <input
      placeholder={props.placeholder}
      id={props.identifier}
      type={props.inputType}
      className={props.inputClass}
      name={props.inputName}
      onChange={props.controlFunc}
      value={props.content}
    /><br />
    <span
      style={{ textAlign: 'left', marginLeft: '45px' }}
      className="has-error"
    >{props.fieldError}</span>
  </div>
);

SingleInputWithIcon.propTypes = {
  identifier: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  fieldError: PropTypes.string,
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
  ]),
  iconClass: PropTypes.string.isRequired,
};

SingleInputWithIcon.defaultProps = {
  fieldError: '',
  inputClass: '',
  placeholder: '',
  content: undefined
};

export default SingleInputWithIcon;

