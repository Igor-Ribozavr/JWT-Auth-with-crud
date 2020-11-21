const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { registerSchema, loginSchema } = require('../utils/authValidators');
const { secretKey } = require('../config/config');
const errorHandler = require('../utils/errorHandler');

module.exports.register = async (req, res) => {
  try {
    const result = await registerSchema.validateAsync(req.body);
    const user = await User.findOne({ email: result.email });
    if (user) {
      res.status(409).json({
        error: 'Пользователь с таким Email уже существует !',
      });
    } else {
      const hash = await bcrypt.hash(result.passport, 10);
      const createdUser = await User.create({
        email: result.email,
        firstName: result.firstName,
        lastName: result.lastName,
        passport: hash,
      });
      const token = jwt.sign(
        {
          userId: createdUser._id,
        },
        secretKey,
        { expiresIn: 60 * 60 }
      );
      res.status(200).json({
        token: `Bearer ${token}`,
      });
    }
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.login = async (req, res) => {
  try {
    const result = await loginSchema.validateAsync(req.body);
    const createdUser = await User.findOne({ email: result.email });
    if (createdUser) {
      const isMatch = await bcrypt.compare(result.passport, createdUser.passport);
      if (isMatch === true) {
        const token = jwt.sign(
          {
            userId: createdUser._id,
          },
          secretKey,
          { expiresIn: 60 * 60 }
        );
        res.status(200).json({
          token: `Bearer ${token}`,
        });
        console.log(token);
      } else {
        res.status(401).json({ error: 'Пароли не совпадают !' });
      }
    } else {
      res
        .status(404)
        .json({ error: 'Пользователь с таким Email не существует !' });
    }
  } catch (error) {
    errorHandler(res, error);
  }
};
