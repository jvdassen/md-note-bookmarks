
var express = require('express');
var main = require('../app');
var router = express.Router();
var mongoose = require('mongoose');
var favicon = require('favicon');
var async = require('async');
var mainapp = require('../app');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
      if (username == 'jan' && password == 'gg') {
          return done(null, {name: '', id: '123'})
      }
      else if (username == 'dd' && password == 'mmmo') {
          return done(null, {name: '', id: '345'})

      }
      else {
          return done(null, false, {message: 'Incorrect credentials.'})
      }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    if (id === '123') {
        return done(null, {name: 'jan', id: '123'});
    }
    else if (id === '345') {
         return done(null, {name: 'mart', id: '345'})
    }
    else {
        console.error('Error deserialicing user.')
    }

});

/* GET users listing. */
router.post('/',

    passport.authenticate('local', { successRedirect: '/bookmarks',
                                     failureRedirect: '/login',
                                 }),

    function(req, res, next) {


});

router.get('/', function(req, res, next) {
    res.render('login-form');
});


module.exports = router;
