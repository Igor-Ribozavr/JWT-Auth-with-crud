const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/config');

module.exports.tokensGenerator = (userId) => {
  const accessToken = jwt.sign(
    {
      userId: userId,
      type: 'access',
    },
    secretKey,
    { expiresIn: 60 * 60 }
  );
  const refreshToken = jwt.sign(
    {
      userId: userId,
      type: 'refresh',
    },
    secretKey,
    { expiresIn: 60 * 60 * 100 }
  );
  return {
    accessToken: `Bearer ${accessToken}`,
    refreshToken: `Bearer ${refreshToken}`,
  };
};
