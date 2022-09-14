// import files
const { MongoClient } = require("mongodb");


const mongo = {
  // Export files
  db: null,
  users: null,
  help: null,
  admin: null,
  posts: null,
  profile: null,
  message: null,

  // connect mongodb
  async connect() {
    
    
    // get URL
    const client = await new MongoClient(process.env.MONGO_DB_URL);
    await client.connect();
    console.log(`monogodb is connected successfully ${process.env.MONGO_DB_URL}`);



    // get DB Name
    this.db = await client.db(process.env.MONGO_DB_NAME);
    console.log(`db name is ${process.env.MONGO_DB_NAME}`);



    // get DB collection
    this.help = this.db.collection("help");
    this.users = this.db.collection("users");
    this.admin = this.db.collection("admin");
    this.posts = this.db.collection("posts");
    this.profile = this.db.collection("profile");
    this.message = this.db.collection("message");
    console.log( `${process.env.MONGO_DB_NAME} collection initillized successfully` );

  },
};



// export
module.exports = mongo;
