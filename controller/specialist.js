var Hapi = require('hapi');
var db = require("../db");
var util = require("../util");
var node_util = require('util');
var _ = require('underscore');
var veribage = require('../config/legal');
var moment = require('moment');
var momenttz = require('moment-timezone');

var SPECIALIST_REFFERED_REPLY = "Thank You! for adding %s. Our team will contact the specialist and on-board him in a week.";

function SpecialistController() {};

/**
 * [postConfigHandler: create new specialist]
 * @type {Object}
 */
SpecialistController.prototype.postConfigHandler = {
    handler: function(request, reply) {

        if (request.payload.referral_customer_id === null) {
            util.reply.error("Provide customer id", reply);
            return;
        }

        if (request.payload.name === null) {
            util.reply.error("Provide specialist name", reply);
            return;
        }

        if (request.payload.phone === null) {
            util.reply.error("Provide specialist phone", reply);
            return;
        }

        customer_id = request.payload.referral_customer_id;
        name = request.payload.name;
        phone = request.payload.phone;
        category = request.payload.category_id;

        // if (request.payload.category_id === null) {
        //     util.reply.error("Provide specialist cateogry id", reply);
        //     return;
        // }

        db.specialist.findOne({
            phone: request.payload.phone
        }).exec(function(err, specialist) {
            util.email.sendNewSpecialistReferral(name, phone, category, customer_id);

            reply_string = node_util.format(SPECIALIST_REFFERED_REPLY, name)
            util.reply.success(reply_string, reply);
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
            query_param['categories'] = request.query.category;
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
                    },
                    $maxDistance: 25000
                }
            };
            query_param['circleloc'] = nearLoc;
        }

        // Filter out specialists who are already booked.
        var bookStartTime
        if (!(request.query.book_date === undefined)) {
            bookStartTime = moment(request.query.book_date, 'YYYY-MM-DDThh:mmTZD');
        } else {
            bookStartTime = moment(Number(request.query.book_date_milli));
        }
        var bookEndTime = moment(bookStartTime).add(2, 'hours');

        console.log(__filename, "Start Time", momenttz(bookStartTime).tz('Asia/Kolkata').format('MMM Do, h:mm:ss a'), "End Time", momenttz(bookEndTime).tz('Asia/Kolkata').format('MMM Do, h:mm:ss a'));


        db.booking.find({
            book_date: {
                $gte: bookStartTime,
                $lt: bookEndTime
            },
            active: true
        }).select('-_id specialist_id').lean().exec(function(err, bookedSpecialistList) {

            // Ids of booked specialists
            var specialistIdList = [];
            _.map(bookedSpecialistList, function(bookedSpecalist) {
                specialistIdList.push(String(bookedSpecalist.specialist_id));
            })

            console.log('booked specialists in 4 hours: ' + JSON.stringify(specialistIdList));

            query_param['_id'] = {
                $nin: specialistIdList
            };

            // only query for active specialists.
            query_param['active'] = {'$ne': false };

            console.log(__filename + ' query param ' + JSON.stringify(query_param));

            db.specialist.find(query_param).populate('jobs').populate('ratings').populate('categories').limit(3).exec(function(err, specialistList) {
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
            util.reply.error(err, reply);
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
            if (err) {
                util.reply.error(err, reply);
                return;
            }

            reply({
                specialist_list: data
            });
        });
    }
};

