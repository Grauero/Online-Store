import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';

import Nav from './Nav';
import Cart from '../cart/Cart';
import Search from './Search';
import { StyledHeader, Logo } from '../styles/HeaderStyles';

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

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
