'use strict'

var express = require('express');

// Controllers

var GeneralController = require('../controllers/general.controller');
var PostController = require('../controllers/posts.controller');
var UserController = require('../controllers/users.controller');
var SuperuserController = require('../controllers/superusers.controller');

var router = express.Router();

// MiddleWare

var multipart = require('connect-multiparty');
var multipartMiddleWare = multipart({uploadDir: './uploads'});

// Routes

	// General
		router.post('/new-general', GeneralController.createDocument);
		router.get('/get-general', GeneralController.getDocuments);

	// Posts
		router.post('/new-post', PostController.createDocument);
		router.get('/get-posts', PostController.getDocuments);
		router.get('/get-postsrange/:skip?', PostController.getDocumentsRange);
		router.get('/get-post/:id?', PostController.getDocument);

	// Users
		router.post('/new-user', UserController.createDocument);
		router.get('/get-users', UserController.getDocuments);

	// Users
		router.post('/new-superuser', SuperuserController.createDocument);
		router.get('/get-superusers', SuperuserController.getDocuments)

module.exports = router;