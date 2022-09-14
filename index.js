const express = require("express");
const mongo = require("./src/shared/mongodb");
const middleware = require("./src/shared/middleware");
const routes = require("./src/routes/routes");
const cors = require("cors");

const  {config} = require("dotenv");
config();
// port
const PORT = process.env.PORT ;

// express
const app = express();

// connectivity
(async () => {
  try {
    // mongo db
    await mongo.connect();

    // middleware
    app.use(cors());
    app.use(express.json({ limit: "mb" }));
    
    app.use(middleware.logging);
    app.use(middleware.maintenance);
    console.log("middleware initillized successfully");

    // routes
    app.get("/", (req, res) => res.send("welcome to Postdart API world"));

    app.use("/api/adminauth", routes.adminRoute);
    app.use("/api/admin", routes.userRoute);
    
    app.use("/api/help", routes.helpRoute);
    app.use("/api/userauth", routes.authRoute);
    app.use(middleware.auth);
    app.use("/api/posts", routes.postsRoute);
    app.use("/api/profile", routes.profileRoute);
    app.use("/api/message", routes.messageRoute);

    console.log("routes initillized successfully");

    // port listen
    app.listen(PORT, () =>
      console.log(`server listening at a ${PORT}`)
    );
  } catch (error) {
    console.log("error starting postdart", error.message);
  }
})();