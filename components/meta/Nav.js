import React from 'react';
import Link from 'next/link';
import { Mutation } from 'react-apollo';

import User from '../auth/User';
import Signout from '../auth/Signout';
import CartCount from '../cart/CartCount';
import NavStyles from '../styles/NavStyles';
import { TOGGLE_CART_MUTATION } from '../cart/Cart';

const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <NavStyles data-test="nav">
        <Link href="/items">
          <a>Shop</a>
        </Link>
        {me && (
          <React.Fragment>
            <Link href="/sell">
              <a>Sell</a>
            </Link>
            <Link href="/orders">
              <a>Orders</a>
            </Link>
            <Link href="/permissions">
              <a>Account</a>
            </Link>
            <Signout />
            <Mutation mutation={TOGGLE_CART_MUTATION}>
              {toggleCart => (
                <button type="button" onClick={toggleCart}>
                  My Cart
                  <CartCount
                    count={me.cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)}
                  />
                </button>
              )}
            </Mutation>
          </React.Fragment>
        )}
        {!me && (
          <Link href="/signup">
            <a>Sign In</a>
          </Link>
        )}
      </NavStyles>
    )}
  </User>
);

export default Nav;
