// Admin Service

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const helper = require("../helper/admin.helper");


// Admin auth service
const service = {

  // Admin register service
  async register(req, res) {

    try {

      // Data validation
      const admin = await helper.validateRegisterSchema(req.body);
      delete admin.confirmPassword;

      // Generate Password
      admin.password = await bcrypt.hash(admin.password, await bcrypt.genSalt());
      
      // Admin validation
      const adminCode = process.env.REGISTER_CODE
      const code = admin.code;
      if (adminCode !== code) return res.status(403).send({ error: "Invalid code" });

      const adminExist = await helper.findByEmailId(admin.email);
      if (adminExist) return res.status(403).send({ error: "Admin Email already exists" });


      // create database
      const insertId = await helper.createadmin({
        ...admin,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        active: true,
      });

      res.status(201).send({ message: "Admin Register successfully" });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  // Admin login service
  async login(req, res) {

    try {
      // Data vaidation
      const admin = await helper.validateLoginSchema(req.body);


 // Admin validation
 const adminCode = process.env.LOGIN_CODE
 const code = admin.code;
 if (adminCode !== code) return res.status(403).send({ error: "Invalid code" });


      // Admin validation
      const dbadmin = await helper.findByEmailId(admin.email);
      if (!dbadmin) return res.status(403).send({ error: "Admin Email doesn't exists" });

      // Password vaidation
      const isSame = await bcrypt.compare(admin.password, dbadmin.password);
      if (!isSame) return res.status(403).send({ error: "Invalid password" });

      // Generate auth validation
      const adminauthToken = await jwt.sign({ _id: dbadmin._id, email: dbadmin.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.status(202).send({ message: "Admin login successfully", adminauthToken });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },
};

module.exports = service;
