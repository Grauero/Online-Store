import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Head from 'next/head';

import ErrorMessage from '../error/ErrorMessage';
import SingleItemStyles from '../styles/SingleItemStyles';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      largeImage
    }
  }
`;

const SingleItem = ({ id }) => (
  <Query query={SINGLE_ITEM_QUERY} variables={{ id }}>
    {({ error, loading, data: { item } }) => {
      if (error) {
        return <ErrorMessage error={error} />;
      }
      if (loading) {
        return <p>Loading...</p>;
      }
      if (!item) {
        return <p>No Item Found for {id}</p>;
      }

      return (
        <SingleItemStyles>
          <Head>
            <title>Online Store | {item.title}</title>
          </Head>
          <img src={item.largeImage} alt={item.title} />
          <div className="details">
            <h2>Viewing {item.title}</h2>
            <p>{item.description}</p>
          </div>
        </SingleItemStyles>
      );
    }}
  </Query>
);

SingleItem.propTypes = {
  id: PropTypes.string.isRequired
};

export default SingleItem;
export { SINGLE_ITEM_QUERY };
