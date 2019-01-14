import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import NProgress from 'nprogress';
import Router from 'next/router';
import { MockedProvider } from 'react-apollo/test-utils';

import ChargeMoney from '../components/cart/ChargeMoney';
import { CURRENT_USER_QUERY } from '../components/auth/User';
import { fakeUser, fakeCartItem } from '../util/testUtils';

Router.router = { push() {} };

const mocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: [fakeCartItem()]
        }
      }
    }
  }
];

describe('<ChargeMoney/>', () => {
  it('renders and matches snapshot', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ChargeMoney />
      </MockedProvider>
    );

    await wait();
    wrapper.update();
    const checkoutButton = wrapper.find('ReactStripeCheckout');

    expect(toJSON(checkoutButton)).toMatchSnapshot();
  });

  it('creates an order ontoken', async () => {
    const createOrderMock = jest.fn().mockResolvedValue({
      data: { createOrder: { id: 'xyz789' } }
    });
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ChargeMoney />
      </MockedProvider>
    );
    const component = wrapper.find('ChargeMoney').instance();
    // manully call onToken method
    component.onToken({ id: 'abc123' }, createOrderMock);

    expect(createOrderMock).toHaveBeenCalled();
    expect(createOrderMock).toHaveBeenCalledWith({ variables: { token: 'abc123' } });
  });

  it('turns the progress bar on', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ChargeMoney />
      </MockedProvider>
    );

    await wait();
    wrapper.update();
    NProgress.start = jest.fn();
    const createOrderMock = jest.fn().mockResolvedValue({
      data: { createOrder: { id: 'xyz789' } }
    });
    const component = wrapper.find('ChargeMoney').instance();
    // manully call onToken method
    component.onToken({ id: 'abc123' }, createOrderMock);

    expect(NProgress.start).toHaveBeenCalled();
  });

  it('routes to the order page when completed', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ChargeMoney />
      </MockedProvider>
    );

    await wait();
    wrapper.update();
    const createOrderMock = jest.fn().mockResolvedValue({
      data: { createOrder: { id: 'xyz789' } }
    });

    const component = wrapper.find('ChargeMoney').instance();
    Router.router.push = jest.fn();
    // manully call  onToken method
    component.onToken({ id: 'abc123' }, createOrderMock);

    await wait();

    expect(Router.router.push).toHaveBeenCalled();
    expect(Router.router.push).toHaveBeenCalledWith({
      pathname: '/order',
      query: {
        id: 'xyz789'
      }
    });
  });
});
