import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import Title from './styles/Title';
import formatMoney from '../lib/formatMoney';

const Item = ({ item }) => (
  <ItemStyles>
    {item.image && <img src={item.image} alt={item.title} />}
    <Title>
      <Link
        href={{
          pathname: '/item',
          query: { id: item.id }
        }}
      >
        <a>{item.title}</a>
      </Link>
    </Title>
    <PriceTag>{formatMoney(item.price)}</PriceTag>
    <p>{item.description}</p>
    <div className="buttonList">
      <Link
        href={{
          pathname: 'update',
          query: { id: item.id }
        }}
      >
        <a>Edit &#9999;&#65039; </a>
      </Link>
      <button type="button">Add To Cart</button>
      <button type="button">Delete</button>
    </div>
  </ItemStyles>
);

Item.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired
};

export default Item;
