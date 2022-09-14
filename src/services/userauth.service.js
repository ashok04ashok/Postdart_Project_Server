// User Service

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const helper = require("../helper/userauth.helper");


const service = {

  // User register service
  async register(req, res) {

    try {
      // Data validation
      const user = await helper.validateRegisterSchema(req.body);


      // User exist username
      const userExistUserName = await helper.findByUserNameActiveTrue(user.userName);
      if (userExistUserName) return res.status(403).send({ error: "User Name already exist" });

      // User  useremail
      const userExistEmail = await helper.findByEmailActiveTrue(user.email);
      if (userExistEmail) return res.status(403).send({ error: "User Email already exist" });

      // User Generate Password
      user.password = await bcrypt.hash(user.password, await bcrypt.genSalt());
      delete user.confirmPassword;
      // create database
      const insertId = await helper.createUser({
        ...user,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        active: true
      });

      res.status(201).send({ message: "User Register successfully" });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },


  // User login service
  async login(req, res) {

    try {
      // Data vaidation
      const user = await helper.validateLoginSchema(req.body);

      // User exist
      const dbUser = await helper.findByEmailActiveTrue(user.email);
      if (!dbUser) return res.status(403).send({ error: "Invalid Email" });

      // Password vaidation 
      const isSame = await bcrypt.compare(user.password, dbUser.password);
      if (!isSame) return res.status(403).send({ error: "Invalid password" });

      // User Generate auth token
      const authToken = await jwt.sign({ _id: dbUser._id, email: dbUser.userName }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.status(202).send({ message: "User Login successfully", authToken });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },
};

// export
module.exports = service;
