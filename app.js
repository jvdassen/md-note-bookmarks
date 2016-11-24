var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var bookmarks = require('./routes/bookmarks');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', 8080);
app.listen(app.get('port'));

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
  // Connection URL

var mongodburl = 'mongodb://localhost:27017/md-note-bookmark';

if (process.argv[2]){
	mongodburl = process.argv[2];	
  }
else {
	console.log("no mongodb url passed. using default settings");
	console.log("E.g: $ node app.js 'mongodb://localhost:3001/db'");
}

MongoClient.connect(mongodburl, function(err, db) {
   assert.equal(null, err);
   console.log("Connected successfully to server:");
   console.log(mongodburl);
   });

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/bookmarks', bookmarks);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



var insertDocuments = function(db, callback){
	var collection = db.collection('bookmarks');
	
	collection.insertMany([
	{url : 'http://tutorials.com', tags: ["tech", "tutorial"]}, {url : 'http://google.com'}, {url: 'http://nfl.com'}
	], function(err, result) {
		assert.equal(err, null);
	  	assert.equal(3, result.result.n);
		console.log("Inserted 3 documents into the collection");
        	});
	}

module.exports = app;
