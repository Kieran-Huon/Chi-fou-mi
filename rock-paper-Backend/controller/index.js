const {
  addPersonToMatch,
  getAllMatch,
  getMatchById,
  subscribeToMatchEvents,
  gameTurn,
  createMatch,
} = require('./match');

const { login, register } = require('./user');

module.exports = {
  addPersonToMatch,
  getAllMatch,
  getMatchById,
  subscribeToMatchEvents,
  login,
  register,
  gameTurn,
  createMatch,
};
