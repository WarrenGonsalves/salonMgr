var db = require('../db');
var _ = require('underscore');
var util = require('../util');
var node_request = require('request');

var SHOPIFY_BASE_URL = "https://5c836e6567c765665a2aab4e434493ff:83b8525775eac64994c7cfb95d7ea9c9@handsforhome.myshopify.com/";
var SHOPIFY_CUSTOMER_URL = SHOPIFY_BASE_URL + "admin/customers.json";

function ShopifyController() {};

ShopifyController.prototype.getCustomersHandler = {
    handler: function(request, reply) {
        db.shopify_customer.find({}).exec(function(err, s_customers) {
            if (err) {
                util.reply.error(err, reply);
                return;
            }

            reply({s_customers: s_customers});
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

            // remove all existing customer records
            db.shopify_customer.remove({}, function(err, data) {
                if (err) {
                    util.reply.error(err, reply);
                    // log error dont return
                }

                _.each(customers, function(customer) {
                    s_customer = new db.shopify_customer();
                    s_customer.shopify_id = customer.id;
                    s_customer.city = customer.default_address.city;
                    s_customer.society = customer.default_address.company;
                    s_customer.wing = customer.default_address.address1;
                    s_customer.apt = customer.default_address.address2;
                    s_customer.identifier = customer.first_name;
                    s_customer.save();
                })

                reply("processed customers: " + customers.length);
            });
        });
    }
};

module.exports = new ShopifyController();