//User Helper

const bcrypt = require("bcrypt");
const helper = require("../helper/userauth.helper");


const service = {

    // Get -get all active and inctive users
    async getUsers(_, res) {

        try {
            console.log("getUsers")
            const data = await helper.findAll();

            res.status(202).send(data);
        } catch (error) {
            res.status(500).send({ error: "Cannot Fetch All users" });
        }
    },

    // Get - active users 
    async getUsersActiveTrue(_, res) {

        try {
            console.log("getUsersActiveTrue")
            const data = await helper.findActiveTrue();

            res.status(202).send(data);
        } catch (error) {
            res.status(500).send({ error: "Cannot Fetch active users" });
        }
    },

    // Get -inactive  users
    async getUsersActiveFalse(_, res) {

        try {
            console.log("getUsersActiveFalse ")
            const data = await helper.findActiveFalse();

            res.status(202).send(data);
        } catch (error) {
            res.status(500).send({ error: "Cannot inactive  users" });
        }
    },


    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // Get - inactive users id
    async getUserById(req, res) {

        try {
            console.log("getUserById")
            const data = await helper.findById(req.params.id);

            res.status(202).send(data);
        } catch (error) {
            res.status(500).send({ error: "Cannot Fetch  user id" });
        }
    },

    // Get -active user Id  
    async getUserByIdActiveTrue(req, res) {

        try {
            console.log("getUserByIdActiveTrue")
            const data = await helper.findByIdActiveTrue(req.params.id);

            res.status(202).send(data);
        } catch (error) {
            res.status(500).send({ error: "Cannot Fetch active user id" });
        }
    },

    // Get - inactive user Id 
    async getUserByIdActiveFalse(req, res) {
        try {
            console.log("getUserByIdActiveFalse")
            const data = await helper.findByIdActiveFalse(req.params.id);

            res.status(202).send(data);
        } catch (error) {
            res.status(500).send({ error: "Cannot Fetch inactive user id" });
        }
    },


    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // Post -create users
    async createUser(req, res) {

        try {
            // Data validation
            console.log("createUser")
            const user = await helper.validateRegisterSchema(req.body);

            // User exist username validate
            const userExistUserName = await helper.findByUserNameActiveTrue(user.userName);
            if (userExistUserName) return res.status(403).send({ error: "User Name already exists" });

            // User  useremail validate
            const userExistEmail = await helper.findByEmailActiveTrue(user.email);
            if (userExistEmail) return res.status(403).send({ error: "User Email already  exists" });


            // User Generate Password
            user.password = await bcrypt.hash(user.password, await bcrypt.genSalt());
            delete user.confirmPassword;

            // create database
            const insertId  = await helper.createUser({
                ...user,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                active: true
            });

            res.status(201).send({ message: "User  Register successfully" });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },


    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // Put-update user 
    async updateUser(req, res) {

        try {
            // Data validation
            console.log("updateUsers")
            const user = req.body

            // users_ body id validation 
            const oldusers = await helper.findById(user._id);
            if (!oldusers) return res.status(403).send({ error: "User Invalid" });

            // update database
            const updatedData = await helper.update({
                _id: oldusers._id,
                ...user,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
            });

            res.status(202).send({ message: "User update successfully" });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // Put- users active  
    async userUpdateActiveTrue(req, res) {

        try {
            // Data validation
            console.log("userUpdateActiveTrue")
            const oldusers = await helper.findByIdActiveFalse(req.params.id);
            if (!oldusers) return res.status(403).send({ error:  "User Invalid" });
            
            // update database
            const updatedData = await helper.update({
                _id: oldusers._id,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                active: true
            });
            res.status(202).send({ message: "User active successfully" });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },


    // Put- user inactive 
    async userUpdateActiveFalse(req, res) {

        try {
            // Data validation
            console.log("userUpdateActiveTrue")
            const oldusers = await helper.findByIdActiveTrue(req.params.id);
            if (!oldusers) return res.status(403).send({ error:  "User Invalid" });
        
            // update database
            const updatedData = await helper.update({
                _id: oldusers._id,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                active: false
            });
            res.status(202).send({ message: "User inactive successfully" });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    //Delete- delete users
    async deleteUser(req, res) {
        try {
            // user params id validation
            console.log("deleteUser")
            const user = req.body
            const oldusers = await helper.findByIdActiveFalse(user._id);
            if (!oldusers) return res.status(403).send({ error: "User Invalid" });

            // Delete database
            const updatedData = await helper.deleteById(oldusers._id);

            res.status(202).send({ message: "User delete  successfully" });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

};

module.exports = service;