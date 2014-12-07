var Hapi = require('hapi');
var db = require("../db");

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
            _id: request.params.cat_id
        }, function(err, data) {
            console.log("creating a specialist with data: " + JSON.stringify(request.query));
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
            //specialist.verified.push(request.params.verified);
            specialist.save();
            reply(specialist);
        });
    }
};


var adminController = new AdminController();
module.exports = adminController;