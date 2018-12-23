import React from 'react';
import PropTypes from 'prop-types';

import SingleItem from '../components/items/SingleItem';

const Item = ({ query: { id } }) => (
  <div>
    <SingleItem id={id} />
  </div>
);

Item.propTypes = {
  query: PropTypes.instanceOf(Object).isRequired
};

export default Item;
