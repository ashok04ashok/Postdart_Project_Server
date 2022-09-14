// Admin Helper

const { ObjectId } = require("mongodb");
const Joi = require("joi");
const db = require("../shared/mongodb");

// admin registerSchema
const registerSchema = Joi.object({
  adminName: Joi.string().required(),
  email: Joi.string().email().required(),
  code: Joi.string().min(3).max(20).required(),
  password: Joi.string().min(3).max(20).required(),
  confirmPassword: Joi.ref("password"),
});

// admin loginSchema
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  code: Joi.string().min(3).max(20).required(),
  password: Joi.string().min(3).max(20).required(),
});

const helper = {

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // admin register  validate Schema
  validateRegisterSchema(admin) {
    try {
      return registerSchema.validateAsync(admin);
    } catch ({ details: [{ message }] }) {
      throw new Error(message);
    }
  },
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // admin login validate Schema
  validateLoginSchema(admin) {
    try {
      return loginSchema.validateAsync(admin);
    } catch ({ details: [{ message }] }) {
      throw new Error(message);
    }
  },


  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // admin-findone mongdb_ find email  id
  findByEmailId(email) {
    return db.admin.findOne({ email, active: true });
  },

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // admin-insert mongdb_ create admin
  createadmin(admin) {
    return db.admin.insertOne(admin);
  },

};

module.exports = helper;
