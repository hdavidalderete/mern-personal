const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

// Import routings
const authRoutes = require("./router/auth");
const userRoutes = require("./router/user");
const menuRoutes = require("./router/menu");
const courseRoutes = require("./router/course");
const postRoutes = require("./router/post");
const newsletterRoutes = require("./router/newsletter");

// Configure body parse
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure static folders
app.use(express.static(path.join(__dirname, "uploads")));

// Configure Header http
app.use(cors());

// Configure Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", menuRoutes);
app.use("/api", courseRoutes);
app.use("/api", postRoutes);
app.use("/api", newsletterRoutes);

module.exports = app;
