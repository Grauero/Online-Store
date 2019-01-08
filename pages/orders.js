import React from 'react';

import PleaseSignIn from '../components/auth/PleaseSignIn';
import OrderList from '../components/order/OrderList';

const Orders = () => (
  <div>
    <PleaseSignIn>
      <OrderList />
    </PleaseSignIn>
  </div>
);

export default Orders;
