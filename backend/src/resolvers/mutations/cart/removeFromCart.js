module.exports = async function removeFromCart(parent, args, ctx, info) {
  // select cart item
  const cartItem = await ctx.db.query.cartItem(
    {
      where: { id: args.id }
    },
    '{ id, user { id }}'
  );

  if (!cartItem) {
    throw new Error('No CartItem Found!');
  }

  // check if user owns cart item
  if (cartItem.user.id !== ctx.request.userId) {
    throw new Error('You dont have permission to do that!');
  }

  return ctx.db.mutation.deleteCartItem(
    {
      where: { id: args.id }
    },
    info
  );
};
