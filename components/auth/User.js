import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import { CURRENT_USER_QUERY } from '../../mutations/auth';

const User = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

User.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired
};

export default User;
