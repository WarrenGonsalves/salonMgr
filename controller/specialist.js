var Hapi = require('hapi');
var db = require("../db");
var util = require("../util");
var _ = require('underscore');
var veribage = require('../config/legal');
var moment = require('moment');

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

        // filter for category
        if (!(request.query.category === undefined)) {
            query_param['categories._id'] = request.query.category;
        }

        if (!(request.query.grouped === undefined)) {
            isGrouped = request.query.grouped;
        }

        // filter for circle 
        if (!(request.query.lat === undefined) && !(request.query.lng === undefined)) {
            var nearLoc = {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(request.query.lng), parseFloat(request.query.lat)]
                    }
                }
            };
            query_param['circleloc'] = nearLoc;
        }

        console.log(__filename + ' query param ' + JSON.stringify(query_param));

        db.specialist.find(query_param).populate('jobs').lean().exec(function(err, specialistList) {
            if (err) {
                reply(err).code(500);
                return;
            }

            // specialistList = _.map(dataList, function(data) {
            //     return data.toJSON();
            // });

            console.log("date text : " + request.query.book_date)

            // Filter out specialists who are already booked.
            var bookStartTime = moment(request.query.book_date, 'YYYY-MM-DDThh:mmTZD');
            var bookEndTime = moment(bookStartTime).add(4, 'hours');

            console.log('bookimg start : end ' + moment(bookStartTime).format() + moment(bookEndTime).format());
            db.booking.find({
                book_date: {
                    $gte: bookStartTime,
                    $lt: bookEndTime
                }
            }).select('-_id specialist_id').exec(function(err, bookedSpecialistList) {

                // filter out booked specialists
                var specialistIdList = [];
                _.map(bookedSpecialistList, function(bookedSpecalist) {
                    specialistIdList.push(String(bookedSpecalist.specialist_id));
                })

                console.log('booked specialists in 4 hours: ' + JSON.stringify(specialistIdList));


                specialistList = _.reject(specialistList, function(specialist){
                    return _.contains(specialistIdList, String(specialist._id));
                });

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
                    specialist_list: specialistList,
                    specialist_rate_info: veribage.specialistRate
                });
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
        var customer_id = request.params.cust_id;
        var cust_name = request.payload.name;
        var cust_phone = request.payload.phone;
        var cust_addr = request.payload.addr;
        var cust_task = request.payload.task;
        var book_date = new Date(Date.parse(request.payload.book_date));

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

            // if (!specialist.available) {
            //     reply("specialist not available for booking").code(510);
            //     return;
            // }

            // create new job
            var jobId;
            db.job.createNew(specialist_id, customer_id, cust_name, cust_phone, cust_addr, cust_task, book_date, function(err, currentJob) {
                if (err) {
                    reply(err).code(510);
                    return;
                } else {
                    specialist.current_job = currentJob._id;
                    specialist.jobs.push(currentJob._id);

                    specialist.available = false;
                    console.log(__filename + specialist.toJSON());
                    specialist.save();

                    var booking = new db.booking();
                    booking.specialist_id = currentJob.specialist_id;
                    booking.book_date = new Date(Date.parse(book_date));
                    booking.cust_id = currentJob.cust_id;
                    booking.save();

                    reply(currentJob);
                }
            });
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
            specialist.current_job = null;
            specialist.save();

            reply("Success");
        });
    }
};

var specialistController = new SpecialistController();
module.exports = specialistController;