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
      //  db.category.find({$and:[{active: {'$ne': false }},{category:{'$ne':'super_users'}}]}).select('category sub_category active').sort('order sub_category').find(function(err, services) {
              db.category.find({active: {'$ne': false }).select('category sub_category active').sort('order sub_category').find(function(err, services) {

            if (err) {
                util.reply.error(err, reply);
                return;
            }

            // services = _.map(services, function(data) {
            //     data = data.toJSON();
            //     data.href = SPECIALIST_BY_CATEGORY_HREF + data._id;
            //     return data;
            // });

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

            if (!(request.query.customer === undefined)) {
                db.job.find({
                    cust_id: request.query.customer,
                    complete:false
                }).sort('book_date').exec(function(err, jobs) {
                    console.log("got jobs: " + jobs);
                    // if (err) {
                    //     util.reply.error(err, reply);
                    //     return;
                    // }

                    reply({
                        services: services,
                        joblist: jobs
                    });

                    return;
                });
            } else {
                reply({
                    services: services
                });
            }
        });
    }
};

module.exports = new CategoryController();