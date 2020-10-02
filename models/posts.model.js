'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema(
{
	title: String,
	subtitle: String,
	message: String,
	comments: 
	[{
		id_user: String,
    	comment: String,
		message_date: String
    }],
    publication_image: String,
    publication_date: String,
    createdBy: String
});

module.exports = mongoose.model('posts', ProjectSchema);

// projects --> guarda los documentos en la coleccion	