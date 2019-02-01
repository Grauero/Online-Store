const stripe = require('../../../stripe');

module.exports = async function createOrder(parent, args, ctx) {
  const { userId } = ctx.request;
  if (!userId) {
    throw new Error('You must be signed in to complete this order!');
  }

  const user = await ctx.db.query.user(
    { where: { id: userId } },
    `{
      id
      name
      email
      cart {
        id
        quantity
        item { title price id description image largeImage }
      }
    }`
  );

  // recalculate total price
  const amount = user.cart.reduce(
    (tally, cartItem) => tally + cartItem.item.price * cartItem.quantity,
    0
  );

  // charge money
  const charge = await stripe.charges.create({
    amount,
    currency: 'USD',
    source: args.token
  });

  // convert CartItems to OrderItems
  const orderItems = user.cart.map((cartItem) => {
    const orderItem = {
      ...cartItem.item,
      quantity: cartItem.quantity,
      user: { connect: { id: userId } }
    };
    delete orderItem.id;

    return orderItem;
  });

  // create order
  const order = await ctx.db.mutation.createOrder({
    data: {
      total: charge.amount,
      charge: charge.id,
      items: { create: orderItems },
      user: { connect: { id: userId } }
    }
  });

  // clear users cart
  const cartItemIds = user.cart.map(cartItem => cartItem.id);
  await ctx.db.mutation.deleteManyCartItems({
    where: {
      id_in: cartItemIds
    }
  });

  return order;
};
