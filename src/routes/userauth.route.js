// import files
const service = require("../services/userauth.service");
const router = require("express").Router();

// userauth router
router.post("/register", service.register);
router.post("/login", service.login);




module.exports = router;
