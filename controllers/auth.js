const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { secretKey } = require('../config/config');
const errorHandler = require('../utils/errorHandler')

module.exports.register = async (req, res) => {
  const { passport, email, firstName, lastName } = req.body;
  try {
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
    res.status(500).json({error:'Internal server error'});
  }
};

module.exports.login = async (req, res) => {
  const { passport, email } = req.body;
  try {
    const createdUser = await User.findOne({ email });
    if (createdUser) {
      const isMatch = await bcrypt.compare(passport, createdUser.passport);
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
      } else {
        res.status(401).json({ error: 'Пароли не совпадают !' });
      }
    } else {
      res
        .status(404)
        .json({ error: 'Пользователz с таким Email не существует !' });
    }
  } catch (error) {
    errorHandler(res, error);
  }
};
