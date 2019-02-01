module.exports = async function updateItem(parent, args, ctx, info) {
  const where = { id: args.id };
  const item = await ctx.db.query.item({ where }, '{ id title user { id }}');

  // check if user owns that item or have the right permissions
  const ownsItem = item.user.id === ctx.request.userId;
  const hasPermissions = ctx.request.user.permissions.some(permission =>
    ['ADMIN', 'ITEMUPDATE'].includes(permission)
  );
  if (!ownsItem && hasPermissions) {
    throw new Error('You dont have permission to do that!');
  }

  const updates = { ...args };
  delete updates.id;

  return ctx.db.mutation.updateItem(
    {
      data: updates,
      where: { id: args.id }
    },
    info
  );
};
