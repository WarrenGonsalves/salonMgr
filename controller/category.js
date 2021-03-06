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
      //  query_param['active'] = {'$ne': false };
      console.log("CATEGORY CONTROLLER OOO"+request.query.id)
        
        if(request.query.id){
            db.category.findOne({_id: request.query.id}).exec(function(err, category){
                reply({
                    category: category
                });
>>>>>>> 26bf8858c57c88ab34ff16a23f9d41f9f43974c2
            });
        }
        else{
            // query_param['category'] = '';
            // query_param['subcategory'] = '';
            // query_param['service'] = '';
            // query_param['customerType'] = '';
           // query_param['attribute1'] = '';
           // query_param['attribute2'] = '';
           // query_param['parent'] = '';
           if(request.query.customerType  && request.query.customerType != 'undefined')
            {
                query_param['customerType'] = request.query.customerType;
            }
            if(request.query.category  && request.query.category != 'undefined')
            {
                query_param['category'] = request.query.category;
            }
            if(request.query.subcategory  && request.query.subcategory != 'undefined')
            {
                query_param['subcategory'] = request.query.subcategory;
            }
            if(request.query.service  && request.query.service != 'undefined')
            {
                query_param['service'] = request.query.service;
            }
            if(request.query.attribute1  && request.query.attribute1 != 'undefined')
            {
               // query_param['attribute1'] = request.query.attribute1;
            }
            if(request.query.attribute2 && request.query.attribute2 != 'undefined')
            {
               // query_param['attribute2'] = request.query.attribute2;
            }
            if (request.query.fullList) {
                console.log("all services");
            }else {
                query_param['sassyService'] = true;
            }
            console.info(query_param);
            db.category.find(query_param).exec(function(err, services){
                if (err) {
                    util.reply.error(err, reply);
                    return;
                }
                console.log("SERVICES" + services.length);
                reply({
                        services: services
                 });

              /*  if(request.query.parent){
                    db.category.findOne({_id: request.query.parent}).exec(function(err, category){
                        reply({
                            services: services,
                            category: category
                        });
                    });
                }
                else{
                    reply({
                        services: services
                    });
                }*/
            });
        }
    }
};
/**
 * Get trending categories
 */
CategoryController.prototype.getTrendingCategories = {
    handler: function(request, reply) {
        //db.category.find({$and:[{active: {'$ne': false }},{category:{'$ne':'super_users'}}]}).select('category sub_category active').sort('order sub_category').find(function(err, services) {
        var query_param = {};
      //  query_param['active'] = {'$ne': false };
      console.log("CATEGORY TRENDING CONTROLLER")
     
         
            db.category.find({ 'trending' : { $gt: 0  } }).sort('trending').exec(function(err, services){
                if (err) {
                    util.reply.error(err, reply);
                    return;
                }
                console.log("SERVICES" + services);
                reply({
                        services: services
                 });

            });
        }
    }


/**
 * Get trending categories
 */
CategoryController.prototype.getCategoriesForCatalogDisplay = {
    handler: function(request, reply) {
        //db.category.find({$and:[{active: {'$ne': false }},{category:{'$ne':'super_users'}}]}).select('category sub_category active').sort('order sub_category').find(function(err, services) {
        var query_param = {};
      //  query_param['active'] = {'$ne': false };
      console.log("CATEGORY DISPLAY CONTROLLER")
     
         
            db.category.distinct("service",{"customerType":"girls"}).exec(function(err, girlsCatalog){
                if (err) {
                    util.reply.error(err, reply);
                    return;
                }
            });

            db.category.distinct("service",{"customerType":"boys"}).exec(function(err, boysCatalog){
                if (err) {
                    util.reply.error(err, reply);
                    return;
                }
                boysCatalog = boysCatalog
            }); 

            console.log("boysCatalog" + boysCatalog);
            reply({
                boysCatalog: boysCatalog
            });

        }
    }


CategoryController.prototype.postConfigHandler = {
    handler: function(request, reply) {

        // create new category
        category = new db.category();
        // general info
        category.category = request.payload.category;
        category.subcategory = request.payload.category;
        category.service = request.payload.service;
        category.attribute1 = request.payload.attribute1;
        category.attribute2 = request.payload.attribute2;
        category.order = request.payload.order;
        category.save();

        reply(category);

    }
};

CategoryController.prototype.getIA = {
    handler: function(request, reply) {
        //db.category.find({$and:[{active: {'$ne': false }},{category:{'$ne':'super_users'}}]}).select('category sub_category active').sort('order sub_category').find(function(err, services) {
        var query_param = {};
      //  query_param['active'] = {'$ne': false };
        
        if(request.query.parentID){
            db.category.findOne({_id: request.query.parentID}).populate('parent', null, 'category').exec(function(err, category){
                reply({
                    category: category
                });
            });
        }
        else{
            query_param['parentID'] = '';
            if(request.query.parentID)
            {
                query_param['parentID'] = request.query.parentID;
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

                if(request.query.parentID){
                    db.category.findOne({_id: request.query.parentID}).exec(function(err, category){
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