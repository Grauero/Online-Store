module.exports = async function deleteItem(parent, args, ctx, info) {
  const where = { id: args.id };
  const item = await ctx.db.query.item({ where }, '{ id title user { id }}');

  // check if user owns that item or have the right permissions
  const ownsItem = item.user.id === ctx.request.userId;
  const hasPermissions = ctx.request.user.permissions.some(permission =>
    ['ADMIN', 'ITEMDELETE'].includes(permission)
  );
  if (!ownsItem && hasPermissions) {
    throw new Error('You dont have permission to do that!');
  }

  return ctx.db.mutation.deleteItem({ where }, info);
};
