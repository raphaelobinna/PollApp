const User = require('../models/user')
const jwt = require('jsonwebtoken');

// for development only
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    return res.status(200).json(users);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.register = async (req, res, next) => {
  try {
    const maxAge = 1 * 60 * 60
    const user = await User.create(req.body);
    const { id, username } = user;
    const token = jwt.sign({ id, username }, `${process.env.SECRET}`, { expiresIn: maxAge } );

    return res.status(201).json({
      id,
      username,
      token,
    });
  } catch (err) {
    if (err.code === 11000) {
      err.message = 'Sorry, that username is already taken';
    }
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    console.log(user)
    const { id, username } = user;
    const valid = await user.comparePassword(req.body.password);

    if (valid) {
      const maxAge = 1 * 60 * 60
      const token = jwt.sign({ id, username },`${process.env.SECRET}`, { expiresIn: maxAge } );
      return res.status(200).json({
        id,
        username,
        token,
      });
    } else {
      throw new Error();
    }
  } catch (err) {
    return next({ status: 400, message: 'Invalid Username/Password' });
  }
};
