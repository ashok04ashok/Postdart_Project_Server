
// user Help servive

const service = require("../services/userhelp.service");
const router = require("express").Router();

router.post("/", service.createHelp);

module.exports = router;