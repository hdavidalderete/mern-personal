const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");

const register = (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!email) res.status(400).send({ msg: "El email es obligatorio" });

  if (!password) res.status(400).send({ msg: "El password es obligatorio" });

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  const user = new User({
    firstName,
    lastName,
    password: hashPassword,
    email: email.toLowerCase(),
    role: "user",
    active: true,
  });
  user
    .save()
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => {
      res.status(400).send({ msg: "Error al crear el usuario" });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email) res.status(400).send({ msg: "El email es obligatorio" });

  if (!password) res.status(400).send({ msg: "El password es obligatorio" });

  User.findOne({ email: email.toLowerCase() })
    .then((user) => {
      bcrypt
        .compare(password, user.password)
        .then((isEqual) => {
          if (isEqual) {
            if (!user.active) {
              res.status(200).send({ msg: "Usuario inactivo" });
            } else {
              res.status(200).send({
                accessToken: jwt.createAccessToken(user),
                refreshToken: jwt.createRefreshToken(user),
              });
            }
          } else {
            res.status(404).send({ msg: "No se encontro el usuario" });
          }
        })
        .catch((error) => {
          res.status(500).send({ msg: "Error en el servidor", error });
        });
    })
    .catch((error) => {
      res.status(500).send({ msg: "Error en el servidor", error });
    });
};

const refreshAccessToken = (req, res) => {
  const { token } = req.body;
  const { user_id } = jwt.decode(token);

  User
    .findOne({ _id: user_id })
    .then((user) => {
      res.status(200).send({
        accessToken: jwt.createAccessToken(user),
      });
    })
    .catch((error) => {
      res.status(500).send({ msg: "Error en el servidor", error });
    });
};

module.exports = { register, login, refreshAccessToken };
