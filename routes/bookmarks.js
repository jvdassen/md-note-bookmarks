var express = require('express');
var main = require('../app');
var router = express.Router();
var mongoose = require('mongoose');
var favicon = require('favicon');
mongodburl = 'mongodb://localhost:3001/bookmarks';

mongoose.connect(mongodburl);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var bookmarkSchema = mongoose.Schema({
  url: String
, title: String
, description: String
, favicon: String
, id: String
});
var Bookmark = mongoose.model('Bookmark', bookmarkSchema);
Bookmark.find(function(err, bookmarks){
  if (err) return console.error(err);
});

/* GET users listing. */
router.post('/', function(req, res, next) {
  var favicon_url;
  favicon(req.body.url, function(err, favicon){
    if (req.body) {
  		var bm = new Bookmark({
      url: req.body.url
      , title: req.body.title
      , description: req.body.description
      , favicon: favicon
    });

    bm.save(function(err, bm) {
      if (err) return console.error(err, '##@@#');
      //console.dir(bm);
    });

  		res.send(req.body);
  	}
  	else {
  		res.send('sup');
  	}

  });

});

router.get('/', function(req, res, next) {
  Bookmark.find({}, function(err, bookmarks){
      res.render('index',{
      bookmarks : bookmarks
    });
  });
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

router.get('/:id', function(req, res, next) {
  Bookmark.findById(req.params.id, function(err, bookmarks){
      res.render('bookmark-id',{
      bookmark : bookmarks
    });
  });
});

router.delete('/:id', function(req, res, next) {
  Bookmark.remove({_id: req.params.id}, function(err, bookmarks){
      if (err) {
          res.send('error deleting: ' + req.params.id)
      }
      res.send('deleted: ' + req.params.id);
  });
});

module.exports = router;
