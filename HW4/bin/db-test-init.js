const mongoose = require('mongoose');
const User = require('../models/user');
const Event = require('../models/event');
const Program = require('../models/program');
const Tag = require('../models/tag');

async function run() {
    await mongoose.connect('mongodb://localhost/Exercise5');
  
    /** //+++++++++++++++++++++++++++Delete existing data (if any) +++++++++++++++++++++++++++ */
    await Tag.deleteMany({});
    await Program.deleteMany({});
    await User.deleteMany({});
    await Event.deleteMany({});

    //+++++++++++++++++++++++++++ CREATE TEST TAGS +++++++++++++++++++++++++++
    let tag1 = new Tag({
        keyword: 'fun'
    });
    tag1 = await tag1.save();
    let tag2 = new Tag({
        keyword: 'boring'
    });
    tag2 = await tag2.save();
    
    console.log('************ ALL Tags ************');
    let tags = await Tag.find();
    tags.forEach(tag => console.log(tag));


    /* +++++++++++++++++++++++++++ CREATE TEST PROGRAMS +++++++++++++++++++++++++++ */
    let program1 = new Program({
        _id: mongoose.Types.ObjectId('5bff2cac7af7029baa8a45e8'),
        name: 'ECST',
        fullname: 'Engineering, Computer Sciecne, and Technology',
        description: 'CS college'
    });
    program1 = await program1.save();

    let program2 = new Program({
        _id: mongoose.Types.ObjectId('5bff2cac7af7029baa8a45e9'),
        name: 'CSULA',
        fullname: 'California State University, Los Angeles',
        description: 'The University we attend'
    });
    program2 = await program2.save();

    let program3 = new Program({
        _id: mongoose.Types.ObjectId('5bff2cac7af7029baa8a45ea'),
        name: 'MACUSA',
        fullname: 'The Magical Congress of the United States of America',
        description: 'The Wizarding Government of the USA'
    });
    program3 = await program3.save();

    console.log('************ ALL PROGRAMS ************');
    let programs = await Program.find();
    programs.forEach(program => console.log(program));


    /* +++++++++++++++++++++++++++ CREATE TEST USER +++++++++++++++++++++++++++ */
    let user1 = new User({
        _id: mongoose.Types.ObjectId('5bff2cac7af7029baa8a45eb'),
        type: 'ADMIN',
        position: 'FACULTY',
        firstname: 'Safa',
        lastname: 'Mahbub',
        username: 'smahbub3',
        password: 'abcd',
        email: 'smahbub3@csula.edu',
        eventOrganizer: true,
        rewardProvider: true,
        programs: [program1, program2]
    });
    user1 = await user1.save();

    let user2 = new User({
        _id: mongoose.Types.ObjectId('5bff2cac7af7029baa8a45ec'),
        type: 'ADMIN',
        position: 'STAFF',
        firstname: 'Saba',
        lastname: 'Mahbub',
        username: 'smahbub2',
        password: 'abcd',
        email: 'smahbub2@csula.edu',
        eventOrganizer: true,
        rewardProvider: true,
        programs: [program1, program2]
    });
    user2 = await user2.save();

    let user3 = new User({
        _id: mongoose.Types.ObjectId('5bff2cac7af7029baa8a45ed'),
        firstname: 'Crystal',
        lastname: 'Lagmay',
        username: 'clagmay',
        password: 'abcd',
        email: 'clagmay@csula.edu'
    });
    user3 = await user3.save();

    console.log('************ ALL USERS ************');
    let users = await User.find().populate(['programs']);;
    users.forEach(user => console.log(user));

    /* +++++++++++++++++++++++++++ CREATE TEST EVENTS +++++++++++++++++++++++++++ */

    let event1 = new Event({
        _id: mongoose.Types.ObjectId('5bff2cac7af7029baa8a45ee'),
        name: 'Welcome Week',
        description: 'Booths and Fun',
        location: 'ECST Building',
        organizer: user1,
        admin: user1,
        approved: true,
        attendees: [user1, user3],
        tags: [tag2]
    });
    event1 = await event1.save();

    let event2 = new Event({
        _id: mongoose.Types.ObjectId('5bff2cac7af7029baa8a45ef'),
        name: 'Welcome Week2',
        description: 'Nothing',
        location: 'TBD',
        organizer: user3,
        tags: [tag2]
    });
    event2 = await event2.save();
  
    console.log('************ ALL EVENTS ************');
    let events = await Event.find().populate(['attendees', 'organizer']);
    events.forEach(event => console.log(event));

    

    // /** Delete existing user and event data (if any) */
    // await Tag.deleteMany({});
    // await Program.deleteMany({});
    // await User.deleteMany({});
    // await Event.deleteMany({});

    /** Disconnect from the database */
    await mongoose.disconnect();
  }
  
  run();