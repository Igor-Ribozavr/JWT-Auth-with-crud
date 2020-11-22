const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Token = require('../models/Token');
const { registerSchema, loginSchema } = require('../utils/authValidators');
const { tokensGenerator } = require('../utils/tokensGenerator');
const errorHandler = require('../utils/errorHandler');

module.exports.register = async (req, res) => {
  try {
    const {
      email,
      firstName,
      lastName,
      passport,
    } = await registerSchema.validateAsync(req.body);

    const user = await User.findOne({ email });
    if (user) {
      res.status(409).json({
        error: 'Пользователь с таким Email уже существует !',
      });
    } else {
      const hash = await bcrypt.hash(passport, 10);
      const createdUser = await User.create({
        email,
        firstName,
        lastName,
        passport: hash,
      });
      const tokens = tokensGenerator(createdUser._id);
      res.status(200).json(tokens);
    }
  } catch (error) {
    error._original ? res.status(422).json(error) : errorHandler(res, error);
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, passport } = await loginSchema.validateAsync(req.body);
    const createdUser = await User.findOne({ email });
    if (createdUser) {
      const isMatch = await bcrypt.compare(passport, createdUser.passport);
      if (isMatch === true) {
        const tokens = tokensGenerator(createdUser._id);
        res.status(200).json(tokens);
      } else {
        res.status(401).json({ error: 'Пароли не совпадают !' });
      }
    } else {
      res
        .status(404)
        .json({ error: 'Пользователь с таким Email не существует !' });
    }
  } catch (error) {
    error._original ? res.status(422).json(error) : errorHandler(res, error);
  }
};

module.exports.refreshToken = async (req, res) => {
  try {
    const tokens = tokensGenerator(req.user);
    const newRefreshToken = await Token.findOneAndUpdate(
      { userId: req.user },
      { $set: { refreshToken: tokens.refreshToken } },
      {
        new: true,
      }
    );
    if (newRefreshToken) {
      res.status(200).json(tokens);
    } else {
      await Token.create({
        userId: req.user,
        refreshToken: tokens.refreshToken,
      });
      res.status(200).json(tokens);
    }
  } catch (error) {
    errorHandler(res, error);
  }
};
module.exports.logout = async (req, res) => {
  try {
    await Token.findOneAndUpdate(
      { userId: req.user },
      { $set: { refreshToken: '' } },
      {
        new: true,
      }
    );
    res.status(200).json({ status: 'You are logout !' });
  } catch (error) {
    errorHandler(res, error);
  }
};
