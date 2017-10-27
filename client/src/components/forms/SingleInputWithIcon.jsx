import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';

const SingleInputWithIcon = props => (
  <div className={classname('input-field col s12', { 'has-error': !!props.fieldError })}>
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
    <span style={{ textAlign: 'left', marginLeft: '45px' }} className="has-error">{props.fieldError}</span>
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
  ]).isRequired,
  iconClass: PropTypes.string.isRequired,
};

SingleInputWithIcon.defaultProps = {
  fieldError: null,
  inputClass: '',
  placeholder: '',
};

export default SingleInputWithIcon;

