var express = require('express');
var router = express.Router();
const User = require('../models/user');

const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

router.post('/', (req, res, next) => {
    console.log(req.body);
  User.findOne(
    {
        username: req.body.username,
        password: req.body.password
    }, 
  (err, user) => {
    if (err) return next(err);
    console.log(user);
    res.json({
      token: jwt.sign({
        username: user.username
      }, jwtSecret)
    });
  });
});

module.exports = router;