// Profile Service

const helper = require("../helper/userprofile.helper");

const service = {

    // Get -get all Profile
    async getAllProfile(req, res) {

        try {
            console.log("getAllProfile ")
            const data = await helper.findAll();

            res.status(202).send(data);
        } catch (error) {
            res.status(500).send({ error: "Cannot Fetch All Profile" });
        }
    },

    // Get -get active Profile
    async getAllProfileActiveTrue(req, res) {

        try {
            console.log("getAllProfileActiveTrue")
            const data = await helper.findActiveTrue();

            res.status(202).send(data);
        } catch (error) {
            res.status(500).send({ error: "Cannot Fetch All Profile" });
        }
    },

    // Get -inacive  Profile
    async getAllProfileActiveFalse(req, res) {

        try {
            console.log("getAllProfileActiveFalse")
            const data = await helper.findActiveFalse();

            res.status(202).send(data);
        } catch (error) {
            res.status(500).send({ error: "Cannot Fetch All Profile" });
        }
    },

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // Get -get active and inactive Profile id
    async getProfileById(req, res) {

        try {
            console.log("user Profile getById ")
            const data = await helper.findById(req.params.id);

            res.status(202).send(data);
        } catch (error) {
            res.status(500).send({ error: "Cannot Fetch All Profile" });
        }
    },


    // Get -get active Profile id
    async getProfileByIdActiceTrue(req, res) {

        try {
            console.log("user Profile getById ")
            const data = await helper.findByIdActiveTrue(req.params.id);

            res.status(202).send(data);
        } catch (error) {
            res.status(500).send({ error: "Cannot Fetch All Profile" });
        }
    },



    // Get -get inactive Profile id
    async getProfileByIdActiceFalse(req, res) {

        try {
            console.log("user Profile getById ")
            const data = await helper.findByIdActiveFalse(req.params.id);

            res.status(202).send(data);
        } catch (error) {
            res.status(500).send({ error: "Cannot Fetch All Profile" });
        }
    },

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    
    // Profile -create Profile
    async createProfile(req, res) {

        try {
            // Data validation    
            console.log("createProfile ")
            const Profile = await helper.validate(req.body);

            // Profile_ params id validation
            const ProfileId = await helper.findAll(Profile.userId)
            if (!ProfileId) return res.status(403).send({ error: "Profile user Invalid" });

            // create database
            const insertedId = await helper.create({
                ...Profile,
                _id: ProfileId._id,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                active: true
            });

            res.status(201).send({ message: "Profile create successfully" });
        } catch (error) {
            res.status(500).send({ error: error.Profile });
        }
    },
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // Put- update Profile
    async updateProfile(req, res) {

        try {
            // Data validation
            console.log("updateProfile ")
            const Profile = req.body

            // users_ params id validation
            const oldProfile = await helper.findById(Profile._id);
            if (!oldProfile) return res.status(403).send({ error: "Profile users Invalid" });

            // update database
            const updatedData = await helper.update({
                ...Profile,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
            });

            res.status(202).send({ message: "Profile update successfully" });
        } catch (error) {
            res.status(500).send({ error: error.Profile });
        }
    },

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // Put- users active  
    async ProfileUpdateActiveTrue(req, res) {

        try {
            // Data validation
            console.log("ProfileUpdateActiveTrue")
            const oldProfile = await helper.findById(req.params.id);
            if (!oldProfile) return res.status(403).send({ error: "Profile user Invalid" });

            // update database
            const updatedData = await helper.update({
                _id: oldProfile._id,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                active: true
            });

            res.status(202).send({ message: "Profile active successfully" });
        } catch (error) {
            res.status(500).send({ error: error.Profile });
        }
    },
  

    // Put- Profile inactive 
    async ProfileUpdateActiveFalse(req, res) {

        try {
            // Data validation
            console.log("ProfileUpdateActiveFalse")
            const oldusers = await helper.findById(req.params.id);
            if (!oldusers) return res.status(403).send({ error: "Profile user Invalid" });
            
            // update database
            const updatedData = await helper.update({
                _id: oldusers._id,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                active: false
            });
            res.status(202).send({ message: "Profile inactive successfully" });
        } catch (error) {
            res.status(500).send({ error: error.Profile });
        }
    },




    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


    //Delete- delete Profile
    async deleteProfile(req, res) {
        try {
            // Profile_ Profile id validation
            console.log("deleteProfile")
            const Profile = req.body
            const oldProfile = await helper.findByIdActiveFalse(Profile._id);
            if (!oldProfile) return res.status(403).send({ error: "Profile user Invalid" });
           
            // Delete database
            const deleteProfile = await helper.deleteById(oldProfile._id);

            res.status(202).send({ message: "Profile delete successfully" });
        } catch (error) {
            res.status(500).send({ error: error.Profile });
        }
    },
}


module.exports = service;
