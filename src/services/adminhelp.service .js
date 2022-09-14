// Help Service

const helper = require("../helper/userhelp.helper");


const service = {

    // Get -get all Help
    async getAllHelp(req, res) {

        try {
            console.log("getAllHelp ")
            const data = await helper.findAll();

            res.status(202).send(data);
        } catch (error) {
            res.status(500).send({ error: "Cannot Fetch All Help" });
        }
    },

 // Get -get all active Help
 async getAllHelpActiveTrue(req, res) {

    try {
        console.log("getAllHelp ")
        const data = await helper.findActiveTrue();

        res.status(202).send(data);
    } catch (error) {
        res.status(500).send({ error: "Cannot Fetch All Help" });
    }
},



 // Get -get all iavtive Help
 async getAllHelpActiveFalse(req, res) {

    try {
        console.log("getAllHelp ")
        const data = await helper.findActiveFalse();

        res.status(202).send(data);
    } catch (error) {
        res.status(500).send({ error: "Cannot Fetch All Help" });
    }
},



    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // Help -create Help
    async createHelp(req, res) {

        try {
            // Data validation    
            console.log("createHelp ")
            const Help = await helper.validate(req.body);

            // create database
            const insertedId = await helper.create({
                ...Help,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                active: true
            });

            res.status(201).send({ message: "Help create successfully" });
        } catch (error) {
            res.status(500).send({ error: error.Profile });
        }
    },

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // Put- update Help
    async updateHelp(req, res) {

        try {
            // Data validation
            console.log("updateHelp ")
            const help = req.body;
            // Help_ params id validation

            const oldHelp = await helper.findAll(help._id);
            if (!oldHelp) return res.status(403).send({ error: "Help user Invalid" });

            // update database
            const updatedData = await helper.update({
                _id: oldHelp._id,
                ...help,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
            });

            res.status(202).send({ message: "Help update successfully" });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    //Delete- delete Help
    async deleteHelp(req, res) {
        try {

            // Help params id validation
            console.log("deleteHelp")
            const help = req.body;
            
            const oldHelp = await helper.findActiveFalse(help);
            if (!oldHelp) return res.status(403).send({ error: "Help user Invalid" });
            // console.log(oldHelp.id)

            // Delete database
            const deleteData = await helper.deleteById(help._id);

            res.send({ message: "Help delete successfully" });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
}


module.exports = service;