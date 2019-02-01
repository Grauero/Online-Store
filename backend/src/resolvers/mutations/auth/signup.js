const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = async function signup(parent, args, ctx, info) {
  // create user
  args.email = args.email.toLowerCase();
  const password = await bcrypt.hash(args.password, 10);
  const user = await ctx.db.mutation.createUser(
    {
      data: {
        ...args,
        password,
        permissions: { set: ['USER'] }
      }
    },
    info
  );

  // generate new JWT token for user
  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
  ctx.response.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 24 hours
  });

  return user;
};
