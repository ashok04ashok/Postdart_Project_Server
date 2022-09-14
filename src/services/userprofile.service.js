// Profile Service

const helper = require("../helper/userprofile.helper");


const service = {

    // Get -get all Profile
    async getAllProfile(req, res) {

        try {
            console.log("getAllProfile ")
            const data = await helper.findActiveTrue();

            res.status(202).send(data);
        } catch (error) {
            res.status(500).send({ error: "Cannot Fetch All profile" });
        }
    },

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // Get -get active Profile id
    async getProfileById(req, res) {

        try {
            console.log("getProfileById ")
            const data = await helper.findByIdActiveTrue(req.params.id);

            res.status(202).send(data);
        } catch (error) {
            res.status(500).send({ error: "Cannot Fetch All profile" });
        }
    },

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // Profile -create Profile
    async createProfile(req, res) {

        try {
            console.log("createProfile ")
            const Profile = await helper.validate(req.body);

            // create database
            const userId = req.user._id
            const { insertedId: _id } = await helper.create({
                ...Profile,
                userId,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                active: true
            });

            res.status(201).send({ message: "Profile create successfully" });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // Put- update Profile
    async updateProfile(req, res) {

        try {
            // Data validation
            console.log("updateProfile ")
            const newProfile = await helper.validate(req.body);

            // Profile_ params id validation
            const oldProfile = await helper.findByIdActiveTrue(req.params.id);
            if (!oldProfile) return res.status(403).send({ error: "Profile user Invalid" });

            // Profile_ userId validation
            const userId = req.user._id
            if (oldProfile.userId !== userId) return res.status(403).send({ error: "User user Invalid" });

            // Profile_ active validation
            if (!oldProfile.active) return res.status(403).send({ error: "Profile user Invalid" });

            // update database
            const updatedData = await helper.update({
                _id: oldProfile._id,
                ...newProfile,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
            });

            res.status(202).send({ message: "Profile update successfully" });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    //Delete- delete Profile
    async deleteProfile(req, res) {
        try {

            // profile params id validation
            console.log("deleteProfile")
            const Profile = await helper.findByIdActiveTrue(req.params.id);
            if (!Profile) return res.status(403).send({ error: "Profile user Invalid" });

            // Delete userId validation
            const userId = req.user._id
            if (Profile.userId !== userId) return res.status(403).send({ error: "User Invalid" });

            // Delete active validation
            if (!Profile.active) return res.status(403).send({ error: "Profile user Invalid" });

            // Delete database
            const updatedData = await helper.update({
                _id: Profile._id,
                active: false,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
            });

            res.send({ message: "Profile delete successfully" });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
}


module.exports = service;