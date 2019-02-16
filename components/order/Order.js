import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import format from 'date-fns/format';
import Head from 'next/head';

import OrderItem from './OrderItem';
import OrderStyles from '../styles/OrderStyles';
import ErrorMessage from '../error/ErrorMessage';
import formatMoney from '../../util/formatMoney';
import { SINGLE_ORDER_QUERY } from '../../queries/order';

const Order = ({ id }) => (
  <Query query={SINGLE_ORDER_QUERY} variables={{ id }}>
    {({ data, error, loading }) => {
      if (error) {
        return <ErrorMessage error={error} />;
      }
      if (loading) {
        return <p>Loading...</p>;
      }

      const order = data.order;

      return (
        <OrderStyles>
          <Head>
            <title>Online Store - Order {order.id}</title>
          </Head>
          <p>
            <span>Order ID:</span>
            <span>{id}</span>
          </p>
          <p>
            <span>Charge</span>
            <span>{order.charge}</span>
          </p>
          <p>
            <span>Date</span>
            <span>{format(order.createdAt, 'MMMM d, YYYY h:mm a')}</span>
          </p>
          <p>
            <span>Order Total</span>
            <span>{formatMoney(order.total)}</span>
          </p>
          <p>
            <span>Item Count</span>
            <span>{order.items.length}</span>
          </p>
          <div className="items">
            {order.items.map(item => (
              <div className="order-item" key={item.id}>
                <OrderItem {...item} />
              </div>
            ))}
          </div>
        </OrderStyles>
      );
    }}
  </Query>
);

Order.propTypes = {
  id: PropTypes.string.isRequired
};

export default Order;
