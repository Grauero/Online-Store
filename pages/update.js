import React from 'react';
import PropTypes from 'prop-types';

import UpdateItem from '../components/items/UpdateItem';

const Update = ({ query: { id } }) => (
  <div>
    <UpdateItem id={id} />
  </div>
);

Update.propTypes = {
  query: PropTypes.instanceOf(Object).isRequired
};

export default Update;
