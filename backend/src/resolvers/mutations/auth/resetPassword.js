const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = async function resetPassword(
  parent,
  { password, confirmPassword, resetToken },
  ctx
) {
  if (password !== confirmPassword) {
    throw new Error('Passwords dont match');
  }

  // check for invalid reset token
  const [user] = await ctx.db.query.users({
    where: {
      resetToken,
      resetTokenExpiry_gte: Date.now() - 3600000
    }
  });
  if (!user) {
    throw new Error('This token is either invalid or  expired');
  }

  // hash and update password
  const hashedPassword = bcrypt.hash(password, 10);
  const updatedUser = await ctx.db.mutation.updateUser({
    where: { email: user.email },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null
    }
  });

  // generate JWT
  const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
  ctx.response.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 24 hours
  });

  return updatedUser;
};
