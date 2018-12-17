import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Meta from './Meta';

const Page = ({ children }) => (
  <div>
    <Meta />
    <Header />
    {children}
  </div>
);

Page.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired
};

export default Page;
