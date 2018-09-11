var db = require("../models");
var AWS = require("aws-sdk");

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

    AWS.config.region = process.env.POLLY_REGION;
    AWS.config.accessKeyId = process.env.POLLY_ACCESS_KEY_ID;
    AWS.config.secretAccessKey = process.env.POLLY_SECRET_ACCESS_KEY;

    var polly = new AWS.Polly({
      apiVersion: "2016-06-10"
    });

    var params = {
      OutputFormat: 'mp3',
      Text: req.params.word,
      VoiceId: process.env.POLLY_VOICE_ID,
      SampleRate: '22050',
      TextType: 'text'
    };

    // returnpolly.synthesizeSpeech(params).promise().then( audio => {
    //   if (audio.AudioStream instanceof Buffer) {
    //     console.log(audio);
    //     return audio }
    //   else
    //     throw 'AudioStream is not a Buffer.'
    // })

    polly.synthesizeSpeech(params).promise().then( function (err, data) {

        if (err)
          console.log(err, err.stack); // an error occurred
        else {
          console.log("got response")
          console.log(data);
          res.json(data);
        }
        var test = json(data);
        console.log(test.AudioStream)
        var buf = (data.AudioStream).toString('base64');
        var snd = new Audio("data:audio/mp3;base64," + buf);
        snd.play();
    });
  });
};