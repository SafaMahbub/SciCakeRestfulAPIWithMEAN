var express = require('express');
var router = express.Router();
var Program = require('../models/program');
var User = require('../models/user');

router.post('/', async function(req, res, next) {

    let user = await User.findOne({username: req.user.username});
    console.log(user.type);
    if (user.type == 'ADMIN') {
        let addProgram = new Program({
            name: req.body.name,
            fullname: req.body.fullname,
            description: req.body.description
        });
        addProgram.save();
        res.json(addProgram);
    }
    else {
        res.json("Not ADMIN");
    }

});

router.put('/', async function(req, res, next) {

    let user = await User.findOne({username: req.user.username});
    console.log(user.type);
    if (user.type == 'ADMIN') {
        Program.findByIdAndUpdate(req.body._id,req.body,{new: true},
            (err, todo) => {
                if (err) return res.status(500).send(err);
            }
        );

        let addProgram = new Program({
            name: req.body.name,
            fullname: req.body.fullname,
            description: req.body.description
        });
        res.json(addProgram);        
    }
    else {
        res.json("Not ADMIN");
    }
});

module.exports = router;