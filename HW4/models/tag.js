'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let tagSchema = new Schema({
    keyword: String
});

module.exports = mongoose.model('Tag', tagSchema);