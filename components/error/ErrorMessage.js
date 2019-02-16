import React from 'react';
import PropTypes from 'prop-types';

import ErrorStyles from '../styles/ErrorStyles';

const DisplayError = ({ error }) => {
  if (!error || !error.message) return null;
  if (error.message.includes('undefined')) {
    return (
      <ErrorStyles key={error.name}>
        <p data-test="graphql-error">You must be logged in!</p>
      </ErrorStyles>
    );
  }
  if (error.networkError && error.networkError.result && error.networkError.result.errors.length) {
    return error.networkError.result.errors.map(error => (
      <ErrorStyles key={error.name}>
        <p data-test="graphql-error">{error.message.replace('GraphQL error: ', '')}</p>
      </ErrorStyles>
    ));
  }
  return (
    <ErrorStyles>
      <p data-test="graphql-error">{error.message.replace('GraphQL error: ', '')}</p>
    </ErrorStyles>
  );
};

DisplayError.defaultProps = {
  error: {}
};

DisplayError.propTypes = {
  error: PropTypes.instanceOf(Object)
};

export default DisplayError;
