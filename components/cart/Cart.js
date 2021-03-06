import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { adopt } from 'react-adopt';

import User from '../auth/User';
import CartItem from './CartItem';
import ChargeMoney from './ChargeMoney';
import CartStyles from '../styles/CartStyles';
import Supreme from '../styles/Supreme';
import CloseButton from '../styles/CloseButton';
import Button from '../styles/Button';
import formatMoney from '../../util/formatMoney';
import calcTotalPrice from '../../util/calcTotalPrice';
import { TOGGLE_CART_MUTATION } from '../../mutations/cart';
import LOCAL_STATE_QUERY from '../../queries/cart';

/* eslint-disable */
const Composed = adopt({
  user: ({ render }) => <User>{render}</User>,
  toggleCart: ({ render }) => <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>,
  localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>
});
/* eslint-enable */

const Cart = () => (
  <Composed>
    {({ user, toggleCart, localState }) => {
      const me = user.data.me;

      if (!me) {
        return null;
      }

      return (
        <CartStyles open={localState.data.cartOpen}>
          <header>
            <CloseButton title="close" onClick={toggleCart}>
              &times;
            </CloseButton>
            <Supreme>{me.name}&#39;s Cart</Supreme>
            <p>
              You have {me.cart.length} Item{me.cart.length === 1 ? '' : 's'} in your cart
            </p>
          </header>
          <ul>
            {me.cart.map(cartItem => (
              <CartItem key={cartItem.id} cartItem={cartItem} />
            ))}
          </ul>
          <footer>
            <p>{formatMoney(calcTotalPrice(me.cart))}</p>
            {me.cart.length && (
              <ChargeMoney>
                <Button>Checkout</Button>
              </ChargeMoney>
            )}
          </footer>
        </CartStyles>
      );
    }}
  </Composed>
);

export default Cart;
