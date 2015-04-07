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

OrderController.prototype.getOrderById = {
    handler: function (request, reply) {

        var query_param = { _id: request.params._id }

        db.order.findOne(query_param).exec(function (err, order) {
            if (err) {
                util.reply.error(err, reply);
                return;
            }

            reply(order);
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

OrderController.prototype.updateOrder = {
    handler: function (request, reply) {
        if (request.payload._id === undefined) {
            return util.reply.error("Invalid order id", reply);
        }
        var query_param = { _id: request.payload._id }
        console.log(query_param);
        db.order.findOne(query_param).exec(function (err, order) {
            if (err) {
                util.reply.error(err, reply);
                return;
            }
            if (order === null)
            {
                return util.reply.error("Order id not found", reply);
            }
            db.catalog.find({ _id: { $in: request.payload.catalog_ids.split(',') } }).exec(function (err, catalogList) {
                if (err) {
                    util.reply.error(err, reply);
                    return;
                }
                /*if (catalogList === null) {
                    return util.reply.error("Catalog not found", reply);
                }*/
                var total_price = 0;
                var total_quantity = 0;
                //var order = db.order();
                var line_items = new Array();
                for (var catalog in catalogList) {
                    var item = {
                        catalog_id: catalogList[catalog]._id,
                        specialist_id: catalogList[catalog].specialist_id,
                        name: catalogList[catalog].name,
                        detail: catalogList[catalog].detail,
                        price: catalogList[catalog].price,
                        icon_size_image: catalogList[catalog].icon_size_image,
                        medium_image: catalogList[catalog].medium_image
                    };
                    total_quantity++;
                    total_price += catalogList[catalog].price;
                    line_items.push(item);
                }
                order.total_price = total_price;
                order.total_quantity = total_quantity;
                order.line_items = line_items;
                order.save();
            });
            reply({
                success: true
            });
        });
    }
};

module.exports = new OrderController();