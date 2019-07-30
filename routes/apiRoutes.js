var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/users", function(req, res) {
    db.Users.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  app.get("/api/descriptions", function(req, res) {
    db.descriptions.findAll({}).then(function(dbDescriptions) {
      res.json(dbDescriptions);
    });
  });

  // Create a new example
  app.post("/api/users", function(req, res) {
    console.log(request)
    db.Users.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });
  app.post("/api/chores", function(req, res) {
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
