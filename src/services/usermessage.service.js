// Message Service

const helper = require("../helper/usermessage.helper");


const service = {

    // Get -get all Message
    async getAllMessage(req, res) {

        try {
            console.log("getAllMessage ")
            const data = await helper.findActiveTrue();

            res.status(202).send(data);
        } catch (error) {
            res.status(500).send({ error: "Cannot Fetch All Message" });
        }
    },
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // Get -all Message get by Id
    async getMessageById(req, res) {

        try {
            console.log("getMessageById")
            const data = await helper.findByIdActiveTrue(req.params.id);

            res.status(202).send(data);
        } catch (error) {
            res.status(500).send({ error: "Cannot Fetch All Message" });
        }
    },
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // Message -create Message
    async createMessage(req, res) {

        try {
            // Data validation    
            console.log("createMessage ")
            const message = await helper.validate(req.body);

            // create database
            const userId = req.user._id
            const { insertedId: _id } = await helper.create({
                ...message,
                userId,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                active: true
            });

            res.status(201).send({ message: "Message create successfully" });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // Put- update Message
    async updateMessage(req, res) {

        try {
            // Data validation
            console.log("updateMessage ")
            const newMessage = await helper.validate(req.body);

            // Message_ params id validation
            const oldMessage = await helper.findByIdActiveTrue(req.params.id);
            if (!oldMessage) return res.status(403).send({ error: "Message user Invalid" });

            // Message_ userId validation
            const userId = req.user._id
            if (oldMessage.userId !== userId) return res.status(403).send({ error: "User Invalid" });

            // Message_ active validation
            if (!oldMessage.active) return res.status(403).send({ error: "Message user Invalid" });

            // update database
            const updatedData = await helper.update({
                _id: oldMessage._id,
                ...newMessage,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
            });

            res.status(202).send({ message: "Message update successfully" });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    //Delete- delete Message
    async deleteMessage(req, res) {
        try {

            // Message params id validation
            console.log("deleteMessage")
            const Message = await helper.findByIdActiveTrue(req.params.id);
            if (!Message) return res.status(403).send({ error: "Message user Invalid" });

            // Delete userId validation
            const userId = req.user._id
            if (Message.userId !== userId) return res.status(403).send({ error: "User Invalid" });

            // Delete active validation
            if (!Message.active) return res.status(403).send({ error: "Message user Invalid" });

            // Delete database
            const updatedData = await helper.update({
                _id: Message._id,
                active: false,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
            });

            res.status(202).send({ message: "Message delete successfully" });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
}


module.exports = service;