'use strict'

var general = require('../models/general.model'); // Importa el modelo con mongoose

var controller_general =
{
	// New Document
	createDocument: (req, res) =>
	{
		var project = new general();
		project.lenght = 0;
		project.save((error,DocumentStored) => 
		{
			if(error) return res.status(500).send({message: "Error Al Guardar"});
			if(!DocumentStored) return res.status(404).send({message:'No Se Ha Podido Guardar El Documento'})
			return res.status(200).send({message:DocumentStored});
		});
	},

	// Get documents
	getDocuments: (req, res) =>
	{
		general.find({/*[EJ: year:2019]*/}).exec((error,documents) =>
		{
			if(error) return res.status(500).send({message: "Error Al Devolver Los Datos"});
			if(documents.length==0) return res.status(200).send({message: "No Hay Proyectos Para Mostrar"});
			return res.status(200).send({documents});
		});
	}
}

module.exports = controller_general;