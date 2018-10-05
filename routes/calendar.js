var express = require('express');
var router = express.Router();
var intranet = require('intra-api');

var parseResult = function(result) {
  const planning = [];

  for (let i = 0 ; i < result.length ; i++) {
    if ((result[i].event_registered === "registered" || result[i].event_registered === "N/A") && result[i].past === false) {
        planning.push(result[i]);
      }
    }
  return planning;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  const autologinToken = req.cookies.autologin;
  const login = req.cookies.login;
  const Intra = new intranet(autologinToken, login);

  Intra
  .planning
  .get()
  .then((result) => {
    // Parse your planning
    const planning = parseResult(result);
    res.render('calendar', {title: 'Calendar', events: planning});
  })
  .catch((err) => {
    console.error(err);
  });
});

module.exports = router;
