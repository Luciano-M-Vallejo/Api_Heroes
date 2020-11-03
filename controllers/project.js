'use strict'

var Hero = require('../models/project');
var fs = require('fs');

var controller = {

    home: function(req, res){
        return res.status(200).send({
            message: 'HOME'
        });
    },

    test: function(req, res){
        return res.status(200).send({
            message: 'TEST'
        });
    },


    saveHero: function(req, res){
        var hero = new Hero();
        var params = req.body;
        
        hero.alias = params.alias;
        hero.name = params.name;
        hero.description = params.description;
        hero.skills = params.skills;
        hero.image = null;

        hero.save((err, projectStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar Heroe'});
            if(!projectStored) return res.status(404).send({message: 'No se guardo el Heroe'});
            return res.status(200).send({project: projectStored});    
        });

    },

    getHero: function(req, res){
        var heroId = req.params.id;

        if(heroId == null) return res.status(404).send({message: 'No existe el Heroe'});
    
        Hero.findById(heroId, (err, hero) => {

            if(err) return res.status(500).send({message: 'Error al devolver Heroe'});
            if(!hero) return res.status(404).send({message: 'No existe el Heroe'});
            return res.status(200).send({hero});
        });
    },

    getHeros: function(req, res){

        Hero.find({}).exec((err, heros) => {
            if(err) return res.status(500).send({message: 'Error al devolver los Heroes'});
            if(!heros) return res.status(404).send({message: 'No existe los Heroes'});
            return res.status(200).send({heros});
        });
    },

    updateHero: function(req, res){
        var heroId = req.params.id;
        var update = req.body;
        var version = Hero.__v;

        Hero.findOneAndUpdate(heroId, update, {new:true}, (err, heroUpdated) => {
            if(err) return res.status(500).send({message: 'Error al modificar Heroe'});
            if(!heroUpdated) return res.status(404).send({message: 'No existe el Heroe'});
            return res.status(200).send({heroUpdated});
        });

    },

    deleteHero: function(req, res){
        var heroId = req.params.id;

        Hero.findByIdAndRemove(heroId, (err, heroDelete) => {
            if(err) return res.status(500).send({message: 'Error al remover el Heroe'});
            if(!heroDelete) return res.status(404).send({message: 'No existe el Heroe'});
            return res.status(200).send({heroDelete});
        });
    },

    uploadImage: function(req, res){
        var heroId = req.params.id;
        var fileName = 'No sube la Imagen...';

        if(req.files){

            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];
            
            if(fileExt == 'pgn' || fileExt == 'jpg' || fileExt == 'jpge' || fileExt == 'gif'){
                Hero.findByIdAndUpdate(heroId, {image: fileName}, {new: true}, (err, heroUpdated) => {
                    if(err) return res.status(500).send({message: 'Error al cargar imagen del Heroe'});
                    if(!heroUpdated) return res.status(404).send({message: 'No existe el Heroe'});
                    return res.status(200).send({project: heroUpdated});    
                });

            }else{
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({message: 'La extension no es valida'})
                });
            }

        }else{
            return req.status(200).send({
                message: fileName
            });
        }
    },
     
    paginationHero: function(req, res){
        var option = {
            limit: parseInt(req.query.limit, 5) || 5,
            page: parseInt(req.query.page, 5) || 1
        };

        Hero.paginate({}, option, (err, heros) => {
            if(err) return res.status(500).send({message: 'Error al Paginar Heroes'});
            if(!heros) return res.status(404).send({message: 'No existen Heroes'});
            return res.status(200).send({heros});
        });
    },
};

module.exports = controller;
