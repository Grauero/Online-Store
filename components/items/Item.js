import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Query } from 'react-apollo';

import DeleteItem from './DeleteItem';
import AddToCart from '../cart/AddToCart';
import ItemStyles from '../styles/ItemStyles';
import PriceTag from '../styles/PriceTag';
import Title from '../styles/Title';
import formatMoney from '../../util/formatMoney';
import { CURRENT_USER_QUERY } from '../../mutations/auth';

const Item = ({ item }) => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data: { me } }) => {
      const editButton = item.user.id === me.id ? (
        <Link
          href={{
            pathname: 'update',
            query: { id: item.id }
          }}
        >
          <a>Edit &#9999;&#65039; </a>
        </Link>
      ) : null;

      const deleteButton = item.user.id === me.id ? <DeleteItem id={item.id}>Delete This Item</DeleteItem> : null;

      return (
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
            {editButton}
            <AddToCart id={item.id} />
            {deleteButton}
          </div>
        </ItemStyles>
      );
    }}
  </Query>
);

Item.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired
};

export default Item;
