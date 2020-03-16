var express = require('express');
var router = express.Router();
var Program = require('../models/program');

router.get('/', (req, res, next) => {
  console.log(req.program);
  Program.find({}, (err, program) => {
    if (err) return next(err);
    res.json(program);
  });
});

router.get('/:_id', (req, res, next) => {
  console.log(req._id);
  Program.findOne({
    _id: req.params._id
  }, (err, program) => {
    if (err) return next(err);
    res.json(program);
  });
});

// router.post('/', (req, res, next) => {
//     // if(!req.user.)
//     // console.log(req.user);

//     let addProgram = new Program({
//         name: req.body.name,
//         fullname: req.body.fullname,
//         description: req.body.description
//     });
//     addProgram.save();
//     res.json(addProgram);
// });

// router.put('/', (req, res, next) => {
//     // console.log(req.body);
//     Program.findByIdAndUpdate(req.body._id,req.body,{new: true},
//         (err, todo) => {
//             if (err) return res.status(500).send(err);
//         }
//     );

//     let addProgram = new Program({
//         name: req.body.name,
//         fullname: req.body.fullname,
//         description: req.body.description
//     });
//     res.json(addProgram);

// });

module.exports = router;