const express = require("express");
const menuController = require("../controllers/menu");
const authMD = require("../middleware/authenticated");
const router = express.Router();

router.get("/menu/menus", menuController.getMenus);

router.post("/menu/menu", [authMD.asureAuth], menuController.createMenu);

router.patch("/menu/menu/:id", [authMD.asureAuth], menuController.updateMenu);

router.delete("/menu/menu/:id", [authMD.asureAuth], menuController.deleteMenu);

module.exports = router;
