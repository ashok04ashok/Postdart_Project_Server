// profile Helper
const { ObjectId } = require("mongodb");
const Joi = require("joi");
const db = require("../shared/mongodb");


// profilesShema
const profileSchema = Joi.object({
  userId: Joi.any().required(),
  photo: Joi.any(),
  gender: Joi.string(),
  DOB: Joi.any(),
  contact: Joi.number(),
  email: Joi.string().email(),
  location: Joi.string(),
  write: Joi.any(),
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const helper = {

  // profileSchema validation
  validate(profile) {
    try {
      return profileSchema.validateAsync(profile);
    } catch ({ details: [{ message }] }) {
      throw new Error(message);
    }
  },
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // profile- find mongodb_all profile
  findAll() {
    return db.profile.find().toArray();
  },
  // profile- find mongodb_all profile active true
  findActiveTrue() {
    return db.profile.find({ active: true }).toArray();
  },
  // profile- find mongodb_all profile active false
  findActiveFalse() {
    return db.profile.find({ active: false }).toArray();
  },


  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // profile- find by id mongodb_id profile all
  findById(_id) {
    return db.profile.findOne({ _id: ObjectId(_id) });
  },
  // profile- find by id mongodb_id profile active true
  findByIdActiveTrue(_id) {
    return db.profile.findOne({ _id: ObjectId(_id), active: true });
  },
  // profile- find by id mongodb_id profile active false
  findByIdActiveFalse(_id) {
    return db.profile.findOne({ _id: ObjectId(_id), active: false });
  },

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


  // profile- insertone mongodb_one profile
  create(profile) {
    return db.profile.insertOne(profile);
  },



  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // profile- updateone mongodb_one profile
  update({ _id, ...profile }) {
    return db.profile.findOneAndUpdate(
      { _id: ObjectId(_id) },
      { $set: { ...profile } },
      { returnDocument: "true" }
    );
  },

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // profile- deleteOne mongodb_ one profile
  deleteById(_id) {
    return db.profile.deleteOne({ _id: ObjectId(_id) });
  },
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

};

module.exports = helper;
