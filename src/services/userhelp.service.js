// Help Service

const helper = require("../helper/userhelp.helper");


const service = {

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // Help -create Help
    async createHelp(req, res) {

        try {
            // Data validation    
            console.log("createHelp ")
            const help = await helper.validate(req.body);

            // create database
            const insertedId = await helper.create({
                ...help,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                status:"Under Process",
                active: true
            });

            res.status(201).send({ message: "Help create successfully" });
        } catch (error) {
            res.status(500).send({ error: error.Profile });
        }
    },
};


module.exports = service;