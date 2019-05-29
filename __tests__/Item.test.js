import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import Item from '../components/items/Item';

const testItem = {
  id: 'id',
  title: 'title',
  price: 4000,
  description: 'description',
  image: 'image',
  largeImage: 'largeImage.'
};

describe('<Item/>', () => {
  it('renders and matches the snapshot', () => {
    const wrapper = shallow(<Item item={testItem} />);

    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
