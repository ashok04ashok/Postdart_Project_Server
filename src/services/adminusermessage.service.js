// Message Service

const helper = require("../helper/usermessage.helper");

const service = {

    // Get -get all Message
    async getAllMessage(req, res) {

        try {
            console.log("getAllMessage ")
            const data = await helper.findAll();

            res.status(202).send(data);
        } catch (error) {
            res.status(500).send({ error: "Cannot Fetch All Message" });
        }
    },
    // Get -active all Message
    async getAllMessageActiveTrue(req, res) {

        try {
            console.log("getAllMessageActiveTrue")
            const data = await helper.findActiveTrue();

            res.status(202).send(data);
        } catch (error) {
            res.status(500).send({ error: "Cannot Fetch All Message" });
        }
    },

    // Get -inacive all Message
    async getAllMessageActiveFalse(req, res) {

        try {
            console.log("getAllMessageActiveFalse")
            const data = await helper.findActiveFalse();

            res.status(202).send(data);;
        } catch (error) {
            res.status(500).send({ error: "Cannot Fetch All Message" });
        }
    },

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // Get -all active and inactive Id
    async getMessageById(req, res) {

        try {
            console.log("getMessageById ")
            const data = await helper.findById(req.params.id);

            res.status(202).send(data);
        } catch (error) {
            res.status(500).send({ error: "Cannot Fetch All Message" });
        }
    },


    // Get -active  Id
    async getMessageByIdActiceTrue(req, res) {

        try {
            console.log("getMessageByIdActiceTrue ")
            const data = await helper.findByIdActiveTrue(req.params.id);

            res.status(202).send(data);
        } catch (error) {
            res.status(500).send({ error: "Cannot Fetch All Message" });
        }
    },



    // Get -inactive Id
    async getMessageByIdActiceFalse(req, res) {

        try {
            // Find one Message 
            console.log("getMessageByIdActiceFalse ")
            const data = await helper.findByIdActiveFalse(req.params.id);

            res.status(202).send(data);
        } catch (error) {
            res.status(500).send({ error: "Cannot Fetch All Message" });
        }
    },

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
   
    // Message -create Message
    async createMessage(req, res) {

        try {
            // Data validation    
            console.log("createMessage")
            const message = await helper.validateAdmin(req.body);

            // userid_ params id validation
            const messageId = await helper.findAll(message.userId)
            if (!messageId) return res.status(403).send({ error: "Message user Invalid" });

            // create database
            const insertedId = await helper.create({
                ...message,
                _id: messageId._id,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                active: true
            });

            res.status(201).send({ message: "Message create successfully" });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // Put- update Message
    async updateMessage(req, res) {

        try {
            // Data validation
            console.log("updateUsers ")
            const Message = req.body

            // users_ params id validation
            const oldMessage = await helper.findById(Message._id);
            if (!oldMessage) return res.status(403).send({ error: "Message user Invalid" });

            // update database
            const updatedData = await helper.update({
                ...Message,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
            });

            res.status(202).send({ message: "Message update  successfully" });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // Put- message active  
    async MessageUpdateActiveTrue(req, res) {

        try {
            // Data validation
            console.log("MessageUpdateActiveTrue")
            const oldMessage = await helper.findById(req.params.id);
            if (!oldMessage) return res.status(403).send({ error: "Message user Invalid" });

          // update database
            const updatedData = await helper.update({
                _id: oldMessage._id,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                active: true
            });

            res.status(202).send({ message: "Message active  successfully" });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // Put- Message inactive 
    async MessageUpdateActiveFalse(req, res) {

        try {
            // Data validation
            console.log("MessageUpdateActiveFalse")
            const oldusers = await helper.findById(req.params.id);
            if (!oldusers) return res.status(403).send({ error: "Message user Invalid" });

            // update database
            const updatedData = await helper.update({
                _id: oldusers._id,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                active: false
            });
            res.status(202).send({ message: "Message inactive  successfully" });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },




    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


    //Delete- delete Message
    async deleteMessage(req, res) {
        try {

            console.log("deleteMessage")
            const Message = req.body

            // Message_ Message id validation
            const oldMessage = await helper.findByIdActiveFalse(Message._id);
            if (!oldMessage) return res.status(403).send({ error: "Message user Invalid" });

            // Delete database
            console.log(oldMessage)
            const deleteMessage = await helper.deleteById(oldMessage._id);

            res.status(202).send({ message: "Message delete  successfully" });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },
}


module.exports = service;