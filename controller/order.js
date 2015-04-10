var db = require('../db');
var _ = require('underscore');
var util = require('../util');
var async = require('async');

function OrderController() {};

OrderController.prototype.getHandler = {
    handler: function(request, reply) {

        db.order.find(request.query).exec(function(err, orderList) {

            if (err) {
                util.reply.error(err, reply);
                return;
            }

            reply({
                list: orderList
            });
        });
    }
};

OrderController.prototype.postHandler = {
    handler: function(request, reply) {

        var orderPostData = JSON.parse(request.payload)
        util.logger.info("Order", orderPostData)

        var orderQueryData = {}

        async.parallel([
            function(cb) {
                db.specialist.findById(orderPostData.specialist_id).exec(function(err, data) {
                    if (err) {
                        console.log(err)
                        cb(err)
                        return
                    }

                    if (null == data) {
                        console.log("no data found for id")
                        cb("no data found for id")
                        return
                    }

                    orderQueryData.specialist = data
                    cb()
                })
            },
            function(cb) {
                db.customer.findById(orderPostData.customer_id).exec(function(err, data) {
                    if (err) {
                        console.log(err)
                        cb(err)
                        return
                    }

                    if (null == data) {
                        console.log("no data found for id")
                        cb("no data found for id")
                        return
                    }

                    orderQueryData.customer = data
                    cb()
                })
            }
        ], function(err) {
            if (err) {
                util.reply.error(err, reply)
                return
            }
            console.log("order details", orderQueryData)

            reply("ok")
        });



        // async.each(orderPost.line_items, function(line_item, cb) {
        //     console.log('order line_item', line_item)

        //     db.product.findById(line_item.product_id).select('name price').exec(function(err, product) {

        //         if (err) {
        //             console.log(err)
        //             cb(err)
        //         }

        //         product = product.toObject()
        //         product.quantity = line_item.quantity
        //         console.log('product ', product)
        //         order.line_items.push(product)

        //         cb()
        //     })

        // }, function(err) {
        //     if (err) {
        //         util.reply.error(err, reply);
        //         return;
        //     }

        //     console.log(order)
        //         // calculate total and price
        //     _.each(order.line_items, function(line_item) {
        //         order.total_quantity += Number(line_item.quantity)
        //         order.total_price += (Number(line_item.price) * Number(line_item.quantity))
        //     })
        //     console.log(order)
        //     order.save()
        //     reply(order)
        // })
    }
};

module.exports = new OrderController();