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

  it('renders the image properly', () => {
    const wrapper = shallow(<Item item={testItem} />);
    const img = wrapper.find('img');

    expect(img.props().src).toBe(testItem.image);
    expect(img.props().alt).toBe(testItem.title);
  });

  it('renders the pricetag and title', () => {
    const wrapper = shallow(<Item item={testItem} />);
    const PriceTag = wrapper.find('PriceTag');

    expect(PriceTag.children().text()).toBe('$40');
    expect(wrapper.find('Title a').text()).toBe(testItem.title);
  });

  it('renders out the buttons properly', () => {
    const wrapper = shallow(<Item item={testItem} />);
    const buttonList = wrapper.find('.buttonList');

    expect(buttonList.children()).toHaveLength(3);
    expect(buttonList.find('Link')).toHaveLength(1);
    expect(buttonList.find('AddToCart').exists()).toBe(true);
    expect(buttonList.find('DeleteItem').exists()).toBe(true);
  });
});
