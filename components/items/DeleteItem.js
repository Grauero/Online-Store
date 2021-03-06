import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import { ALL_ITEMS_QUERY } from '../../queries/items';
import { DELETE_ITEM_MUTATION } from '../../mutations/items';

const DeleteItem = ({ id, children }) => {
  const update = (cache, payload) => {
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id);

    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  };

  return (
    <Mutation mutation={DELETE_ITEM_MUTATION} variables={{ id }} update={update}>
      {deleteItem => (
        <button
          type="button"
          onClick={() => {
            if (confirm('Are you sure you want to delete this item?')) {
              deleteItem().catch((err) => {
                if (err.message.includes('undefined')) {
                  alert('You must be logged in!');
                } else {
                  alert(err.message);
                }
              });
            }
          }}
        >
          {children}
        </button>
      )}
    </Mutation>
  );
};

DeleteItem.propTypes = {
  children: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default DeleteItem;
