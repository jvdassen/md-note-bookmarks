
var express = require('express');
var main = require('../app');
var router = express.Router();
var mongoose = require('mongoose');
var favicon = require('favicon');
var async = require('async');
var mainapp = require('../app');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


// mongodburl = 'mongodb://' + 'localhost' + ':' + '27017' + '/bookmarks';
//
// mongoose.connect(mongodburl);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var userSchema = mongoose.Schema({
  password: String
, userName: String
, name: String
});

userSchema.methods.verifyPassword = function(pw) {
  if (this.password === pw) {
    return true;
  }
  else {
    return false;
  }
}

var User = mongoose.model('User', userSchema);

User.find(function(err, bookmarks){
  if (err) return console.error(err);
});

// var admin = new User({password: 'gg', userName: 'jan', name: 'jann'});
//
// admin.save(function(err, admin){
//   if (err) {
//     return console.err(err)
//   }
//   console.log('saved: ', admin)
// });

passport.use(new LocalStrategy(
  function(username, password, done) {
      // if (username == 'jan' && password == 'gg') {
      //     return done(null, {name: '', id: '123'})
      // }
      // else if (username == 'dd' && password == 'mmmo') {
      //     return done(null, {name: '', id: '345'})
      //
      // }
      // else {
      //     return done(null, false, {message: 'Incorrect credentials.'})
      // }s
    User.findOne({ userName: username }, function (err, user) {
      console.log('authenticating: ', user)
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
  // Yes, it's a valid ObjectId, proceed with `findById` call.

    User.findById(id, function(err, user) {
      done(err, user);
    });
  }
});

/* GET users listing. */
router.post('/',

    passport.authenticate('local', { successRedirect: '/bookmarks',
                                     failureRedirect: '/login',
                                 }),

    function(req, res, next) {
res.redirect('/bookmarks');

});

router.get('/', function(req, res, next) {
    res.render('login-form');
});


module.exports = router;
