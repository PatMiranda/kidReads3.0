var db = require("../models");
var AWS = require("aws-sdk");
var pollyKey = require("../keys");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Get book setup
  app.get("/api/booksetup", function(req, res) {
    db.LibraryBooks_Setup.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
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