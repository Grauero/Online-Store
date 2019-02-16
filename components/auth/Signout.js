import React from 'react';
import { Mutation } from 'react-apollo';

import { CURRENT_USER_QUERY, SIGN_OUT_MUTATION } from '../../mutations/auth';

const Signout = () => (
  <Mutation mutation={SIGN_OUT_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
    {signout => (
      <button type="button" onClick={signout}>
        Sign Out
      </button>
    )}
  </Mutation>
);

export default Signout;
