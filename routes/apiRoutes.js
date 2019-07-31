var db = require("../models/index.js");


module.exports = function(app) {
    // Get all examples
    app.get("/api/users", function(req, res) {
        db.Users.findAll({}).then(function(dbExamples) {
            res.json(dbExamples);
        });
    });

    // Displaying chore + name
    app.get("/api/name", function(req, res) {
        db.Chore.findAll({}).then(function(dbDescriptions) {
            res.json(dbDescriptions);
        });
    });

    // Create a new chore + name
    app.post("/api/name", function(req, res) {
        console.log(req)
        db.Chore.create(req.body).then(function(dbExample) {
            res.json(dbExample);
        });
    });
    app.post("/api/chore", function(req, res) {
        db.Chore.create(req.body).then(function(dbExample) {
            res.json(dbExample);
        });
    });

    // Delete an example by id
    app.delete("/api/chores/:id", function(req, res) {
        db.Chore.destroy({ where: { id: req.params.id } }).then(function(
            dbExample
        ) {
            res.json(dbExample);
            console.log("deleted")
        });
    });
};