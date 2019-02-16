import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import BigButton from '../styles/BigButton';
import { CURRENT_USER_QUERY } from '../../mutations/auth';
import { REMOVE_FROM_CART_MUTATION } from '../../mutations/cart';

// this function gets called when comes response from the server after a mutation has been performed
const update = (cache, payload) => {
  const data = cache.readQuery({ query: CURRENT_USER_QUERY });
  // remove item from cart
  const cartItemId = payload.data.removeFromCart.id;
  data.me.cart = data.me.cart.filter(cartItem => cartItem.id !== cartItemId);

  cache.writeQuery({ query: CURRENT_USER_QUERY, data });
};

const RemoveFromCart = ({ id }) => (
  <Mutation
    mutation={REMOVE_FROM_CART_MUTATION}
    variables={{ id }}
    update={update}
    optimisticResponse={{
      __typename: 'Mutation',
      removeFromCart: { __typename: 'CartItem', id }
    }}
  >
    {(removeFromCart, { loading }) => (
      <BigButton
        disabled={loading}
        title="Delete Item"
        onClick={() => removeFromCart().catch(err => console.log(err.message))}
      >
        &times;
      </BigButton>
    )}
  </Mutation>
);

RemoveFromCart.propTypes = {
  id: PropTypes.string.isRequired
};

export default RemoveFromCart;
