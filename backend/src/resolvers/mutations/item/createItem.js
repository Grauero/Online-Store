module.exports = async function createItem(parent, args, ctx, info) {
  if (!ctx.request.userId) {
    throw new Error('You must be logged in');
  }

  const item = await ctx.db.mutation.createItem(
    {
      data: {
        // relationship between created Item and User
        user: {
          connect: {
            id: ctx.request.userId
          }
        },
        ...args
      }
    },
    info
  );

  return item;
};
