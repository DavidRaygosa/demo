'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema(
{
	title: String,
	subtitle: String,
	message: String,
    transmition: String,
	comments: 
	[{
		id_user: String,
    	comment: String,
		message_date: String
    }],
    publishedby: String,
    publication_image: String,
    publication_date: String,
    images:
    {
    	image: String
    }
});

module.exports = mongoose.model('posts', ProjectSchema);

// projects --> guarda los documentos en la coleccion	