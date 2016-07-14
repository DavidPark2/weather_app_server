var express = require('express');
var controller = express.Router();
var User = require('../models/Users');
var Weather = require('../models/Weather');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);


// logout
// controller.get('/logout', function(req, res, next) {
//   // destroy session
//   req.session = null;
//   res.json({ 'message': 'You have been logged out.'});
// });

// create a account
controller.post('/signup', function(req, res, next){
  var userInfo = {
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt)
  };
  // Finding email in database
  User.find({ email: userInfo.email }, function(err, users) {
    // If email is found, then response if false
    if (users.length >= 1) {
      res.json({ 'success': false })
      // But if no email is found, then create user and respond with true and search history
    } else if (users.length === 0 ) {
      User.create(userInfo, function(err, users) {
        // req.session.email = userInfo.email;
        
        res.json({ 'success': true,
                  'searchHistory': false
         })
      });
    } else {
      res.json({'message': 'error'})
    }
  })
});

// Login
controller.post('/login', function(req, res, next) {
  // Look for email in database
  User.findOne({ email: req.body.email}, function(err, user) {
    // if user is found and password matches, respond with true and search history
    if (user) {
      var enteredPassword = req.body.password;
      var comparison = bcrypt.compareSync(enteredPassword, user.password);
      if (comparison === true) {
        Weather.find({ email: req.body.email }, function(err, data) {
          console.log(data);
          console.log('data^^^^^^^^^^')
          res.json({ 'success': true,
                      'searchHistory': data
          });
        })
      } else {
        res.json({ 'success': false });
      }
    } else {
        res.json({ 'success': false });
      }
  });
});

// -------------didn't use below, use for the future
// update
// controller.put('/update', function(req, res) {
//   var userInfo = {
//     username: req.body.username,
//     email: req.body.email,
//     password: bcrypt.hashSync(req.body.password, salt)
//   };
//   console.log(userInfo);
//   User.findOneAndUpdate({ email: req.session.email }, userInfo, function (err, users) {
//     if (err) console.log(err);
//     req.session.email = userInfo.email;
//     res.json({ 'message': 'Account has been updated' })
//   })
// })

// // DELETE
// controller.delete('/delete', function(req, res) {
//   User.findOneAndRemove({ email: req.session.email }, req.session, function(err, user) {
//     if (err) console.log(err);
//     res.json({ 'message': 'Account has been deleted' })
//   })
// })

module.exports = controller;
