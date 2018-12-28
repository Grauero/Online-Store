import React from 'react';

import CreateItem from '../components/items/CreateItem';
import PleaseSignIn from '../components/auth/PleaseSignIn';

const Sell = () => (
  <div>
    <PleaseSignIn>
      <CreateItem />
    </PleaseSignIn>
  </div>
);

export default Sell;
