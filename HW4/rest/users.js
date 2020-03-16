var express = require('express');
var router = express.Router();
var User = require('../models/user');


router.get('/', (req, res, next) => {
  console.log(req.user);
  User.find({}, (err, users) => {
    if (err) return next(err);
    res.json(users);
  });
});

router.get('/:_id', (req, res, next) => {
  console.log(req.user);
  User.findOne({
    _id: req.params._id
  }, (err, user) => {
    if (err) return next(err);
    res.json(user);
  });
});

router.post('/', (req, res, next) => {
  // console.log(req.user);

  let user = new User({
    type: req.body.type,
    position: req.body.position,
    eventOrganizer: req.body.eventOrganizer,
    rewardProvider: req.body.rewardProvider,
    programs: req.body.programs,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  }); 
  user.save();
  res.json(user);

});

module.exports = router;