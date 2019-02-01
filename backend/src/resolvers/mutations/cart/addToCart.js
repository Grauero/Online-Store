module.exports = async function addToCart(parent, args, ctx, info) {
  const { userId } = ctx.request;
  if (!userId) {
    throw new Error('You must be signed in!');
  }

  const [existingCartItem] = await ctx.db.query.cartItems({
    where: {
      user: { id: userId },
      item: { id: args.id }
    }
  });

  // check if item already in cart
  if (existingCartItem) {
    return ctx.db.mutation.updateCartItem(
      {
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + 1 }
      },
      info
    );
  }

  return ctx.db.mutation.createCartItem(
    {
      data: {
        user: {
          connect: { id: userId }
        },
        item: {
          connect: { id: args.id }
        }
      }
    },
    info
  );
};
