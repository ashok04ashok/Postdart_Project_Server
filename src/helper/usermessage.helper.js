// Message Helper
const { ObjectId } = require("mongodb");
const Joi = require("joi");
const db = require("../shared/mongodb");


// MessageShema
const messageSchema = Joi.object({
  desc: Joi.any(),
});


// adnin MessageShema
const adminMessageSchema = Joi.object({
  userId: Joi.any(),
  desc: Joi.string(),
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const helper = {

  // MessageSchema validation
  validate(message) {
    try {
      return messageSchema.validateAsync(message);
    } catch ({ details: [{ message }] }) {
      throw new Error(message);
    }
  },

  
  //admin MessageSchema validation
  validateAdmin(message) {
    try {
      return adminMessageSchema.validateAsync(message);
    } catch ({ details: [{ message }] }) {
      throw new Error(message);
    }
  },
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // message- find mongodb_all message
  findAll() {
    return db.message.find().toArray();
  },
  // message- find mongodb_all message active true
  findActiveTrue() {
    return db.message.find({ active: true }).toArray();
  },
  // message- find mongodb_all message active false
  findActiveFalse() {
    return db.message.find({ active: false }).toArray();
  },


  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // message- find by id mongodb_id message all
  findById(_id) {
    return db.message.findOne({ _id: ObjectId(_id) });
  },
  // message- find by id mongodb_id message active true
  findByIdActiveTrue(_id) {
    return db.message.findOne({ _id: ObjectId(_id), active: true });
  },
  // message- find by id mongodb_id message active false
  findByIdActiveFalse(_id) {
    return db.message.findOne({ _id: ObjectId(_id), active: false });
  },

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


  // message- insertone mongodb_one message
  create(message) {
    return db.message.insertOne(message);
  },



  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // message- updateone mongodb_one message
  update({ _id, ...message }) {
    return db.message.findOneAndUpdate(
      { _id: ObjectId(_id) },
      { $set: { ...message } },
      { returnDocument: "true" }
    );
  },

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // message- deleteOne mongodb_ one message
  deleteById(_id) {
    return db.message.deleteOne({ _id: ObjectId(_id) });
  },
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

};

module.exports = helper;
