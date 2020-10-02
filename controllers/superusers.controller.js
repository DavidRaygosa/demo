'use strict'

var superuser = require('../models/superuser.model'); // Importa el modelo con mongoose

var controller_superuser =
{
	// New Document
	createDocument: (req, res) =>
	{
		var project = new superuser();
		project.name = "David";
		project.lastname = "Raygosa";
		project.email = "david_raygosa@hotmail.com";
		project.password = "12345";
		project.image = "Image";
		project.nickname = "DR";

		project.save((error,DocumentStored) => 
		{
			if(error) return res.status(500).send({message: "Error Al Guardar"});
			if(!DocumentStored) return res.status(404).send({message:'No Se Ha Podido Guardar El Documento'})
			return res.status(200).send({message:DocumentStored});
		});
	},

	getDocuments: (req, res) =>
	{
		superuser.find({/*[EJ: year:2019]*/}).exec((error,documents) =>
		{
			if(error) return res.status(500).send({message: "Error Al Devolver Los Datos"});
			if(documents.length==0) return res.status(200).send({message: "No Hay Proyectos Para Mostrar"});
			return res.status(200).send({documents});
		});
	}
}

module.exports = controller_superuser;