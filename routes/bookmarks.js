var express = require('express');
var main = require('../app');
var router = express.Router();
var mongoose = require('mongoose');
var favicon = require('favicon');
var fs = require('fs');
var async = require('async')
var webshot = require('webshot');
var mainapp = require('../app')

mongodburl= process.env.MONGODB_URI
console.log('connecting to MongoDB at: ', mongodburl)
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
, user: String
, tags: [String]
});
var Bookmark = mongoose.model('Bookmark', bookmarkSchema);
Bookmark.find(function(err, bookmarks){
  if (err) return console.error(err);
  console.log('initial bookmarks', bookmarks);
});

/* GET users listing. */
router.post('/', function(req, res, next) {
  var favicon_url;
  favicon(req.body.url, function(err, favicon){
    if (req.body && req.user) {
  		var bm = new Bookmark({
        url: req.body.url
        , title: req.body.title
        , description: req.body.description
        , tags: req.body.tags
        , favicon: favicon
        , user: req.user.id
      });
      console.log(req.body.tags);

      bm.save(function(err, bm) {
        if (err) return console.error(err);
        res.redirect('/bookmarks');

        if (!fs.existsSync('public/snapshots/' + bm.id + '.png')) {
          let url = bm.url;
          console.log('creating snapshot...');
          webshot(url, 'public/snapshots/' + bm.id + '.png', snapshotoptions, function(err){
            console.log(err);

          });
        }
        //console.dir(bm);
      });

  	}
  	else {
  		res.redirect('/bookmarks');
  	}

  });

});

router.get('/', function(req, res, next) {
  console.log('the user that is logged in:', req.user);
  if (req.user) {
      Bookmark.find({user:req.user.id}, function(err, bookmarks){
          res.render('index',{
          bookmarks : bookmarks
        });
      });
  }
  else {
      res.redirect('/login');
  }
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
  var alltags = Bookmark.find({user: req.user.id}).distinct('tags', function(err, tags) {
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
