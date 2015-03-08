var Hapi = require('hapi');
var db = require("../db");
var util = require("../util");
var node_util = require('util');
var _ = require('underscore');
var moment = require('moment');
var momenttz = require('moment-timezone');

var SPECIALIST_REFFERED_REPLY = "Thank You! for adding %s. Our team will contact the specialist and on-board him in a week.";

function DealListController() {};

/**
 * [getAllByCategoryId: given a category_id find all specialists ]
 */
DealListController.prototype.getDeals = {
    handler: function(request, reply) {
        console.log("in controller");
        
        db.deals.find({}, function(err, data) {

            if(err){
                util.reply.error(err, reply);
            }
            console.log("in find");
            reply({
                deal_list: data
            });
        });
    }
};

var dealListController = new DealListController();
module.exports = dealListController;