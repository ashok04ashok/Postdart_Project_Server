
// user Message servive

const service = require("../services/usermessage.service");
const router = require("express").Router();

router.get("/", service.getAllMessage);
router.get("/:id", service.getMessageById);
router.post("/", service.createMessage);
router.put("/:id", service.updateMessage);
router.delete("/:id", service.deleteMessage);

module.exports = router;