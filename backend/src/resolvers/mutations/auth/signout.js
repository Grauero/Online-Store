module.exports = function signout(parent, args, ctx) {
  ctx.response.clearCookie('token');

  return { message: 'Log Out' };
};
