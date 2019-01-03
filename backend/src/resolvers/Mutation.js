const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');

const { transport, generateEmail } = require('../mail');
const { hasPermission } = require('../utils');

const Mutation = {
  async createItem(parent, args, ctx, info) {
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
  },
  updateItem(parent, args, ctx, info) {
    const updates = { ...args };
    delete updates.id;

    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async deleteItem(parent, args, ctx, info) {
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
  },
  async signup(parent, args, ctx, info) {
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
  },
  async signin(parent, { email, password }, ctx) {
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
  },
  signout(parent, args, ctx) {
    ctx.response.clearCookie('token');

    return { message: 'Log Out' };
  },
  async requestReset(parent, { email }, ctx) {
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

    // send email with generated token
    await transport.sendMail({
      from: 'noreply@noreply.com',
      to: user.email,
      subject: 'Your Password Reset Token',
      html: generateEmail(`Your Password Reset Token is here!
      \n\n
      <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">
        Click Here to Reset Password.
      </a>
      `)
    });

    return { message: 'Reset password' };
  },
  async resetPassword(parent, { password, confirmPassword, resetToken }, ctx) {
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
        hashedPassword,
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
  },
  async updatePermissions(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in!');
    }

    const currentUser = await ctx.db.query.user(
      {
        where: {
          id: ctx.request.userId
        }
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
        where: {
          id: args.userId
        }
      },
      info
    );
  },
  async addToCart(parent, args, ctx, info) {
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
  }
};

module.exports = Mutation;
