var db = require('../db');
var _ = require('underscore');
var util = require('../util');

var SPECIALIST_BY_CATEGORY_HREF = "/specialists/bycategory/"

function CategoryController() {};

/**
 * Get Category
 */
CategoryController.prototype.getConfigHandler = {
    handler: function(request, reply) {
        db.category.find({}).select('category sub_category').sort('order sub_category').find(function(err, services) {
            if (err) {
                util.reply.error(err, reply);
                return;
            }

            services = _.map(services, function(data) {
                data = data.toJSON();
                data.href = SPECIALIST_BY_CATEGORY_HREF + data._id;
                return data;
            });

            // group services by category
            services = _.groupBy(services, function(data) {
                return data.category;
            });

            // re-map json structure to match requirement
            services = _.map(services, function(data) {
                var mappedValue = {
                    'category': data[0].category,
                    'sub_categories': data
                };
                return mappedValue;
            })

            reply({
                services: services
            });
        });
    }
};

module.exports = new CategoryController();