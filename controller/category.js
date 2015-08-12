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
      console.log("in category controller  ")
        
        if(request.query.id){
            db.category.findOne({_id: request.query.id}).populate('parent', null, 'category').exec(function(err, category){
                reply({
                    category: category
                });
            });
        }
        else{
            query_param['parent'] = '';
            if(request.query.parent)
            {
                query_param['parent'] = request.query.parent;
            }

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
                    reply({
                        services: services
                    });
                }
            });
        }
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