const jwt = require("../utils/jwt");

const asureAuth = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(403).send({ msg: "Usted no tiene permisos" });
  }
  token = token.replace("Bearer ", "");

  const payload = jwt.decode(token);
  const { exp } = payload;
  const currentDate = new Date().getTime();

  if (exp < currentDate) {
    return res.status(400).send({ msg: "El token ha expirado" });
  }
  req.user = payload;
  next();
};

module.exports = { asureAuth };
