'use strict'

var express = require('express');

// Controllers

var GeneralController = require('../controllers/general.controller');
var PostController = require('../controllers/posts.controller');
var UserController = require('../controllers/users.controller');

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
		router.post('/register-user', UserController.registerUser);
		router.get('/get-users', UserController.getDocuments);
		router.get('/check-email/:email?', UserController.checkEmail);
		router.get('/check-nickname/:nickname?', UserController.checkNickname);

module.exports = router;