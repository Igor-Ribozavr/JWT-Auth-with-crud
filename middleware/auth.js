const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/config');

module.exports.access = (req, res, next) => {
  try {
    const accsesToken = req.get('Authorization');
    console.log(accsesToken);
    if (!accsesToken) {
      res.status(401).json({ error: 'Token not provided !' });
    } else {
      const token = accsesToken.replace('Bearer ', '');
      const payload = jwt.verify(token, secretKey);
      req.user = payload.userId;
      if (payload.type !== 'access') {
        res.status(401).json({ error: 'Invalid token !' });
      }
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: 'Token expired !' });
    } else {
      if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json({ error: 'Invalid token !' });
      }
    }
  }
  next();
};

module.exports.refresh = (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(401).json({ error: 'Token not provided !' });
    } else {
      const token = refreshToken.replace('Bearer ', '');
      const payload = jwt.verify(token, secretKey);
      req.user = payload.userId;
      if (payload.type !== 'refresh') {
        res.status(401).json({ error: 'Invalid token !' });
      }
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: 'Token expired !' });
    } else {
      if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json({ error: 'Invalid token !' });
      }
    }
  }
  next();
};

module.exports.logout = (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(401).json({ error: 'Token not provided !' });
    } else {
      const token = refreshToken.replace('Bearer ', '');
      const payload = jwt.verify(token, secretKey);
      req.user = payload.userId;
      if (payload.type !== 'refresh') {
        res.status(401).json({ error: 'Invalid token !' });
      }
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: 'Token expired !' });
    } else {
      if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json({ error: 'Invalid token !' });
      }
    }
  }
  next();
};
