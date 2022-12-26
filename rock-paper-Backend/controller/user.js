const { getToken } = require('../helper/genrateToken');
const User = require('../models/users');

const login = async (req, res) => {
  const data = req.body;
  const user = await User.findOne({
    username: data.username,
    password: data.password,
  });
  if (!user) {
    return res.status(400).send({
      status: false,
      message: 'Invalid Credentials',
    });
  } else {
    res.status(200).send({
      status: true,
      message: 'Successfully Login',
      data: user,
    });
  }
};
const register = (req, res) => {
  const user = new User(req.body);
  user.token = getToken(user);
  user
    .save()
    .then(() => {
      res.status(201).json({
        status: true,
        message: 'Successfully Register',
        data: user,
      });
    })
    .catch((err) =>
      res.status(500).json({
        status: false,
        message: err.message,
      })
    );
};

module.exports = {
  login,
  register,
};
