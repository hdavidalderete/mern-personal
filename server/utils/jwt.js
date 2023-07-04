const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../constants");

const createAccessToken = (user) => {
  const expToken = new Date();
  expToken.setHours(expToken.getHours() + 3);
  const payload = {
    token_type: "access",
    user_id: user.id,
    iat: Date.now(),
    exp: expToken.getTime(),
  };
  return jwt.sign(payload, JWT_SECRET_KEY);
};

const createRefreshToken = (user) => {
  const expToken = new Date();
  expToken.getMonth(expToken.getMonth() + 1);
  const payload = {
    token_type: "refresh",
    user_id: user.id,
    iat: Date.now(),
    exp: expToken.getTime(),
  };
  return jwt.sign(payload, JWT_SECRET_KEY);
};

const decode = (token) => {
  return jwt.decode(token, JWT_SECRET_KEY, true);
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  decode,
};
