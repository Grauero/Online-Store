import React from 'react';
import PropTypes from 'prop-types';

import Items from '../components/items/Items';

const Home = ({ query: { page } }) => (
  <div>
    <Items page={parseFloat(page) || 1} />
  </div>
);

Home.propTypes = {
  query: PropTypes.instanceOf(Object).isRequired
};

export default Home;
