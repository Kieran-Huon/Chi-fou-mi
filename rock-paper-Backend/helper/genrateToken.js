const jwt = require('jsonwebtoken');

const getToken = (user) =>
  jwt.sign({ user_id: user._id, username: user.username }, 'TYETOHACKME', {
    expiresIn: '2h',
  });

module.exports = {
  getToken,
};
