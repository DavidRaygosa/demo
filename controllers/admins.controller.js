'use strict'

var user = require('../models/user.model'); // Importa el modelo con mongoose

var controller_admins =
{
	// New Document
	createDocument: (req, res) =>
	{
		var project = new post();
		var comments = 
		{
			id_user: "ID USER 6",
			comment: "Novedad",
			message_date: "25/09/2020 6"
		}
		project.title = "Novedad 4:35pm";
		project.subtitle = "Novedad";
		project.message = "Novedad";
		project.comments = comments;
		project.publication_image = "Novedad";
		project.publication_date = "24/09/2020 Nuevo";
		project.createdBy = "DR";

		project.save((error,DocumentStored) => 
		{
			if(error) return res.status(500).send({message: "Error Al Guardar"});
			if(!DocumentStored) return res.status(404).send({message:'No Se Ha Podido Guardar El Documento'})
			return res.status(200).send({message:DocumentStored});
		});
	},

	getDocuments: (req, res) =>
	{
		user.find({/*[EJ: year:2019]*/}).exec((error,documents) =>
		{
			if(error) return res.status(500).send({message: "Error Al Devolver Los Datos"});
			if(documents.length==0) return res.status(200).send({message: "No Hay Proyectos Para Mostrar"});
			return res.status(200).send({documents});
		});
	},

	getDocumentsRange: (req, res) =>
	{
		let skip = parseInt(req.params.skip);
		user.find({usertype:'admin'/*[EJ: year:2019]*/}).skip(skip).limit(5).sort({'_id': -1}).exec((error,documents) =>
		{
			if(error) return res.status(500).send({message: "Error Al Devolver Los Datos"});
			if(documents.length==0) return res.status(200).send({message: "No Hay Proyectos Para Mostrar"});
			return res.status(200).send({documents});
		});
	},

	getDocument: (req, res) =>
	{
		var projectID = req.params.id;
		if(projectID == null) return res.status(404).send({message:'El Proyecto No Existe'});
		user.findById(projectID, (error, document) =>
		{
			if(error) return res.status(500).send({message: "Error Al Devolver Los Datos"});
			if(document.length==0) return res.status(200).send({message: "No Hay Proyectos Para Mostrar"});
			return res.status(200).send({document});
		});
	}
}

module.exports = controller_admins;