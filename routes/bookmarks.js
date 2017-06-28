var express = require('express');
var main = require('../app');
var router = express.Router();
var mongoose = require('mongoose');
var favicon = require('favicon');
var fs = require('fs');
var async = require('async')
var webshot = require('webshot');
var mainapp = require('../app')

mongodburl = 'mongodb://' + process.env.MONGODB_PORT_27017_TCP_ADDR + ':' + process.env.MONGODB_PORT_27017_TCP_PORT + '/bookmarks';

const snapshotoptions = {
  windowSize: {
    width: 615,
    height: 435
  }
};

mongoose.connect(mongodburl);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var bookmarkSchema = mongoose.Schema({
  url: String
, title: String
, description: String
, favicon: String
, tags: [String]
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
      , tags: req.body.tags
      , favicon: favicon
    });
    console.log(req.body.tags);

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

router.get('/tags', function(req, res, next){
  var alltags = Bookmark.distinct('tags', function(err, tags) {
    var countedtags = {};

    async.each(tags, function(tag, cb){
        Bookmark.count({'tags': tag}, function(err, count){
          countedtags[tag] = count;
          cb();
        });
      },
      function(error){
        if (error) {
          throw error;
        }
        res.json(countedtags);
      });
  });
});

router.get('/:id', function(req, res, next) {
  Bookmark.findById(req.params.id, function(err, bm){
    res.render('bookmark-id',{
      bookmark : bm
    });
  });
});

router.get('/snapshot/:id', function(req, res, next) {
  Bookmark.findById(req.params.id, function(err, bookmark){
    "use strict";
    let url = bookmark.url;

    if (!fs.existsSync('public/snapshots/' + req.params.id + '.png')) {

      console.log('creating snapshot...');
      webshot(url, 'public/snapshots/' + req.params.id + '.png', snapshotoptions, function(err){
        console.log(err);
        res.redirect('/' +'snapshots/' + req.params.id + '.png');
      });
    }
    else {
      console.log('snapshot found')
      res.redirect('/' +'snapshots/' + req.params.id + '.png');
    }
  });
});

router.delete('/:id', function(req, res, next) {
  Bookmark.remove({_id: req.params.id}, function(err, bookmarks){
    if (err) {
      res.send('error deleting: ' + req.params.id)
    }
    else {
      res.send('deleted: ' + req.params.id);
    }
  });
});

module.exports = router;
