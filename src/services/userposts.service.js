// Posts Service

const helper = require("../helper/userposts.helper");


const service = {

    // Get -get all post
    async getAllPosts(req, res) {

        try {
            console.log("getAllPost")
            const data = await helper.findActiveTrue();

            res.status(202).send(data);
        } catch (error) {
            res.status(500).send({ error: "Cannot Fetch All Posts" });
        }
    },
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // Get -all post get by Id
    async getPostById(req, res) {

        try {
            console.log("getPostById ")
            const data = await helper.findByIdActiveTrue(req.params.id);

            res.status(202).send(data);
        } catch (error) {
            res.status(500).send({ error: "Cannot Fetch All Posts" });
        }
    },

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // Post -create Post
    async createPost(req, res) {

        try {
            // Data validation    
            console.log("createPost")
            const post = await helper.validate(req.body);

            // create database
            const userId = req.user._id
            const { insertedId: _id } = await helper.create({
                ...post,
                userId,
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
            const newpost = await helper.validate(req.body);

            // Post_ params id validation
            const oldPost = await helper.findByIdActiveTrue(req.params.id);
            if (!oldPost) return res.status(403).send({ error: "Post user Invalid" });

            // Post_ userId validation
            const userId = req.user._id
            if (oldPost.userId !== userId) return res.status(403).send({ error: "User Invalid" });

            // Post_ active validation
            if (!oldPost.active) return res.status(403).send({ error: "Post user Invalid" });

            // Post_ Update data 
            const updatedData = await helper.update({
                _id: oldPost._id,
                ...newpost,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
            });

            res.status(202).send({ message: "Post update successfully" });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    //Delete- delete post
    async deletePost(req, res) {
        try {

            // Posts params id validation
            console.log("deletePost")
            const post = await helper.findByIdActiveTrue(req.params.id);
            if (!post) return res.status(403).send({ error: "Post user Invalid" });

            // Delete userId validation
            const userId = req.user._id
            if (post.userId !== userId) return res.status(403).send({ error: "User Invalid" });

            // Delete active validation
            if (!post.active) return res.status(403).send({ error: "Post user Invalid" });

            // Delete database
            const updatedData = await helper.update({
                _id: post._id,
                active: false,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
            });

            res.status(202).send({ message: "Post delete  successfully" });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
}


module.exports = service;