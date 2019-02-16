import React from 'react';
import PropTypes from 'prop-types';

import RemoveFromCart from './RemoveFromCart';
import formatMoney from '../../util/formatMoney';
import CartItemStyles from '../styles/CartItemStyles';

const CartItem = ({ cartItem }) => {
  // check if item still exists in store
  if (!cartItem.item) {
    return (
      <CartItemStyles>
        <p>This Item has been removed!</p>
        <RemoveFromCart id={cartItem.id} />
      </CartItemStyles>
    );
  }

  return (
    <CartItemStyles>
      <img width="100" src={cartItem.item.image} alt={cartItem.item.title} />
      <div className="cart-item-details">
        <h3>{cartItem.item.title}</h3>
        <p>
          {formatMoney(cartItem.item.price * cartItem.quantity)}
          {' - '}
          <em>
            {cartItem.quantity} &times; {formatMoney(cartItem.item.price)} each
          </em>
        </p>
      </div>
      <RemoveFromCart id={cartItem.id} />
    </CartItemStyles>
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.instanceOf(Object).isRequired
};

export default CartItem;
