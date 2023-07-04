const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { getFileName } = require("../utils/image");

const getMe = async (req, res) => {
  const { user_id } = req.user;
  const user = await User.findById(user_id);
  user.password = null;
  if (!user) res.status(404).send({ msg: "El usuario no existe" });
  res.status(200).send({ user });
};

const getUsers = async (req, res) => {
  const { active } = req.query;
  let users = [];
  if (active === undefined) {
    users = await User.find();
  } else {
    users = await User.find({ active });
  }
  res.status(200).send({ users });
};

const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const { avatar } = req.files;
  if (!email) res.status(400).send({ msg: "El email es obligatorio" });

  if (!password) res.status(400).send({ msg: "El password es obligatorio" });

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  const newUser = new User({
    firstName,
    lastName,
    password: hashPassword,
    email: email.toLowerCase(),
    role: "user",
    active: false,
    avatar: getFileName(avatar),
  });
  const user = await newUser.save();
  res.status(201).send({ user });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { password, ...userData } = req.body;
  const { avatar } = req.files;

  // password
  if (password) {
    const salt = bcrypt.genSaltSync(10);
    userData.password = bcrypt.hashSync(password, salt);
  }

  if (avatar) {
    userData.avatar = getFileName(avatar);
  }

  const user = await User.findByIdAndUpdate(id, { ...userData });

  res.status(200).send({ user });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  await User.findByIdAndDelete(id);

  res.status(200).send({ msg: "El Curso se elimino con exito" });
};

module.exports = {
  getMe,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
