var Hapi = require('hapi');
var db = require("../db");
var fs = require('fs');
var config = require("../config/constants");

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
                    reply(err).code(500);
                    return;
                }

                if (!store || store === undefined) {
                    reply("Store not found").code(500);
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
        var review = new db.review();
        review.text = request.payload.text;
        review.save(function(err, data) {
            if (err) {
                console.log(err);
            }
        });
        reply(review);
    }
};

var adminController = new AdminController();
module.exports = adminController;