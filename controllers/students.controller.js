'use strict'

var student = require('../models/student.model'); // Importa el modelo con mongoose

var controller_student = 
{
	// Save New Student
	saveStudent: (req, res) =>
	{
		var project = new student();
		var params = req.body;

		// PERSONAL DATA PANEL

		project.name = params.name;
		project.lastname = params.lastname;
		project.lastnamem = params.lastnamem;
		project.birthday = params.birthday;
		project.tel = params.tel;
		project.teloffice = params.teloffice;
		project.cellphone = params.cellphone;
		project.avaible_from = params.avaible_from;
		project.avaible_to = params.avaible_to;
		project.email = params.email;

		// PERSONAL ADDRESS PANEL

		project.street = params.street;
		project.numberhouse = params.numberhouse;
		project.colonia = params.colonia;
		project.cp = params.cp;
		project.municipio = params.municipio;
		project.state = params.state;

		// PERSONAL ADDRESS PANEL

		project.carreracursada = params.carreracursada;
		project.school = params.school;
		project.status = params.status;
		project.semestresconcluidos = params.semestresconcluidos;
		project.speciality = params.speciality;
		project.secondcarrera = params.secondcarrera;
		project.secondcarrera_specify = params.secondcarrera_specify;
		project.secondcarrera_school = params.secondcarrera_school;
		project.secondcarrera_titulado = params.secondcarrera_titulado;

		project.save((error,StudentStored) => 
		{
			if(error) return res.status(500).send({message: "Error Al Guardar"});
			if(!StudentStored) return res.status(404).send({message:'No Se Ha Podido Guardar Al Docente'})
			return res.status(200).send({student:StudentStored});
		});
	},

	getStudents: (req, res) =>
	{
		student.find({/*[EJ: year:2019]*/}).exec((error,students) =>
		{
			if(error) return res.status(500).send({message: "Error Al Devolver Los Datos"});
			if(students.length==0) return res.status(200).send({message: "No Hay Proyectos Para Mostrar"});
			return res.status(200).send({students});
		});
	},
}

module.exports = controller_student;