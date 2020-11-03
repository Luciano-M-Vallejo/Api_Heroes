'use strict'

var express = require('express');
var ProjectController = require('../controllers/project');

var router = express.Router();

var multipart = require('connect-multiparty');
var multipatMiddleware = multipart({uploadDir: './uploads'});

router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-hero', ProjectController.saveHero);
router.get('/hero/:id?', ProjectController.getHero);
router.get('/heros', ProjectController.getHeros);
router.put('/hero/:id', ProjectController.updateHero);
router.delete('/hero/:id', ProjectController.deleteHero);
router.post('/upload-image/:id', multipatMiddleware, ProjectController.uploadImage);

router.get('/pagination', ProjectController.paginationHero);


module.exports = router;
