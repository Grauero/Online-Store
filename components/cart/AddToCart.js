import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

class AddToCart extends Component {
  state = {};

  render() {
    const { id } = this.props;

    return (
      <Mutation mutation={ADD_TO_CART_MUTATION} variables={{ id }}>
        {addToCart => (
          <button type="button" onClick={addToCart}>
            Add To Cart
          </button>
        )}
      </Mutation>
    );
  }
}

AddToCart.propTypes = {
  id: PropTypes.string.isRequired
};

export default AddToCart;
