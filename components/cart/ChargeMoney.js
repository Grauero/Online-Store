import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import NProgress from 'nprogress';
import Router from 'next/router';

import ErrorMessage from '../error/ErrorMessage';
import User, { CURRENT_USER_QUERY } from '../auth/User';
import calcTotalPrice from '../../util/calcTotalPrice';

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($token: String!) {
    createOrder(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`;

function totalItems(cart) {
  return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
}

class ChargeMoney extends Component {
  state = {};

  onToken = (res, createOrder) => {
    createOrder({
      variables: { token: res.id }
    });
  };

  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <Mutation
            mutation={CREATE_ORDER_MUTATION}
            refetchQueries={[{ query: CURRENT_USER_QUERY }]}
          >
            {createOrder => (
              <StripeCheckout
                amount={calcTotalPrice(me.cart)}
                name="Online Store"
                description={`Order of ${totalItems(me.cart)} items!`}
                image={me.cart[0].item && me.cart[0].item.image}
                stripeKey="pk_test_0ppta5Hribwa6JIqxG1xPebo"
                currency="USD"
                email={me.email}
                token={res => this.onToken(res, createOrder)}
              >
                {this.props.children}
              </StripeCheckout>
            )}
          </Mutation>
        )}
      </User>
    );
  }
}

export default ChargeMoney;
