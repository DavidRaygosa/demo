
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema(
{
	name: String,
	lastname: String,
	email: String,
	password: String,
	image: String,
	nickname: String
});

module.exports = mongoose.model('superusers', ProjectSchema);

// projects --> guarda los documentos en la coleccion	