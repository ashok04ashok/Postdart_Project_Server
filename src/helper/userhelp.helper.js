// User Help Helper
const { ObjectId } = require("mongodb");
const Joi = require("joi");
const db = require("../shared/mongodb");


// helpsShema
const userHelpSchema = Joi.object({
  fullName: Joi.string().required(),
  contactNumber: Joi.number().required(),
  email: Joi.string().email().required(),
  write: Joi.string().min(3).required(),
  status: Joi.any(),
});

//admin helpsShema
const adminUserHelpSchema = Joi.object({
  fullName: Joi.string(),
  contactNumber: Joi.number(),
  email: Joi.string().email(),
  write: Joi.string().min(3),
  status: Joi.any(),
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const helper = {

  // userHelpSchema validation
  validate(help) {
    try {
      return userHelpSchema.validateAsync(help);
    } catch ({ details: [{ message }] }) {
      throw new Error(message);
    }
  },

  // userHelpSchema validation
  validateAdmin(help) {
    try {
      return adminUserHelpSchema.validateAsync(help);
    } catch ({ details: [{ message }] }) {
      throw new Error(message);
    }
  },
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // help- find mongodb_all help
  findAll() {
    return db.help.find().toArray();
  },
  // help- find mongodb_all help active true
  findActiveTrue() {
    return db.help.find({ active: true }).toArray();
  },
  // help- find mongodb_all help active false
  findActiveFalse() {
    return db.help.find({ active: false }).toArray();
  },


  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // help- insertone mongodb_one help
  create(help) {
    return db.help.insertOne(help);
  },



  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // help- updateone mongodb_one help
  update({ _id, ...help }) {
    return db.help.findOneAndUpdate(
      { _id: ObjectId(_id) },
      { $set: { ...help } },
      { returnDocument: "true" }
    );
  },

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // help- deleteOne mongodb_ one help
  deleteById(_id) {
    return db.help.deleteOne({ _id: ObjectId(_id) });
  },
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

};

module.exports = helper;
