var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {login: req.cookies.login, autologin: req.cookies.autologin});
});

/* POST save user info */
router.post('/userinfo', function(req, res, next) {
    res.cookie('login', req.body.login);
    res.cookie('autologin', req.body.autologin);
    res.redirect('/');
});

module.exports = router;
