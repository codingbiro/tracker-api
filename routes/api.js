const express = require('express');
const router = express.Router();
const config = require('config');

const Url = require('../models/Stat');

// @route     POST /api/url/shorten
// @desc      Create short URL
router.post('/shorten', async (req, res) => {
  var { longUrl } = req.body;
  var customShortUrl;
  var filtered = "true";
  if (req.query.custom) {
    customShortUrl = req.query.custom;
    filtered = req.query.filter;
  } else{
    customShortUrl = null;}


  const baseUrl = config.get('baseUrl');

  // Check base url
  if (!validator.isURL(baseUrl)) {
    return res.status(401).json('Invalid base url');
  }

  // Create url code
  var urlCode;
  if (customShortUrl == null)
    urlCode = generate(furl, 5);
  else
    urlCode = customShortUrl;

  var myStr = "http://";

  if (longUrl.substring(0, 4) === "http");
  else {
    myStr += longUrl;
    longUrl = myStr;
  }

  var shortUrl;

  // Check long url
  if (validator.isURL(longUrl)) {
    try {
      let customNeed = await Url.findOne({ urlCode });
      if (customNeed) {
        res.status(401).json('Short URL already taken.');
      }
      else {
        var url;
        if(filtered==="true") {
          url = await Url.findOne({ longUrl });
        }
        else {
          url=null;
        }
        if(url) {
          res.status(205).json(url);
        } else {
          shortUrl = baseUrl + '/' + urlCode;

          url = new Url({
            longUrl,
            shortUrl,
            urlCode,
            date: new Date()
          });

          await url.save();

          res.json(url);
        }
      }
    } catch (err) {
      res.status(500).json('Server error');
    }
  } else {
    res.status(401).json('Invalid long url');
  }
});

module.exports = router;
