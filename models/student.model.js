'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema(
{
	// PERSONAL DATA PANEL

	name:String,
	lastname: String,
	lastnamem:String,
	birthday:String,
	tel:String,
	teloffice:String,
	cellphone:String,
	avaible_from:String,
	avaible_to:String,
	email:String,

	// PERSONAL ADDRESS PANEL

	street:String,
	numberhouse:String,
	colonia:String,
	cp:String,
	municipio:String,
	state:String,

	// PERSONAL ADDRESS PANEL

	carreracursada:String,
	school:String,
	status:String,
	semestresconcluidos:String,
	speciality:String,
	secondcarrera:String,
	secondcarrera_specify:String,
	secondcarrera_school:String,
	secondcarrera_titulado:String
});

module.exports = mongoose.model('student', ProjectSchema);

// projects --> guarda los documentos en la coleccion	