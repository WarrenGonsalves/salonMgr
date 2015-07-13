var Hapi = require('hapi');
var db = require("../db");
var util = require("../util");
var node_util = require('util');
var _ = require('underscore');
var veribage = require('../config/legal');
var moment = require('moment');
var momenttz = require('moment-timezone');

function StudioController() {};

StudioController.prototype.getConfigHandler = {
    handler: function(request, reply) {

        console.log(__filename + ' query param ' + JSON.stringify(request.query));

        var query_param = {}

        // filter for category
        if (!(request.query.category === undefined)) {
            query_param['categories'] = request.query.category;
        }

        // filter for circle 
        if (!(request.query.lat === undefined) && !(request.query.lng === undefined)) {
            var nearLoc = {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(request.query.lng), parseFloat(request.query.lat)]
                    },
                    $maxDistance: 25000
                }
            };
            query_param['circleloc'] = nearLoc;
        }
        
        console.log(__filename + ' query param ' + JSON.stringify(query_param));

        db.studio.find(query_param).populate('categories').exec(function(err, studioList) {
            if (err) {
                reply(err).code(500);
                return;
            }

            reply({
                studio_list: studioList
            });
        });
    }
};

StudioController.prototype.postConfigHandler = {
    handler: function(request, reply) {
        console.log("in controller");
        
        // create new studio
        studio = new db.studio();
        studio.name = request.payload.name;
        studio.email = request.payload.email;
        studio.phone = request.payload.phone;
        studio.categories.push('559bf17ce4b020c37dc08859');
        studio.features = ['ac', 'home', 'pick&drop'];
        studio.images.push({"name": "img1", "url": "https://s3.amazonaws.com/uifaces/faces/twitter/HenryHoffman/128.jpg"});
        studio.images.push({"name": "img2", "url": "https://s3.amazonaws.com/uifaces/faces/twitter/HenryHoffman/128.jpg"});
        studio.images.push({"name": "img3", "url": "https://s3.amazonaws.com/uifaces/faces/twitter/HenryHoffman/128.jpg"});
        studio.images.push({"name": "img4", "url": "https://s3.amazonaws.com/uifaces/faces/twitter/HenryHoffman/128.jpg"});
        studio.images.push({"name": "img5", "url": "https://s3.amazonaws.com/uifaces/faces/twitter/HenryHoffman/128.jpg"});
        db.circle.find({"_id": "559bfd2ee022c888d10f9c99"}).exec(function(err, circleList) {
            var circle = _.sample(circleList);
            studio.circle = circle;
            studio.circleloc = circle.locs;
        });
        //studio.images.push('');
        studio.type = 'salon';//request.payload.type;
        studio.save();

        reply(studio);
    }
};

var StudioController = new StudioController();
module.exports = StudioController;