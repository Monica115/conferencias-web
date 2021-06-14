const { Router } = require("express");
const GeneralCtr = require("../Controllers/GeneralCtr");

const router = Router();

router.route("/").get(GeneralCtr.inicio);

module.exports = router;
