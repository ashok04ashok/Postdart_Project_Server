//user Helper
const { ObjectId } = require("mongodb");
const Joi = require("joi");
const db = require("../shared/mongodb");


// user auth registerSchema
const userRegisterSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(1).required(),
  userName: Joi.any().required(),
  contactNumber: Joi.number().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(20).required(),
  confirmPassword: Joi.ref("password"),
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// adminuser registerSchema
const adminUserRegisterSchema = Joi.object({
  firstName: Joi.string().min(2),
  lastName: Joi.string().min(1),
  userName: Joi.string().min(5),
  contactNumber: Joi.number(),
  email: Joi.string().email(),
  password: Joi.string().min(3).max(20),
  confirmPassword: Joi.ref("password"),
  active: Joi.any(),
});


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// user auth loginSchema
const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(20).required(),
});





const helper = {

  // user auth register validationSchema 
  validateRegisterSchema(user) {
    try {
      return userRegisterSchema.validateAsync(user);
    } catch ({ details: [{ message }] }) {
      throw new Error(message);
    }
  },
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


  // user auth register validationSchema 
  validateAdminRegisterSchema(user) {
    try {
      return adminUserRegisterSchema.validateAsync(user);
    } catch ({ details: [{ message }] }) {
      throw new Error(message);
    }
  },
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // user auth Login validationSchema 
  validateLoginSchema(user) {
    try {
      return userLoginSchema.validateAsync(user);
    } catch ({ details: [{ message }] }) {
      throw new Error(message);
    }
  },
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // user -findone  mongodb _ find email 
  findByUserName(userName) {
    return db.users.findOne({ userName: (userName) });
  },
  // user -findone  mongodb _  find userName ActiveTrue
  findByUserNameActiveTrue(userName) {
    return db.users.findOne({ userName: (userName), active: true });
  },
  // user -findone  mongodb _ find userName Active false
  findByUserNameActiveFalse(userName) {
    return db.users.findOne({ userName: (userName), active: false });
  },

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


  // user -findone  mongodb _ find email 
  findByEmail(email) {
    return db.users.findOne({ email: (email) });
  },
  // user -findone  mongodb _  find email ActiveTrue
  findByEmailActiveTrue(email) {
    return db.users.findOne({ email: (email), active: true });
  },
  // user -findone  mongodb _ find email Active false
  findByEmailActiveFalse(email) {
    return db.users.findOne({ email: (email), active: false });
  },


  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


  // user -find  mongodb _find user
  findAll() {
    return db.users.find().toArray();
  },
  // user -find  mongodb _find user active true
  findActiveTrue() {
    return db.users.find({ active: true }).toArray();
  },
  // user -find  mongodb _find user active false
  findActiveFalse() {
    return db.users.find({ active: false }).toArray();
  },


  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


  // user -findbyid  mongodb _ find Id 
  findById(_id) {
    return db.users.findOne({ _id: ObjectId(_id) });
  },
  // user -findbyid  mongodb _ find Id ActiveTrue
  findByIdActiveTrue(_id) {
    return db.users.findOne({ _id: ObjectId(_id), active: true });
  },
  // user -findbyid  mongodb _ find Id Activefalse
  findByIdActiveFalse(_id) {
    return db.users.findOne({ _id: ObjectId(_id), active: false });
  },


  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



  // user  -insert  mongodb _ create one user
  createUser(user) {
    return db.users.insertOne(user);
  },

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // user  -update one user mongodb 
  update({ _id, ...users }) {
    return db.users.updateOne(
      { _id: ObjectId(_id) },
      { $set: { ...users } },
      { returnDocument: "after" }
    );
  },

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // user   - delete-one user mongo db
  deleteById(_id) {
    return db.users.deleteOne({ _id: ObjectId(_id) });
  },

};

module.exports = helper;
