'use strict'

var user = require('../models/user.model'); // Importa el modelo con mongoose

var controller_user =
{
	// New Document
	registerUser: (req, res) =>
	{
		let project = new user();
		let params = req.body;
		project.name = params.name;
		project.lastname = params.lastname;
		project.email = params.email;
		project.password = params.password;
		project.image = params.image;
		project.usertype = params.usertype;
		project.nickname = params.nickname;
		
		project.save((error,DocumentStored) => 
		{
			if(error) return res.status(500).send({message: "Error Al Guardar"});
			if(!DocumentStored) return res.status(404).send({message:'No Se Ha Podido Guardar El Documento'})
			return res.status(200).send({message:DocumentStored});
		});
	},

	getDocument: (req, res) =>
	{
		let projectID = req.params.id;
		user.findById(projectID, (error, document) =>
		{
			if(error) return res.status(500).send({message: "Error Al Devolver Los Datos"});
			if(document.length==0) return res.status(200).send({message: "No Hay Proyectos Para Mostrar"});
			return res.status(200).send({document});
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
		user.find({usertype:'standard'/*[EJ: year:2019]*/}).skip(skip).limit(10).sort({'_id': -1}).exec((error,documents) =>
		{
			if(error) return res.status(500).send({message: "Error Al Devolver Los Datos"});
			if(documents.length==0) return res.status(200).send({message: "No Hay Proyectos Para Mostrar"});
			return res.status(200).send({documents});
		});
	},

	checkEmail: (req, res) =>
	{
		let email = req.params.email;
		user.find({email:email/*[EJ: year:2019]*/}).exec((error,documents) =>
		{
			if(error) return res.status(500).send({message: "Error Al Devolver Los Datos"});
			if(documents.length==0) return res.status(200).send({message: "No Hay Proyectos Para Mostrar"});
			return res.status(200).send({documents});
		});
	},

	checkNickname: (req, res) =>
	{
		let nickname = req.params.nickname;
		user.find({nickname:nickname/*[EJ: year:2019]*/}).exec((error,documents) =>
		{
			if(error) return res.status(500).send({message: "Error Al Devolver Los Datos"});
			if(documents.length==0) return res.status(200).send({message: "No Hay Proyectos Para Mostrar"});
			return res.status(200).send({documents});
		});
	},

	updateUser: (req, res) =>
	{
		let projectID = req.params.id;
		let update = req.body;
		user.findByIdAndUpdate(projectID, update, {new:true} ,(error, projectUpdated) =>
		{
			if(error) return res.status(500).send({message: 'Error Al Actualizar'});
			if(!projectUpdated) return res.status(404).send({message: 'No Existe El Proyecto'});
			return res.status(200).send({project: projectUpdated});
		});
	},

	deleteProject: (req, res) =>
	{
		let projectID = req.params.id;
		user.findByIdAndDelete(projectID, (error, projectDeleted) =>
		{
			if(error) return res.status(500).send({message: 'No Se Ha Podido Borrar El Proyecto'});
			if(!projectDeleted) return res.status(404).send({message: 'No Se Puede Eliminar Ese Proyecto'});
			return res.status(200).send({project: projectDeleted});
		});
	}
}

module.exports = controller_user;