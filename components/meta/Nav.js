import React from 'react';
import Link from 'next/link';
import { Mutation } from 'react-apollo';

import User from '../auth/User';
import Signout from '../auth/Signout';
import NavStyles from '../styles/NavStyles';
import { TOGGLE_CART_MUTATION } from '../items/Cart';

const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <NavStyles>
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
            <Link href="/me">
              <a>Account</a>
            </Link>
            <Signout />
            <Mutation mutation={TOGGLE_CART_MUTATION}>
              {toggleCart => (
                <button type="button" onCLick={toggleCart}>
                  My Cart
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
