'use strict'

var express = require('express');

// Controllers

var GeneralController = require('../controllers/general.controller');
var PostController = require('../controllers/posts.controller');
var UserController = require('../controllers/users.controller');
var AdminController = require('../controllers/admins.controller');

var router = express.Router();

// MiddleWare

var multipart = require('connect-multiparty');
var multipartMiddleWarePosts = multipart({uploadDir: './uploads/posts'});

// Routes

	// General
		router.post('/new-general', GeneralController.createDocument);
		router.get('/get-general', GeneralController.getDocuments);
		router.put('/update-general/:id',GeneralController.updateGeneral);

	// Posts
		router.post('/create-post', PostController.createDocument);
		router.get('/get-posts', PostController.getDocuments);
		router.get('/get-postsrange/:skip?', PostController.getDocumentsRange);
		router.get('/get-postsrangeadmin/:skip?', PostController.getDocumentsRangeAdmin);
		router.get('/get-post/:id?', PostController.getDocument);
		router.put('/upload-comment/:id?', PostController.addComment);
		router.put('/update-post/:id',PostController.updatePost);
		router.delete('/delete-post/:id',PostController.deleteProject);
		// IMAGES
			router.get('/get-post-image/:image', multipartMiddleWarePosts, PostController.getImagePostsFile);
			router.post('/upload-image/:id?', multipartMiddleWarePosts, PostController.uploadImage);
			router.post('/upload-images/:id?', multipartMiddleWarePosts, PostController.uploadImages);
			router.put('/delete-image/:image?', multipartMiddleWarePosts, PostController.deleteImage);
			router.put('/delete-images/:id?/:image?', multipartMiddleWarePosts, PostController.deleteImages);

	// Users
		router.post('/register-user', UserController.registerUser);
		router.get('/get-user/:id?', UserController.getDocument);
		router.get('/get-users', UserController.getDocuments);
		router.get('/get-usersrange/:skip?', UserController.getDocumentsRange);
		router.get('/check-email/:email?', UserController.checkEmail);
		router.get('/check-nickname/:nickname?', UserController.checkNickname);
		router.put('/update-user/:id',UserController.updateUser);
		router.delete('/delete-user/:id',UserController.deleteProject);

	// Admins
		router.get('/get-adminsrange/:skip?', AdminController.getDocumentsRange);
		router.get('/get-admin/:id?', AdminController.getDocument);

module.exports = router;