SpecialistController.prototype.postBookSpecialist = {
    handler: function(request, reply) {

        console.log("PAYLOAD-----" + JSON.stringify(request.payload));

        var specialist_id = request.params.spc_id;
        var customer_id = request.params.cust_id;
        var cust_name = request.payload.name;
        var cust_phone = request.payload.phone;
        var cust_addr1 = request.payload.addr;
        var cust_addr2 = request.payload.addr2;
        var cust_addr_landmark = request.payload.landmark;
        var cust_task = request.payload.task;
        var book_date
        if (!(request.payload.book_date === undefined)) {
            book_date = new Date(Date.parse(request.payload.book_date));
        }

        if (!(request.payload.book_date_milli === undefined)) {
            book_date = new Date(parseInt(request.payload.book_date_milli));
        }

        if (specialist_id === null) {
            util.reply.error("Incorrect specialist id ", reply);
            return;
        }

        if (customer_id === null) {
            util.reply.error("Incorrect customer id", reply);
            return;
        }

        if (request.payload.book_date === undefined && request.payload.book_date_milli === undefined) {
            util.reply.error("Provide book date", reply);
            return;
        }

        if (request.payload.category === undefined) {
            util.reply.error("Provide specialist category title", reply);
            return;
        }

        util.logger.info(__filename, ["booking specialist for: " + specialist_id + ":" + customer_id + ":"], JSON.stringify(request.payload));

        db.specialist.findOne({
            _id: specialist_id
        }, function(err, specialist) {

            if (err) {
                util.reply.error(err, reply);
                return;
            }

            if (specialist === null) {
                reply("Specialist not found ").code(510);
                return;
            }

            var job = db.job();

            job.specialist_id = specialist_id;
            job.specialist_name = specialist.name;
            job.specialist_category = request.payload.category;
            job.specialist_ph = specialist.phone;
            job.specialist_image = specialist.profile_img;
            job.cust_id = customer_id;
            job.cust_name = cust_name;
            job.cust_ph = cust_phone;
            job.cust_addr1 = cust_addr1;
            job.cust_addr2 = cust_addr2;
            job.cust_addr_landmark = cust_addr_landmark;
            job.cust_task = cust_task;
            job.book_date = book_date;
            job.save();
            job.setJobId();
            job.save();

            console.log(__filename + "new job created: " + JSON.stringify(job._id));
            specialist.current_job = job._id;
            specialist.jobs.push(job._id);
            specialist.available = false;
            //console.log(__filename + "adding job to specialist: " + JSON.stringify(specialist));
            specialist.save();

            var booking = new db.booking();
            booking.specialist_id = job.specialist_id;
            booking.book_date = new Date(Date.parse(book_date));
            booking.cust_id = job.cust_id;
            booking.job_id = job._id;
            booking.save();

            job.booking_slot_id = booking._id;
            job.save();

            db.customer.findById(customer_id).exec(function(err, customer) {
                if (customer != null) {
                    job.cust_email = customer.email;
                    job.save();
                    util.email.sendBookingConfirmation(customer, job);
                    util.sms.sendBookingConfirmation(job, specialist);
                    util.sms.notifySpecialistNewBooking(job);
                } else {
                    util.logger.info(__filename, "No booking notifcation as no valid customer found");
                }
            });

            reply(job);
        });
    }
};

SpecialistController.prototype.postCustomerJob = {
    handler: function(request, reply) {

        var specialist_id = request.payload.spc_id;
        var cust_name = request.payload.name;
        var cust_phone = request.payload.phone;
        var cust_task = request.payload.task;
        var book_date
        if (!(request.payload.book_date === undefined)) {
            book_date = new Date(Date.parse(request.payload.book_date));
        }

        if (!(request.payload.book_date_milli === undefined)) {
            book_date = new Date(parseInt(request.payload.book_date_milli));
        }

        if (specialist_id === null) {
            util.reply.error("Incorrect specialist id ", reply);
            return;
        }

        if (request.payload.book_date === undefined && request.payload.book_date_milli === undefined) {
            util.reply.error("Provide book date", reply);
            return;
        }

        if (request.payload.category === undefined) {
            util.reply.error("Provide specialist category title", reply);
            return;
        }

        util.logger.info(__filename, ["new customer + job referred by specialist: " + specialist_id], JSON.stringify(request.payload));

        db.customer.findOne({
            ph: cust_phone
        }).exec(function(err, existingCustomer) {

            db.specialist.findOne({
                _id: specialist_id
            }, function(err, specialist) {

                if (err) {
                    util.reply.error(err, reply);
                    return;
                }

                if (specialist === null) {
                    reply("Specialist not found ").code(510);
                    return;
                }

                if (existingCustomer == null) {
                    var customer = db.customer();
                    customer.name = cust_name;
                    customer.ph = cust_phone;
                    customer.save();
                } else {
                    var customer = existingCustomer;
                }

                var job = db.job();

                job.specialist_id = specialist_id;
                job.specialist_name = specialist.name;
                job.specialist_category = request.payload.category;
                job.specialist_ph = specialist.phone;
                job.specialist_image = specialist.profile_img;
                job.cust_id = customer._id;
                job.cust_name = cust_name;
                job.cust_ph = cust_phone;
                job.cust_task = cust_task;
                job.book_date = book_date;
                job.save();
                job.setJobId();
                job.save();

                console.log(__filename + "new job created: " + JSON.stringify(job._id));
                specialist.current_job = job._id;
                specialist.jobs.push(job._id);
                specialist.available = false;
                //console.log(__filename + "adding job to specialist: " + JSON.stringify(specialist));
                specialist.save();

                var booking = new db.booking();
                booking.specialist_id = job.specialist_id;
                booking.book_date = new Date(Date.parse(book_date));
                booking.cust_id = job.cust_id;
                booking.job_id = job._id;
                booking.save();

                job.booking_slot_id = booking._id;
                job.cust_email = customer.email;
                job.save();
                util.email.sendBookingConfirmation(customer, job);
                util.sms.sendBookingConfirmation(job, Specialist);
                util.sms.notifySpecialistNewBooking(job);

                reply(job);
            });

        });
    }
};

var specialistController = new SpecialistController();
module.exports = specialistController;