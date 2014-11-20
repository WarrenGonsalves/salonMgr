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

AdminController.prototype.addSpecialistStoreHandler= {
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
                specialist.stores.push({'store_id': request.params.store_id});
                specialist.save();
                reply(specialist);
            });
        });
    }
};

var adminController = new AdminController();
module.exports = adminController;