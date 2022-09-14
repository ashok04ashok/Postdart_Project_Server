// Post Helper
const { ObjectId } = require("mongodb");
const Joi = require("joi");
const db = require("../shared/mongodb");


// postsShema
const postsSchema = Joi.object({
  userId: Joi.any(),
  desc: Joi.string().required(),
  photo: Joi.any(),
  like:Joi.defaults
});
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// postsShema
const adminPostsSchema = Joi.object({
  userId: Joi.any(),
  desc: Joi.string().required(),
  photo: Joi.any()
});

const helper = {

  // postSchema validation
  validate(posts) {
    try {
      return postsSchema.validateAsync(posts);
    } catch ({ details: [{ message }] }) {
      throw new Error(message);
    }
  },


  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // postSchema validation
  validateAdminPost(posts) {
    try {
      return adminPostsSchema.validateAsync(posts);
    } catch ({ details: [{ message }] }) {
      throw new Error(message);
    }
  },
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // post- find mongodb_all posts
  findAll() {
    return db.posts.find().toArray();
  },
  // post- find mongodb_all posts active true
  findActiveTrue() {
    return db.posts.find({ active: true }).toArray();
  },
  // post- find mongodb_all posts active false
  findActiveFalse() {
    return db.posts.find({ active: false }).toArray();
  },

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // post- find by id mongodb_id posts all
  findById(_id) {
    return db.posts.findOne({ _id: ObjectId(_id) });
  },
  // post- find by id mongodb_id posts active true
  findByIdActiveTrue(_id) {
    return db.posts.findOne({ _id: ObjectId(_id), active: true });
  },
  // post- find by id mongodb_id posts active false
  findByIdActiveFalse(_id) {
    return db.posts.findOne({ _id: ObjectId(_id), active: false });
  },

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // post- insertone mongodb_one posts
  create(posts) {
    return db.posts.insertOne(posts);
  },

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // post- updateone mongodb_one posts
  update({ _id, ...posts }) {
    return db.posts.findOneAndUpdate(
      { _id: ObjectId(_id) },
      { $set: { ...posts } },
      { returnDocument: "true" }
    );
  },

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // post- deleteOne mongodb_ one posts
  deleteById(_id) {
    return db.posts.deleteOne({ _id: ObjectId(_id) });
  },
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

};

module.exports = helper;
