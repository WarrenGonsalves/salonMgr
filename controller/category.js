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
<<<<<<< HEAD
        db.category.find({$and:[{active: {'$ne': false }},{category:{'$ne':'super_users'}}]}).select('category display sub_category active').sort('order sub_category').find(function(err, services) {
      
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
=======
        //db.category.find({$and:[{active: {'$ne': false }},{category:{'$ne':'super_users'}}]}).select('category sub_category active').sort('order sub_category').find(function(err, services) {
        var query_param = {};
        query_param['active'] = {'$ne': false };
        
        if(request.query.id){
            db.category.findOne({_id: request.query.id}).populate('parent', null, 'category').exec(function(err, category){
                reply({
                    category: category
                });
>>>>>>> 26bf8858c57c88ab34ff16a23f9d41f9f43974c2
            });
        }
        else{
            query_param['parent'] = '';
            if(request.query.parent)
            {
                query_param['parent'] = request.query.parent;
            }

<<<<<<< HEAD
            // re-map json structure to match requirement
            services = _.map(services, function(data) {
                var mappedValue = {
                    'category': data[0].category,
                    'display': data[0].display,
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

=======
            db.category.find(query_param).sort('order').exec(function(err, services){
                if (err) {
                    util.reply.error(err, reply);
                    return;
                }

                if(request.query.parent){
                    db.category.findOne({_id: request.query.parent}).exec(function(err, category){
                        reply({
                            services: services,
                            category: category
                        });
                    });
                }
                else{
>>>>>>> 26bf8858c57c88ab34ff16a23f9d41f9f43974c2
                    reply({
                        services: services
                    });
                }
            });
        }
    }
};

module.exports = new CategoryController();