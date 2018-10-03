var db = require("../models");

module.exports = function(app) {
// GET route for getting all of the students or tutors
app.get("/api/users/", function(req, res) {
    db.users.findAll({
    }).then(function(dbPost) {
        res.json(dbPost);
    });
});

// Get route for retrieving a single user by id
app.get("/api/users/:id", function(req, res) {
    db.users.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(dbPost) {
        res.json(dbPost);
    });
});

// Get route for retrieving a single student
app.get("/api/student/login_id/:login_id", function(req, res) {
    db.users.findOne({
        where: {
            login_id: req.params.login_id
        }
    }).then(function(dbPost) {
        res.json(dbPost);
    });
});

app.get("/api/students/:is_student", function(req, res) {
    db.users.findAll({
        where: {
            is_student: req.params.is_student
        }
    }).then(function(dbPost) {
        res.json(dbPost);
    });
});

app.get("/login/:login_id", function(req, res) {
    db.users.findAll({
        where: {
            login_id: req.params.login_id
        }
    }).then(function(dbPost) {
        res.json(dbPost);
    });
});

// POST route for saving a new student
  app.post("/api/student", function(req, res) {
      console.log(req.body);
    db.users.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });

// POST route for saving a new tutor
app.post("/api/tutor", function(req, res) {
    console.log(req.body);
  db.users.create(req.body).then(function(dbPost) {
    res.json(dbPost);
  });
});
}