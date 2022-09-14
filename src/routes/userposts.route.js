
// user posts servive

const service = require("../services/userposts.service");
const router = require("express").Router();

router.get("/", service.getAllPosts);
router.get("/:id", service.getPostById);
router.post("/", service.createPost);
router.put("/:id", service.updatePost);
router.delete("/:id", service.deletePost);

module.exports = router;