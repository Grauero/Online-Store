const { hasPermission } = require('../../../utils');

module.exports = async function updatePermissions(parent, args, ctx, info) {
  if (!ctx.request.userId) {
    throw new Error('You must be logged in!');
  }

  const currentUser = await ctx.db.query.user(
    {
      where: { id: ctx.request.userId }
    },
    info
  );

  // check if logged in user have right permissions to query all users
  hasPermission(currentUser, ['ADMIN', 'PERMISSIONUPDATE']);

  // update permissions
  return ctx.db.mutation.updateUser(
    {
      data: {
        permissions: {
          set: args.permissions
        }
      },
      where: { id: args.userId }
    },
    info
  );
};
