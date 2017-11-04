/* eslint-disable react/prefer-stateless-function */
import React from 'react';

const ForgotPassword = () =>
  (
    <div id="forgot">
      <div className="row">
        <form method="get" action="profile.html">
          <div className="input-field col s12">
            <input placeholder="Enter Email" id="email" type="text" className="validate" />
          </div>
          <div className="col s12 right-align">
            <button className="btn"><i className="fa fa-lock" /> Reset Password</button>
          </div>
        </form>
      </div>
    </div>
  );

export default ForgotPassword;
