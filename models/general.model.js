'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema(
{
	lenght:Number,
	adminslenght: Number,
	userslenght: Number
});

module.exports = mongoose.model('general', ProjectSchema);