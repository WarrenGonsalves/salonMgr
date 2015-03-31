var db = require('../db');
var _ = require('underscore');
var util = require('../util');
var fs = require('fs');

function OrderController() {};

OrderController.prototype.getAllOrders = {
    handler: function (request, reply) {
        
        var query_param = {}

        db.order.find(query_param).exec(function (err, orderList) {
            if (err) {
                util.reply.error(err, reply);
                return;
            }

            reply({
                orderList: orderList
            });
        });
    }
};

OrderController.prototype.addOrder = {
	handler: function (request, reply) {
        
        var query_param = {}

        db.catalog.find(query_param).exec(function (err, orderList) {
            if (err) {
                util.reply.error(err, reply);
                return;
            }

            reply({
                orderList: orderList
            });
        });
    }
};

module.exports = new OrderController();