var express = require('express');
var router = express.Router();
var Event = require('../models/event');
var User = require('../models/user');

// router.get('/', (req, res, next) => {
//   console.log(req.user);
//   Event.find({}, (err, events) => {
//     if (err) return next(err);
//     res.json(events);
//   });
// });

router.post('/', async function(req, res, next) {
   
    let organizerId = req.body.organizer;
    let organizerUser = await User.findById(organizerId);
    
    let addEvent = new Event({
        start: req.body.start,
        end: req.body.end,
        attendees: req.body.attendees,
        tags: req.body.tags,
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        organizer: req.body.organizer,
        admin: req.body.admin,
        approved: (organizerUser.type === 'ADMIN' || organizerUser.eventOrganizer) ? req.body.approved : false
    });
    addEvent = await addEvent.save();
    res.json(addEvent);

});

router.get('/:_id', async function(req, res, next) {

    let user = await User.findOne({username: req.user.username});
    console.log(user.type);
    if (user.type == 'ADMIN') {
        Event.findOne({
            _id: req.params._id
          }, (err, events) => {
            if (err) return next(err);
            res.json(events);
          });
    }
    else {
        res.json("Not ADMIN");
    }
});

router.put('/:_id', async function(req, res, next) {
    let user = await User.findOne({username: req.user.username});
    console.log(user.type);
    if (user.type == 'ADMIN') {
        let event = await Event.findOne(
            {_id: req.params._id},
            function(err, event){
              event.approved = !event.approved;
              event.save();
            }
          );
          res.json(event);
    }
    else {
        res.json("Not ADMIN");
    }
  });

router.get('/:_id/attendees', async function(req, res, next) {
    let user = await User.findOne({username: req.user.username});
    console.log(user.type);
    if (user.type == 'ADMIN') {
        let event = await Event.find({_id: req.params._id},{attendees: true}).populate('attendees');
        res.json(event);
    }
    else {
        res.json("Not ADMIN");
    }
});

router.put('/:_id/attendees', async function(req, res, next) {

    let user = await User.findOne({username: req.user.username});
    console.log(user.type);
    if (user.type == 'ADMIN') {
        let user = await User.findById({_id: req.body._id});

        await Event.update(
            {_id: req.params._id},
            {$push: {attendees: user}},
            (err, todo) => {
                if (err) return res.status(500).send(err);
            }
        );

        let event = await Event.find({_id: req.params._id},{attendees: true}).populate('attendees');
        res.json(event);
    }
    else {
        res.json("Not ADMIN");
    }
});

module.exports = router;