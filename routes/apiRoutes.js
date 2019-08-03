var db = require("../models/index.js");

module.exports = function(app) {
    // Get all examples
    app.get("/api/users", function(req, res) {
        db.Users.findAll({}).then(function(dbExamples) {
            res.json(dbExamples);
        });
    });

    // Displays name
    app.get("/api/name", function(req, res) {
        db.Names.findAll({}).then(function(dbDescriptions) {
            res.json(dbDescriptions);
        });
    });

    // Displays chore
    app.get("/api/chore", function(req, res) {
        db.Chores.findAll({}).then(function(dbDescriptions) {
            res.json(dbDescriptions);
        });
    });

    // Create new name
    app.post("/api/name", function(req, res) {
        db.Names.create(req.body).then(function(dbExample) {
            res.json(dbExample);
        });
    });

    // Create new chore
    app.post("/api/chore", function(req, res) {
        db.Chores.create(req.body).then(function(dbExample) {
            res.json(dbExample);
        });
    });

    // Delete a chore by id
    app.delete("/api/chore/:id", function(req, res) {
        db.Chores.destroy({ where: { id: req.params.id } }).then(function(
            dbExample
        ) {
            res.json(dbExample);
            console.log("deleted");
        });
    });

};