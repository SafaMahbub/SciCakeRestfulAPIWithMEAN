'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    type: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    position: {
        type: String,
        enum: ['STUDENT', 'FACULTY', 'STAFF'],
        default: 'STUDENT'
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    eventOrganizer: {type: Boolean, default: false},
    rewardProvider: {type: Boolean, default: false},
    majorororganizationalunit: {type: String},
    title: {type: String},
    programs: [{
        type: Schema.Types.ObjectId,
        ref: 'Program'
    }]
});

module.exports = mongoose.model('User', userSchema);