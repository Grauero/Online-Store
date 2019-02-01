const { randomBytes } = require('crypto');
const { promisify } = require('util');
const sendGrid = require('@sendgrid/mail');

module.exports = async function requestReset(parent, { email }, ctx) {
  const user = await ctx.db.query.user({ where: { email } });
  if (!user) {
    throw new Error(`No such user found for email: ${email}`);
  }

  // generate JWT token for reseting users password
  const resetToken = (await promisify(randomBytes)(20)).toString('hex');
  const resetTokenExpiry = Date.now() + 3600000; // 1 hour
  await ctx.db.mutation.updateUser({
    where: { email },
    data: { resetToken, resetTokenExpiry }
  });

  sendGrid.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: user.email,
    from: 'noreply@noreply.com',
    subject: 'Your Password Reset Token',
    html: `
    <div className="email" style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    ">
      <h2>Hello!</h2>
      <p>
        Your Password Reset Token is here!
        \n\n
        <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">
        Click Here to Reset Password.
        </a>
      </p>
    </div>
  `
  };
  await sendGrid.send(msg);

  return { message: 'Reset password' };
};
