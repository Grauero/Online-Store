import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Item from './Item';
import Pagination from '../pagination/Pagination';
import { Center, ItemsList } from '../styles/ItemsStyles';
import { perPage } from '../../config';

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int= ${perPage}) {
    items(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const Items = ({ page }) => (
  <Center>
    <Pagination page={page} />
    <Query
      query={ALL_ITEMS_QUERY}
      variables={{
        skip: page * perPage - perPage,
        first: perPage
      }}
    >
      {({ data, error, loading }) => {
        if (loading) {
          return <p>Loading...</p>;
        }

        if (error) {
          return <p>Error: {error.message}</p>;
        }

        const items = data.items.map(item => <Item item={item} key={item.id} />);

        return <ItemsList>{items}</ItemsList>;
      }}
    </Query>
    <Pagination page={page} />
  </Center>
);

Items.propTypes = {
  page: PropTypes.number.isRequired
};

export default Items;
export { ALL_ITEMS_QUERY };
