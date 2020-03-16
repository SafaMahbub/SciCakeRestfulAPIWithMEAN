'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let eventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        default: new Date()
    },
    end: {
        type: Date,
        default: new Date()
    },
    organizer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    approved: {type: Boolean, default: false},
    attendees: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }]
});

module.exports = mongoose.model('Event', eventSchema);