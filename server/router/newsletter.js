const express = require("express");
const newsletterController = require("../controllers/newsletter");
const authMD = require("../middleware/authenticated");
const router = express.Router();

router.get(
  "/newsletter/newsletters",
  [authMD.asureAuth],
  newsletterController.getNewsletters
);

router.post("/newsletter/newsletter", newsletterController.suscribeEmail);

router.delete(
  "/newsletter/newsletter/:id",
  [authMD.asureAuth],
  newsletterController.deleteNewsletter
);

module.exports = router;
