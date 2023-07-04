const mongoose = require("mongoose");
const app = require("./app");
const { DB_PASSWORD, DB_USER, DB_HOST } = require("./constants");

const port = process.env.PORT || 3977;

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(port, () => {
      console.log("Conectado al puerto", port);
    });
  })
  .catch((err) => {
    console.log("Error connect", err);
  });
