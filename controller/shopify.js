var db = require('../db');
var _ = require('underscore');
var util = require('../util');
var node_request = require('request');

var SHOPIFY_BASE_URL = "https://5c836e6567c765665a2aab4e434493ff:83b8525775eac64994c7cfb95d7ea9c9@handsforhome.myshopify.com/";
var SHOPIFY_CUSTOMER_URL = SHOPIFY_BASE_URL + "admin/customers.json?limit=250";
var SHOPIFY_PRODUCT_URL = SHOPIFY_BASE_URL + "admin/products.json?limit=250";

function ShopifyController() {};

// CUSTOMERS

ShopifyController.prototype.getCustomersHandler = {
    handler: function(request, reply) {
        db.shopify_customer.find({}).exec(function(err, s_customers) {
            if (err) {
                util.reply.error(err, reply);
                return;
            }

            reply({
                s_customers: s_customers
            });
        });
    }
}

ShopifyController.prototype.reloadCustomerHandler = {
    handler: function(request, reply) {

        // download new customer info
        node_request(SHOPIFY_CUSTOMER_URL, function(err, response, body) {

            if (err || response.statusCode != 200) {
                util.reply.error(err, reply);
                return;
            }

            var customers = (JSON.parse(body)).customers;

            _.each(customers, function(customer) {

                var s_customer = {};
                s_customer = new db.shopify_customer();
                s_customer.shopify_id = customer.id;
                s_customer.city = customer.default_address.city;
                s_customer.society = customer.default_address.company;
                s_customer.wing = customer.default_address.address1;
                s_customer.apt = customer.default_address.address2;
                if (!(undefined == customer.default_address.phone || "" == customer.default_address.phone)) {
                    s_customer.phone = customer.default_address.phone;
                }
                s_customer.identifier = customer.first_name;
                //s_customer.save();

                db.customer.findOne({
                    $or: [{
                        shopify_id: customer.id
                    }, {
                        ph: s_customer.phone
                    }]
                }).exec(function(err, existingCustomer) {

                    if (err) {
                        util.reply.error(err, reply);
                        return;
                    }

                    if (null == existingCustomer) {
                        // create new customer
                        existingCustomer = new db.customer();
                    }

                    console.log(s_customer.phone);
                    if (undefined != s_customer.phone) {
                        console.log("processing phone number", customer.id);
                        existingCustomer.ph = s_customer.phone;
                    }

                    existingCustomer.is_shopify = true;
                    existingCustomer.shopify_customer = s_customer;
                    existingCustomer.shopify_id = customer.id;
                    existingCustomer.save();
                });


                reply("processed customers: " + customers.length);

            })



            // // remove all existing customer records
            // db.shopify_customer.remove({}, function(err, data) {
            //     if (err) {
            //         util.reply.error(err, reply);
            //         // log error dont return
            //     }

            //     _.each(customers, function(customer) {
            //         s_customer = new db.shopify_customer();
            //         s_customer.shopify_id = customer.id;
            //         s_customer.city = customer.default_address.city;
            //         s_customer.society = customer.default_address.company;
            //         s_customer.wing = customer.default_address.address1;
            //         s_customer.apt = customer.default_address.address2;
            //         s_customer.identifier = customer.first_name;
            //         s_customer.save();
            //     })

            //     
            // });
        });
    }
};

// ORDERS

ShopifyController.prototype.postOrderHandler = {
    handler: function(request, reply) {
        //console.log("here---", request.payload);

        var shopify_order = request.payload;

        var product_id = shopify_order.line_items[0].product_id;
        db.specialist.findOne({
            shopify_product_id: product_id
        }).exec(function(err, specialist) {
            if (err) {
                util.reply.error(err, reply);
                return;
            }

            if (null == specialist) {
                util.reply.error("no shopify specialist found", reply);
                return;
            }

            var job = db.job();

            job.is_shopify = true;
            job.shopify_order = JSON.parse(JSON.stringify(request.payload));
            job.specialist_id = specialist._id;
            job.specialist_name = specialist.name;
            job.specialist_ph = specialist.phone;
            job.shopify_customer_id = shopify_order.customer.id;
            job.save();
            job.setJobId();
            job.save();

            util.logger.info("Shopify Order", [job]);
            console.log("Shopify Order", JSON.stringify(job));

            reply("Job Created");
        });
    }
};

ShopifyController.prototype.closeOrder = function(orderNumber, cb) {

    var shopify_close_order_url = SHOPIFY_BASE_URL + 'admin/orders/' + orderNumber + '/close.json';
    console.log("Close Order", shopify_close_order_url);

    node_request.post(shopify_close_order_url, function(err, response, body) {
        if (err || response.statusCode != 200) {
            cb(err);
        }
        return cb(err, body);
    });
}


// SPECIALISTS - PRODUCTS

ShopifyController.prototype.reloadSpecialistHandler = {
    handler: function(request, reply) {

        // download new product info
        node_request(SHOPIFY_PRODUCT_URL, function(err, response, body) {

            if (err || response.statusCode != 200) {
                util.reply.error(err, reply);
                return;
            }

            var products = (JSON.parse(body)).products;

            _.each(products, function(product) {

                db.specialist.findOne({
                    shopify_product_id: product.id
                }, function(err, specialist) {

                    if (err) {
                        util.reply.error(err, reply);
                        // log error dont return
                    }

                    // upsert specialist

                    if (null == specialist) {
                        // create new one
                        var specialist = new db.specialist();
                        specialist.name = product.title;
                        specialist.phone = product.tags;
                        specialist.is_shopify = true;
                        specialist.shopify_product_id = product.id;
                        specialist.save();

                    } else {
                        // update existing one
                        specialist.name = product.title;
                        specialist.phone = product.tags;
                        specialist.is_shopify = true;
                        specialist.shopify_product_id = product.id;
                        specialist.save();
                    }

                    reply("processed products/specialist: " + products.length);

                });
            });

        });
    }
};


module.exports = new ShopifyController();