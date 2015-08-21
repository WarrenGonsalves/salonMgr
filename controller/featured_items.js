var Hapi = require('hapi');
var db = require("../db");
var util = require("../util");
var node_util = require('util');
var _ = require('underscore');
var moment = require('moment');
var momenttz = require('moment-timezone');


function featuredListController() {};

/**
 * [ get all feattured items ]
 */
featuredListController.prototype.getFeaturedItems = {
    handler: function(request, reply) {
        console.log("in controller");
        
        db.featured_items.find({}, function(err, data) {

            if(err){
                util.reply.error(err, reply);
            }
           // console.log("in find");
            reply({
                featured_list: data
            });
        });
    }
};

featuredListController.prototype.setFeaturedItem = {
    handler: function(request, reply) {
        console.log("in controller");
        
        // create new customer
        featturedItem = new db.featured_items();
        featturedItem.item_id = request.payload.item_id;
        featturedItem.title = request.payload.title;
        featturedItem.img = request.payload.img || null;
        featturedItem.url = request.payload.url || null;
        featturedItem.rating = request.payload.rating || null;
        featturedItem.category = request.payload.email || null;
        featturedItem.type = request.payload.type;
        featturedItem.save();

        reply(featturedItem);
    }
};

var featuredListController = new featuredListController();
module.exports = featuredListController;