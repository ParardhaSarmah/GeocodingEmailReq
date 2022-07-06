const express = require("express");
const emailRequirement = require("./../controllers/emailRequirement");
const router = express.Router();
router.route("/emailreq").get(emailRequirement.emailRequirement);
module.exports = router;
