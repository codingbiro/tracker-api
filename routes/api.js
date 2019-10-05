const express = require('express');
const router = express.Router();
const config = require('config');

const Url = require('../models/Stat');

var request = require('request');

router.get("/:code", (req,res) => {
  var code = req.params.code;
  var options = {
    url: `https://public-api.tracker.gg/v2/csgo/standard/profile/steam/${code}`,
    headers: {
      'TRN-Api-Key': 'f9f6c99b-acb4-4017-a1d3-afef1d035ebc'
    }
  };
   
  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      //console.log(info);
      res.json(info);
    }
  }  
 
  request(options, callback);

  
  
});


module.exports = router;
