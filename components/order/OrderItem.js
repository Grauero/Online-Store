import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import formatMoney from '../../util/formatMoney';

const OrderItem = ({
  image, title, quantity, price, description
}) => (
  <Fragment>
    <img src={image} alt={title} />
    <div className="item-details">
      <h2>{title}</h2>
      <p>Qty: {quantity}</p>
      <p>Each: {formatMoney(price * quantity)}</p>
      <p>{description}</p>
    </div>
  </Fragment>
);

OrderItem.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default OrderItem;
