const Menu = require("../models/menu");

const getMenus = async (req, res) => {
  const { active } = req.query;
  let menu = [];
  if (active === undefined) {
    menu = await Menu.find().sort({ order: "asc" });
  } else {
    menu = await Menu.find({ active }).sort({ order: "asc" });
  }
  res.status(200).send({ menu });
};

const createMenu = async (req, res) => {
  const { title, path, order, active } = req.body;

  const newMenu = new Menu({
    title,
    path,
    order,
    active,
  });
  const menu = await newMenu.save();
  res.status(201).send({ menu });
};

const updateMenu = async (req, res) => {
  const { id } = req.params;
  const menuData = req.body;
  try {
    const menu = await Menu.findByIdAndUpdate(id, { ...menuData });
    res.status(200).send({ menu });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const deleteMenu = async (req, res) => {
  const { id } = req.params;

  await Menu.findByIdAndDelete(id);

  res.status(200).send({ msg: "El menu se elimino con exito" });
};

module.exports = { createMenu, getMenus, updateMenu, deleteMenu };
