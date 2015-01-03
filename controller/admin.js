var Hapi = require('hapi');
var db = require("../db");
var fs = require('fs');
var config = require("../config/constants");
var util = require("../util");
var _ = require('underscore');

function AdminController() {};

AdminController.prototype.addSpecialistCategoryHandler = {
    handler: function(request, reply) {

        db.category.findOne({
            _id: request.params.cat_id
        }, function(err, cat) {
            db.specialist.findOne({
                _id: request.params.spc_id
            }, function(err, specialist) {
                console.log("adding cat: " + cat + " to specialist: " + specialist);
                specialist.categories.push(cat);
                specialist.save();
                reply(specialist);
            });
        });
    }
};

AdminController.prototype.addSpecialistStoreHandler = {
    handler: function(request, reply) {
        db.specialist.findOne({
            _id: request.params.spc_id
        }, function(err, specialist) {
            db.store.findOne({
                _id: request.params.store_id
            }, function(err, store) {
                if (err) {
                    util.reply.error(err, reply);
                    return;
                }

                if (!store || store === undefined) {
                    util.reply.error("Store not found", reply);
                    return;
                }

                console.log("adding store: " + store + " to specialist: " + specialist);
                specialist.stores.push({
                    'store_id': request.params.store_id
                });
                specialist.save();
                reply(specialist);
            });
        });
    }
};

AdminController.prototype.postSpecialistHandler = {
    handler: function(request, reply) {

        db.category.findOne({
            _id: request.query.cat_id
        }, function(err, selectedCat) {
            console.log("creating a specialist with data: " + JSON.stringify(selectedCat));
            var specialist = new db.specialist();
            specialist.name = request.query.name;
            specialist.addr = request.query.addr;
            specialist.city = request.query.city;
            specialist.state = request.query.state;
            specialist.zip = request.query.zip;
            specialist.family = request.query.family;
            specialist.hourly_rate = request.query.hourly_rate;
            specialist.consulting_fee = request.query.consulting_fee;
            specialist.phone = request.query.phone;
            specialist.work_hours = request.query.work_hours;
            specialist.verified = request.query.verified;
            specialist.categories.push(selectedCat);
            //specialist.verified.push(request.params.verified);
            specialist.save();
            reply(specialist);
        });
    }
};

AdminController.prototype.postSpecialistProfileHandler = {
    payload: {
        output: 'stream',
        allow: 'multipart/form-data'
    },
    handler: function(request, reply) {
        var profile_img = request.payload["img"];
        var fileName = "profile_" + request.params.spc_id;
        var path = config.imgDir + fileName;
        console.log(path);
        profile_img.pipe(fs.createWriteStream(path));

        profile_img.on('end', function(err) {

            db.specialist.findOne({
                _id: request.params.spc_id
            }, function(err, selectedSpecialist) {
                selectedSpecialist.profile_img = config.imgURL + fileName;
                selectedSpecialist.save();
                reply(selectedSpecialist);
            });
        });
    }
};

AdminController.prototype.postReviewMetadataHandler = {
    handler: function(request, reply) {
        console.log("Creating review metadata");
        var rating = new db.rating();
        rating.text = request.payload.text;
        rating.save(function(err, data) {
            if (err) {
                console.log(err);
            }
        });
        reply(rating);
    }
};

AdminController.prototype.consoleHandler = {
    handler: function(request, reply) {

        db.logger.find({}).limit(500).sort('-created_date').exec(function(err, logs) {
            //console.log('logger data', JSON.stringify(logs));
            reply.view('index', {
                title: 'Bumblebee',
                log_data: logs
            });
        });
    }
};

AdminController.prototype.setupCategoryHandler = {
    handler: function(request, reply) {

        categories = [{
            category: 'Care',
            sub_category: 'Home cleaners',
            order: 1
        }, {
            category: 'Care',
            sub_category: 'Laundry',
            order: 1
        }, {
            category: 'Care',
            sub_category: 'Recycler',
            order: 1
        }, {
            category: 'Care',
            sub_category: 'Pest Control',
            order: 1
        }, {
            category: 'Repair',
            sub_category: 'Carpenter',
            order: 2
        }, {
            category: 'Repair',
            sub_category: 'Electrician',
            order: 2
        }, {
            category: 'Repair',
            sub_category: 'Laptop',
            order: 2
        }, {
            category: 'Repair',
            sub_category: 'Painter',
            order: 2
        }, {
            category: 'Repair',
            sub_category: 'Plumber',
            order: 2
        }, {
            category: 'Repair',
            sub_category: 'Refrigerator',
            order: 2
        }, {
            category: 'Repair',
            sub_category: 'Washing machine',
            order: 2
        }];

        _.each(categories, function(category){
            var newCategory = new db.category;
            newCategory.category = category.category;
            newCategory.sub_category = category.sub_category;
            newCategory.order = category.order;
            newCategory.save();
        });
    }
}

var adminController = new AdminController();
module.exports = adminController;