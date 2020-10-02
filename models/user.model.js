'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema(
{
	name: String,
	lastname: String,
	email: String,
	password: String,
	image: String
});

module.exports = mongoose.model('users', ProjectSchema);

// projects --> guarda los documentos en la coleccion	