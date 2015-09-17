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
        //db.category.find({$and:[{active: {'$ne': false }},{category:{'$ne':'super_users'}}]}).select('category sub_category active').sort('order sub_category').find(function(err, services) {
        var query_param = {};
      //  query_param['active'] = {'$ne': false };
      console.log("CATEGORY CONTROLLER OOO"+request.query.id)
        
        if(request.query.id){
            db.category.findOne({_id: request.query.id}).exec(function(err, category){
                reply({
                    category: category
                });
            });
        }
        else{
            query_param['category'] = '';
            query_param['subcategory'] = '';
            query_param['service'] = '';
            query_param['customerType'] = '';
           // query_param['attribute1'] = '';
           // query_param['attribute2'] = '';
           // query_param['parent'] = '';
           if(request.query.customerType  && request.query.customerType != 'undefined')
            {
                query_param['customerType'] = request.query.customerType;
            }else{
                 query_param['customerType'] = 'women';
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
            console.info(query_param);
            db.category.find().exec(function(err, services){
                if (err) {
                    util.reply.error(err, reply);
                    return;
                }
                console.log("SERVICES" + services);
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
 * Get Category
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
                    reply({
                        services: services
                    });
                }
            });
        }
    }
};

module.exports = new CategoryController();