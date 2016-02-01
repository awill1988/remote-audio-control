var express = require('express');
var router = express.Router();
var app = require ('../app')

/* GET index page. */
router.get('/', function(req, res, next) {
    res.render('index', {
      title: 'Sign-In',
      name: 'Initials',
    });
});


/* User has posted their credentials to the server */
router.post('/', function(req, res, next) {
	req.session.initials = req.body.initials ? req.body.initials : '--'
	req.session.seat = req.body.seat ? req.body.initials : '--'
	req.session.uci = req.body.uci;
	req.session.ucinet = req.body.ucinet ? req.body.ucinet : 'none';


  // Resolve the path to the angular application
  var templatePath = require.resolve('../app/index.jade');
  var templateFn = require('jade').compileFile(templatePath);

  // Render the index.jade file of the angular app
	res.write(templateFn({
  		title: 'We\'re now live!',
  		initials: req.session.initials,
  		location: req.session.seat,
  		uci: req.session.uci,
  		ucinet: req.session.ucinet,
      port: 51234
	}));
  
  res.end();
    
});

/* Define the different pieces here */
router.get('/event0', function(req, res, next) {
    res.render('event0', {
      message: 'Tutorial'
    });
});

router.get('/event1', function(req, res, next) {
    res.render('event1', {
      message: 'Delay'
    });
});

router.get('/event2', function(req, res, next) {
    res.render('event2', {
      message: 'Note Length'
    });
});

router.get('/event3', function(req, res, next) {
    res.render('event3', {
      message: 'Pitch'
    });
});

router.get('/event4', function(req, res, next) {
    res.render('event4', {
      message: 'Delay/Note Length/Pitch'
    });
});


router.get('/event5', function(req, res, next) {
    res.render('event5', {
      message: 'Tilt'
    });
});

router.get('/event6', function(req, res, next) {
    res.render('event6', {
      message: 'Spacialization/Volume'
    });
});

router.get('/event7', function(req, res, next) {
    res.render('event7', {
      message: 'Piece 5'
    });
});


module.exports = router;