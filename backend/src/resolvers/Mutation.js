const updateItem = require('./mutations/item/updateItem');
const createItem = require('./mutations/item/createItem');
const deleteItem = require('./mutations/item/deleteItem');

const signup = require('./mutations/auth/signup');
const signin = require('./mutations/auth/signin');
const signout = require('./mutations/auth/signout');
const requestReset = require('./mutations/auth/requestReset');
const resetPassword = require('./mutations/auth/resetPassword');
const updatePermissions = require('./mutations/auth/updatePermissions');

const addToCart = require('./mutations/cart/addToCart');
const removeFromCart = require('./mutations/cart/removeFromCart');
const createOrder = require('./mutations/cart/createOrder');

const Mutation = {
  createItem,
  updateItem,
  deleteItem,

  signup,
  signin,
  signout,
  requestReset,
  resetPassword,
  updatePermissions,

  addToCart,
  removeFromCart,
  createOrder
};

module.exports = Mutation;
