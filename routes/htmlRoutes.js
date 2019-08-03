var db = require("../models");

module.exports = function(app) {
    // Load index page
    app.get("/", function(req, res) {
        db.Names.findAll({}).then(function(dbExamples) {
            res.render("index", {
                // msg: "Welcome!",
                examples: dbExamples,
            });
        });

        // Load index page
        app.get("/", function(req, res) {
            db.Chore.findAll({}).then(function(dbExamples) {
                res.render("index", {
                    // msg: "Welcome!",
                    examples: dbExamples,
                });
            });
        });

        app.get("/faq", function(req, res) {
            res.render("faq");
        });

        app.get("/createchore", function(req, res) {
            res.render("createChore");
        });

        // Load example page and pass in an example by id
        app.get("/chores/:id", function(req, res) {
            db.Name.findOne({ where: { id: req.params.id } }).then(function(
                dbExample
            ) {
                res.render("example", {
                    example: dbExample,
                });
            });
        });

        // Load example page and pass in an example by id
        app.get("/chores/:id", function(req, res) {
            db.Chore.findOne({ where: { id: req.params.id } }).then(function(
                dbExample
            ) {
                res.render("example", {
                    example: dbExample,
                });
            });
        });

        // Render 404 page for any unmatched routes
        app.get("*", function(req, res) {
            res.render("404");
        });
    });
};