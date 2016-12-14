var express = require('express');
var main = require('../app');
var router = express.Router();
var mongoose = require('mongoose');

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
  // Create your schemas and models here.
});

mongoose.connect('mongodb://localhost:3001/bookmarks');

var bookmarkSchema = new mongoose.Schema({
  url: String
, title: String
, description: String
});

var Bookmark = mongoose.model('Bookmark', bookmarkSchema);


/* GET users listing. */
router.post('/', function(req, res, next) {

	if (req.body) {
		var bm = new Bookmark({
    url: req.body.url
    , title: req.body.title
    , description: req.body.description
  });

  bm.save(function(err, bm) {
    if (err) return console.error(err, '##@@#');
    console.dir(bm);
  });

		res.send(req.body);
	}
	else {
		res.send('sup');;
	}
});

router.get('/', function(req, res, next) {
  res.send('find your bookmarks here');
});


router.get('/add/', function(req, res, next) {
	if(req.query.url) {

	  res.render('bookmark',{ title: 'Add a Bookmark',
                            url: req.query.url
                            });

	}
	else{
		res.render('bookmark-manual', { title: 'Add a Bookmark' });
	}
});

module.exports = router;
