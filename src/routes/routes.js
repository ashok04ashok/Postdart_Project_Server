// Common routeS
const routes = {
  authRoute: require("./userauth.route"),
  adminRoute: require("./adminauth.route"),
  postsRoute: require("./userposts.route"),
  userRoute: require("./adminuser.route "),
  profileRoute: require("./userprofile.route"),
  messageRoute: require("./usermessage.route"),
  helpRoute: require("./userhelp.route")
};

module.exports = routes;
