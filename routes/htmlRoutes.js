const path = require("path");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/about-us", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/about-us.html"));
  });

  app.get("/tutor", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/tutor.html"));
  });

  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });

  app.get("/match", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/match.html"));
  });

  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/passwordreset", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/password-reset.html"));
  });

  app.get("/listAll", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/listAll.html"));
  });

};