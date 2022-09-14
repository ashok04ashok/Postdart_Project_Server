// admin user servive
const service = require("../services/adminusers.service");
const servicePost = require("../services/adminuserposts.service");
const serviceMessage = require("../services/adminusermessage.service");
const serviceProfile = require("../services/adminuserprofile.service");
const serviceHelp = require("../services/adminhelp.service ");
const router = require("express").Router();

// users
router.get("/alluser/", service.getUsers);
router.get("/activeuser/", service.getUsersActiveTrue);
router.get("/inactiveuser/", service.getUsersActiveFalse);

router.get("/alluser/:id/", service.getUserById);
router.get("/activeuser/:id/", service.getUserByIdActiveTrue);
router.get("/inactiveuser/:id/", service.getUserByIdActiveFalse);

router.post("/createuser", service.createUser);

router.put("/updateuser/", service.updateUser);

router.put("/activeuser/:id/", service.userUpdateActiveTrue);
router.put("/inactiveuser/:id/", service.userUpdateActiveFalse);

router.delete("/deleteuser/", service.deleteUser);




// posts
router.get("/post/", servicePost.getAllPost);
router.get("/activepost/", servicePost.getAllPostActiveTrue);
router.get("/inactivepost/", servicePost.getAllPostActiveFalse);

router.get("/post/:id/", servicePost.getPostById);
router.get("/activepost/:id/", servicePost.getPostByIdActiceTrue);
router.get("/inactivepost/:id/", servicePost.getPostByIdActiceFalse);

router.post("/createpost", servicePost.createPost);
router.post("/publicpost", servicePost.createPost);

router.put("/updatepost/", servicePost.updatePost);

router.put("/activepost/:id/", servicePost.postUpdateActiveTrue);
router.put("/inactivepost/:id/", servicePost.postUpdateActiveFalse);

router.delete("/deletepost", servicePost.deletePost);


//Message

router.get("/message/", serviceMessage.getAllMessage);
router.get("/activemessage/", serviceMessage.getAllMessageActiveTrue);
router.get("/inactivemessage/", serviceMessage.getAllMessageActiveFalse);

router.get("/message/:id/", serviceMessage.getMessageById);
router.get("/activemessage/:id/", serviceMessage.getMessageByIdActiceTrue);
router.get("/inactivemessage/:id/", serviceMessage.getMessageByIdActiceFalse);

router.post("/createmessage/", serviceMessage.createMessage);


router.put("/updatemessage/", serviceMessage.updateMessage);

router.put("/activemessage/:id/", serviceMessage.MessageUpdateActiveTrue);
router.put("/inactivemessage/:id/", serviceMessage.MessageUpdateActiveFalse);

router.delete("/deleteMessage/", serviceMessage.deleteMessage);



//Profile

router.get("/profile/", serviceProfile.getAllProfile);
router.get("/activeprofile/", serviceProfile.getAllProfileActiveTrue);
router.get("/inactiveprofile/", serviceProfile.getAllProfileActiveFalse);

router.get("/profile/:id/", serviceProfile.getProfileById);
router.get("/activeprofile/:id/", serviceProfile.getProfileByIdActiceTrue);
router.get("/inactiveprofile/:id/", serviceProfile.getProfileByIdActiceFalse);

router.post("/createprofile/", serviceProfile.createProfile);
router.post("/publicprofile/", serviceProfile.createProfile);

router.put("/updateprofile/", serviceProfile.updateProfile);

router.put("/activeprofile/:id/", serviceProfile.ProfileUpdateActiveTrue);
router.put("/inactiveprofile/:id/", serviceProfile.ProfileUpdateActiveFalse);

router.delete("/deleteprofile/", serviceProfile.deleteProfile);


// //help
router.get("/help", serviceHelp.getAllHelp);
router.get("/activehelp", serviceHelp.getAllHelpActiveTrue);
router.get("/inactivehelp", serviceHelp.getAllHelpActiveFalse);

router.post("/help", serviceHelp.createHelp);
router.put("/help", serviceHelp.updateHelp);
router.delete("/help", serviceHelp.deleteHelp);

module.exports = router;
