
// user profile servive

const service = require("../services/userprofile.service");
const router = require("express").Router();

router.get("/", service.getAllProfile);
router.get("/:id", service.getProfileById);
router.post("/", service.createProfile);
router.put("/:id", service.updateProfile);
router.delete("/:id", service.deleteProfile);

module.exports = router;