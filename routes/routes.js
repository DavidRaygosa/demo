'use strict'

var express = require('express');

// Controllers

var StudentController = require('../controllers/students.controller');

var router = express.Router();

// MiddleWare

var multipart = require('connect-multiparty');
var multipartMiddleWare = multipart({uploadDir: './uploads'});

// Routes

	// Student
		router.post('/new-student', StudentController.saveStudent);
		router.get('/get-students', StudentController.getStudents);

module.exports = router;