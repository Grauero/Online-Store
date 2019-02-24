import React from 'react';
import PropTypes from 'prop-types';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import Router from 'next/router';

import User from '../auth/User';
import calcTotalPrice from '../../util/calcTotalPrice';
import { CURRENT_USER_QUERY } from '../../mutations/auth';
import { CREATE_ORDER_MUTATION } from '../../mutations/cart';

function totalItems(cart) {
  return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
}

async function onToken(res, createOrder) {
  const order = await createOrder({
    variables: { token: res.id }
  });

  Router.push({
    pathname: '/order',
    query: { id: order.data.createOrder.id }
  });
}

const ChargeMoney = ({ children }) => (
  <User>
    {({ data: { me } }) => (
      <Mutation mutation={CREATE_ORDER_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
        {createOrder => (
          <StripeCheckout
            amount={calcTotalPrice(me.cart)}
            name="Online Store"
            description={`Order of ${totalItems(me.cart)} items!`}
            image={me.cart.length && me.cart[0].item && me.cart[0].item.image}
            stripeKey="pk_test_0ppta5Hribwa6JIqxG1xPebo"
            currency="USD"
            email={me.email}
            token={res => onToken(res, createOrder)}
          >
            {children}
          </StripeCheckout>
        )}
      </Mutation>
    )}
  </User>
);

ChargeMoney.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired
};

export default ChargeMoney;
