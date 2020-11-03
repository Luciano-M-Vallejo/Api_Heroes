'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate-v2');

var ProjectSchema = Schema({
    alias: String,
    name: String,
    description: String,
    skills: String,
    image: String
});

ProjectSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Heros', ProjectSchema);
