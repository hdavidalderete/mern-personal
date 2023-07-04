const Newsletter = require("../models/newsletter");

const getNewsletters = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const optionPagination = {
    page: parseInt(page),
    limit: parseInt(limit),
  };
  Newsletter.paginate({}, optionPagination, (error, newsletter) => {
    if (error) {
      res.status(500).send({ error });
    } else {
      res.status(200).send({ newsletter });
    }
  });
};

const suscribeEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) res.status(400).send({ msg: "El email es obligatorio" });

    const newNewsletter = new Newsletter({ email });
    const newsletter = await newNewsletter.save();
    res.status(201).send({ newsletter });
  } catch (error) {
    res.status(500).send({ msg: "Error al registrar el email", error });
  }
};

const deleteNewsletter = async (req, res) => {
  const { id } = req.params;

  await Newsletter.findByIdAndDelete(id);

  res.status(200).send({ msg: "El newsletter se elimino con exito" });
};

module.exports = {
  suscribeEmail,
  getNewsletters,
  deleteNewsletter,
};
