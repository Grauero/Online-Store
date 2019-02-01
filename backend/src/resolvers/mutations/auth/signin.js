const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = async function signin(parent, { email, password }, ctx) {
  const user = await ctx.db.query.user({ where: { email } });
  if (!user) {
    throw new Error(`No such user found for email: ${email}`);
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error('Invalid password!');
  }

  // if user provided valid data give him JWT token
  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
  ctx.response.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 24 hours
  });

  return user;
};
