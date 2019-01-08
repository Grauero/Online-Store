import React from 'react';
import PropTypes from 'prop-types';

import PleaseSignIn from '../components/auth/PleaseSignIn';
import Order from '../components/order/Order';

const OrderPage = props => (
  <div>
    <PleaseSignIn>
      <Order id={props.query.id} />
    </PleaseSignIn>
  </div>
);

OrderPage.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired
};

export default OrderPage;
