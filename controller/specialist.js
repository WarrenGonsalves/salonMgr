var Hapi = require('hapi');
var db = require("../db");
var util = require("../util");
var _ = require('underscore');

function SpecialistController() {};

/**
 * [postConfigHandler: helper method to create a dummy sepcialist record]
 * @type {Object}
 */
SpecialistController.prototype.postConfigHandler = {
    handler: function(request, reply) {

        db.category.findOne({
            _id: request.params.cat
        }, function(err, data) {
            console.log("creating a specialist with name: " + data);
            var specialist = new db.specialist();
            specialist.name = request.params.fname;
            specialist.address1 = "address 1";
            specialist.address2 = "address 2";
            specialist.city = "my city";
            specialist.categories.push(data);
            specialist.save();
            reply(specialist);
        });
    }
};

SpecialistController.prototype.getConfigHandler = {
    handler: function(request, reply) {

        console.log(__filename + ' query param ' + JSON.stringify(request.query));

        var isGrouped = false;
        var query_param = {}

        if (!(request.query.store === undefined)) {
            query_param['stores.store_id'] = request.query.store;
        }

        if (!(request.query.category === undefined)) {
            query_param['categories._id'] = request.query.category;
        }

        if (!(request.query.grouped === undefined)) {
            isGrouped = request.query.grouped;
        }

        console.log(__filename + ' query param ' + JSON.stringify(query_param));

        db.specialist.find(query_param, function(err, specialistList) {
            if (err) {
                reply(err).code(500);
                return;
            }

            if (isGrouped) {
                // group services by availability
                specialistList = _.groupBy(specialistList, function(data) {
                    if (data.available) {
                        return 'Available'
                    } else {
                        return 'Busy'
                    };
                });
            };

            reply({
                specialist_list: specialistList
            });
        });


    }
};

/**
 * [getAllByCategoryId: given a category_id find all specialists ]
 */
SpecialistController.prototype.getAllByCategoryId = {
    handler: function(request, reply) {

        console.log(__filename + "get specialist by category: " + request.params.cat_id);
        db.specialist.find({
            'categories._id': request.params.cat_id
        }, function(err, data) {
            util.replyHelper.ifError(err, reply);
            reply({
                specialist_list: data
            });
        });
    }
};

/**
 * [getAllAvailableByCategory: given a category_id and start time find a specialist who is free for that timeslot.]
 * @type {Object}
 */
SpecialistController.prototype.getAllAvailableByCategory = {
    handler: function(request, reply) {

        console.log(__filename + "get all available specialists by category: " + request.params.cat_id + " : time ");
        db.specialist.find({
            'categories._id': request.params.cat_id
        }, function(err, data) {
            util.replyHelper.ifError(err, reply);
            reply({
                specialist_list: data
            });
        });
    }
};


SpecialistController.prototype.postBookSpecialist = {
    handler: function(request, reply) {

        var specialist_id = request.params.spc_id;
        var cust_name = request.payload.name;
        var cust_phone = request.payload.phone;
        var cust_addr = request.payload.addr;
        var cust_task = request.payload.task;

        console.log(__filename + "booking specialist for: " + specialist_id + cust_name + cust_phone + cust_addr + cust_task);

        db.specialist.findOne({
            _id: specialist_id
        }, function(err, specialist) {

            if (err) {
                reply(err).code(510);
                return;
            }

            if (specialist === null) {
                reply("Specialist not found ").code(510);
                return;
            }

            console.log(__filename + specialist.toJSON());

            // if (!specialist.available) {
            //     reply("specialist not available for booking").code(510);
            //     return;
            // }

            // create new job
            db.job.createNew(specialist_id, cust_name, cust_phone, cust_addr, cust_task, function(err, data) {
                if (err) {
                    reply(err).code(510);
                    return;
                } else {
                    reply(data);
                }
            });

            specialist.available = false;
            specialist.save();

        });
    }
};

SpecialistController.prototype.postUnBookSpecialist = {
    handler: function(request, reply) {

        var specialist_id = request.params.spc_id;

        db.specialist.findOne({
            _id: specialist_id
        }, function(err, specialist) {

            if (err) {
                reply(err).code(510);
                return;
            }

            if (specialist === null) {
                reply("Specialist not found ").code(510);
                return;
            }

            specialist.available = true;
            specialist.save();
        });
    }
};



var specialistController = new SpecialistController();
module.exports = specialistController;