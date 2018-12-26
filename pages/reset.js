import React from 'react';
import PropTypes from 'prop-types';

import Reset from '../components/auth/Reset';

const ResetPage = props => (
  <div>
    <p>Reset Your Password {props.query.resetToken}</p>
    <Reset resetToken={props.query.resetToken} />
  </div>
);

ResetPage.propTypes = {
  query: PropTypes.instanceOf(Object).isRequired
};

export default ResetPage;
