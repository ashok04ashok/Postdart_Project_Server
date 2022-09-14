// Post Service

const helper = require("../helper/userposts.helper");

const service = {

    // Get -get all post
    async getAllPost(req, res) {

        try {
            console.log("getAllPost")
            const data = await helper.findAll();

            res.status(202).send(data);
        } catch (error) {
            res.status(500).send({ error: "Cannot Fetch All Post" });
        }
    },
    // Get -active all post
    async getAllPostActiveTrue(req, res) {

        try {
            console.log("getAllPostActiveTrue ")
            const data = await helper.findActiveTrue();

            res.status(202).send(data);
        } catch (error) {
            res.status(500).send({ error: "Cannot Fetch All Post" });
        }
    },

    // Get -inacive all post
    async getAllPostActiveFalse(req, res) {

        try {
            console.log(" getAllPostActiveFalse")
            const data = await helper.findActiveFalse();

            res.status(202).send(data);
        } catch (error) {
            res.status(500).send({ error: "Cannot Fetch All Post" });
        }
    },

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // Get -all active and inactive post id
    async getPostById(req, res) {

        try {
            console.log("getPostById ")
            const data = await helper.findById(req.params.id);

            res.status(202).send(data);
        } catch (error) {
            res.status(500).send({ error: "Cannot Fetch All Post" });
        }
    },


    // Get -all active post id
    async getPostByIdActiceTrue(req, res) {

        try {
            console.log("getPostByIdActiceTrue")
            const data = await helper.findByIdActiveTrue(req.params.id);

            res.status(202).send(data);
        } catch (error) {
            res.status(500).send({ error: "Cannot Fetch All Post" });
        }
    },



    // Get -all inactive post id
    async getPostByIdActiceFalse(req, res) {

        try {
            console.log("getPostByIdActiceFalse")
            const data = await helper.findByIdActiveFalse(req.params.id);

            res.status(202).send(data);
        } catch (error) {
            res.status(500).send({ error: "Cannot Fetch All Post" });
        }
    },

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 
    // Post -create Post
    async createPost(req, res) {

        try {
            // Data validation    
            console.log("createPost")
            const post = await helper.validateAdminPost(req.body);

            // Post_ params id validation
            const PostId = await helper.findAll(post.userId)
            if (!PostId) return res.status(403).send({ error: "Post user Invalid" });

            // create database
            const insertedId = await helper.create({
                ...post,
                _id: PostId._id,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                active: true
            });

            res.status(201).send({ message: "Post create successfully" });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // Put- update Post
    async updatePost(req, res) {

        try {
            // Data validation
            console.log("updatePost ")
            const post = req.body

            // post_ params id validation
            const oldpost = await helper.findById(post._id);
            if (!oldpost) return res.status(403).send({ error: "Post users Invalid" });
            
            // update database
            const updatedData = await helper.update({
                ...post,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
            });

            res.status(202).send({ message: "Post update successfully" });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // Put- users active  
    async postUpdateActiveTrue(req, res) {

        try {
            // Data validation
            console.log("postUpdateActiveTrue")
            const oldPost = await helper.findById(req.params.id);
            if (!oldPost) return res.status(403).send({ error: "Post user Invalid" });
         
            // update database
            const updatedData = await helper.update({
                _id: oldPost._id,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                active: true
            });

            res.status(202).send({ message: "Post active  successfully" });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // Put- post inactive 
    async postUpdateActiveFalse(req, res) {

        try {
            // Data validation
            console.log("postUpdateActiveFalse")
            const oldusers = await helper.findById(req.params.id);
            if (!oldusers) return res.status(403).send({ error: "Post user Invalid" });
        
            // update database
            const updatedData = await helper.update({
                _id: oldusers._id,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                active: false
            });
           
            res.status(202).send({ message: "Post inactive  successfully" });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },




    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


    //Delete- delete post
    async deletePost(req, res) {
        try {

            console.log("deletePost")
            const post = req.body
           
            // post_ post id validation
            const oldPost = await helper.findByIdActiveFalse(post._id);
            if (!oldPost) return res.status(403).send({ error: " Post user Invalid" });
         
            // Delete database
            console.log(oldPost)
            const deletePost = await helper.deleteById(oldPost._id);

            res.status(202).send({ message: "post delete  successfully" });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },
}


module.exports = service;