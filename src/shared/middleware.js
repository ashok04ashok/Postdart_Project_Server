// import files
const jwt = require("jsonwebtoken");
const userhelper = require("../helper/userauth.helper");

// middleware
const middleware = {
  
  // auth middleware
  async auth(req, res, next) {
    try {
      if (req.headers && req.headers.authorization) {
        const [_, token] = req.headers.authorization.split(" ");
        const user = await jwt.verify(token, process.env.JWT_SECRET);
        const userData = await userhelper.findById(user._id);
        console.log(user._id)
       if(user&&userData){
        req.user=user;
        return  next();
       }
       throw new Error ("User does not Exists")
      } else {
        throw new Error ("User authorization headers does not Exists")
      }
    } catch (error) {
      res.status(403).send({ error: error.message });
    }
  },

  // Entry middleware
  logging(req, res, next) {
    console.log(`${new Date()} - ${req.method} - ${req.url}- ${req.user}`);
    next();
   
  },


  // miantance middlwere
  maintenance(req, res, next) { 
    process.env.IS_MAINTENANCE == "true" ?
     res.send({ message: "sieis under maintance" }) : next(); },

};

// export
module.exports = middleware;
