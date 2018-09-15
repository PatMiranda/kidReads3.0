var db = require("../models");
var AWS = require("aws-sdk");
var pollyKey = require("../keys");

module.exports = function(app) {

  // Get book setup
  app.get("/api/booksetup/:ISBN", function(req, res) {
    db.LibraryBooks_Setup.findAll({ where: { ISBN : req.params.ISBN }}).then(function(results) {
      res.json(results);
    });
  });

  // Get book list
  app.get("/api/getchildbooks/:childId", function(req, res) {
    db.ChildBooks.findAll({ where: { ChildId : req.params.childId }}).then(function(results) {
      res.json(results);
    });
  });

  app.get("/api/getthebook/:ISBN", function(req, res) {
    db.LibraryBooks.findOne({ where: { ISBN : req.params.ISBN }}).then(function(results) {
      res.json(results);
    });
  });

  app.post("/api/createchild/:parentId", function(req, res) {
    db.ChildUsers.create({
      ParentId: req.params.parentId,
      FirstName: req.body.name,
      Birthday: req.body.bday,
      FavoriteAnimal: req.body.favAnimal,
      SiteTheme: req.body.theme
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  app.post("/api/purchasebook/:id/:isbn", function(req, res) {
    db.ParentBooks.create({
      ParentId: req.params.id,
      ISBN: req.params.isbn
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  app.get("/api/getparentid/:email", function(req, res) {

    db.user.findOne({ where: { email : req.params.email }}).then(function(results) {
      res.json(results);
    });
  });

  app.get("/api/getchildid/:parentId", function(req, res) {
    db.ChildUsers.findOne({ where: { ParentId : req.params.parentId }}).then(function(results) {
      res.json(results);
    });
  });

  app.get("/api/callpolly/:word", function(req, res) {

    AWS.config.region = Object(pollyKey.polly.region).toString();
    AWS.config.accessKeyId = Object(pollyKey.polly.accessKeyId).toString();
    AWS.config.secretAccessKey = Object(pollyKey.polly.secretAccessKey).toString();

    var polly = new AWS.Polly({
      apiVersion: "2016-06-10"
    });

    var params = {
      OutputFormat: 'mp3',
      Text: req.params.word,
      VoiceId: Object(pollyKey.polly.voiceId).toString(),
      SampleRate: '22050',
      TextType: 'text'
    };    

    polly.synthesizeSpeech(params, (err, data) => {
      if (err) {
          console.log('ERROR!')
          console.log(err.code)
      } else if (data) {
          if (data.AudioStream instanceof Buffer) {
            res.send(data.AudioStream.toString("base64"))
          }
      }
    });
  });
};