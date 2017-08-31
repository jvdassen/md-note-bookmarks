
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
      if (username == '' && password == '') {
          return done(null, {name: '', id: ''})
      }
      else if (username == '' && password == '') {
          return done(null, {name: '', id: ''})

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
    if (id === '') {
        return done(null, {name: '', id: ''});
    }
    else if (id === '3jl4ke462w5') {
         return done(null, {name: '', id: ''})
    }
    else {
        console.err('Error deserialicing user.')
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
