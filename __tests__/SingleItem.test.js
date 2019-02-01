import React from 'react';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';

import { fakeItem } from '../util/testUtils';
import SingleItem, { SINGLE_ITEM_QUERY } from '../components/items/SingleItem';

it('renders with proper data', async () => {
  const mocks = [
    {
      // when use request with this query and variable
      request: { query: SINGLE_ITEM_QUERY, variables: { id: '123' } },
      // return test data (mocked data)
      result: {
        data: {
          item: fakeItem()
        }
      }
    }
  ];

  const wrapper = mount(
    <MockedProvider mocks={mocks}>
      <SingleItem id="123" />
    </MockedProvider>
  );

  expect(wrapper.text()).toContain('Loading...');
  await wait();
  wrapper.update();

  expect(toJSON(wrapper.find('h2'))).toMatchSnapshot();
  expect(toJSON(wrapper.find('img'))).toMatchSnapshot();
  expect(toJSON(wrapper.find('p'))).toMatchSnapshot();
});
