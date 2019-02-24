import React from 'react';
import Link from 'next/link';

import Nav from './Nav';
import Cart from '../cart/Cart';
import Search from './Search';
import { StyledHeader, Logo } from '../styles/HeaderStyles';

const Header = () => (
  <StyledHeader>
    <div className="bar">
      <Logo>
        <Link href="/">
          <a>Online Store</a>
        </Link>
      </Logo>
      <Nav />
    </div>
    <div className="sub-bar">
      <Search />
    </div>
    <Cart />
  </StyledHeader>
);

export default Header;
