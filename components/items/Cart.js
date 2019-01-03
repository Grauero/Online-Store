import React from 'react';

import CartStyles from '../styles/CartStyles';
import Supreme from '../styles/Supreme';
import CloseButton from '../styles/CloseButton';
import Button from '../styles/Button';

const Cart = () => (
  <CartStyles open>
    <header>
      <CloseButton title="close">&times;</CloseButton>
      <Supreme>Your Cart</Supreme>
      <p>You have __ Items in your cart</p>
    </header>
    <footer>
      <p>111</p>
      <Button>Checkout</Button>
    </footer>
  </CartStyles>
);

export default Cart;
