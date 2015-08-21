var Hapi = require('hapi');
var db = require("../db");
var util = require("../util");
var node_util = require('util');
var _ = require('underscore');
var veribage = require('../config/legal');
var moment = require('moment');
var momenttz = require('moment-timezone');
var mongoose = require('mongoose');

function StudioController() {};

StudioController.prototype.getConfigHandler = {
    handler: function(request, reply) {

        console.log(__filename + ' query param ' + JSON.stringify(request.query));

        var query_param = {};

        // filter for category
        if (!(request.query.service === undefined)) {
            query_param['services.id'] = request.query.service;

        }

        if (request.query._id) {
            query_param['_id'] = request.query._id;
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
        
        console.log(__filename + ' query param ' + JSON.stringify(query_param));

        db.studio.find(query_param).populate('services.id').exec(function(err, studioList) {
            if (err) {
                util.reply.error(err, reply);
                return;
            }

            reply({
                studio_list: studioList
            });
        });
    }
};

StudioController.prototype.postConfigHandler = {
    handler: function(request, reply) {

        // create new studio
        studio = new db.studio();

        // general info
        studio.name = request.payload.name;
        studio.email = request.payload.email;
        studio.phone = request.payload.phone;
        studio.likes = 20;
        studio.description = 'This is a description of the studio';

        // services
        studio.services.push({id: '55aac875e4b0f6549e074f4a', price: 300, service_time: '30 min', products: ['Loreal']});
        
        studio.features = ['ac', 'home', 'pick&drop'];

        // profile pic 
        studio.profile_img = "https://s3.amazonaws.com/uifaces/faces/twitter/HenryHoffman/128.jpg";

        // images
        studio.images.push({"name": "img1", "url": "https://s3.amazonaws.com/uifaces/faces/twitter/HenryHoffman/128.jpg"});
        studio.images.push({"name": "img2", "url": "https://s3.amazonaws.com/uifaces/faces/twitter/HenryHoffman/128.jpg"});
        studio.images.push({"name": "img3", "url": "https://s3.amazonaws.com/uifaces/faces/twitter/HenryHoffman/128.jpg"});
        studio.images.push({"name": "img4", "url": "https://s3.amazonaws.com/uifaces/faces/twitter/HenryHoffman/128.jpg"});
        studio.images.push({"name": "img5", "url": "https://s3.amazonaws.com/uifaces/faces/twitter/HenryHoffman/128.jpg"});

        // circle/location
        db.circle.find({"_id": "559bfd2ee022c888d10f9c99"}).exec(function(err, circleList) {
            if(circleList){
                var circle = _.sample(circleList);
                studio.circle = circle;
                studio.circleloc = circle.locs;

                // studio type
                studio.type.push('salon');
                //studio.type.push('spa');

                studio.save();

                reply(studio);
            }
            else{
                console.log(err);
                util.reply.error('Could not find Circle/Location. ', reply);
            }
        });
    }
};

StudioController.prototype.postBookStudio = {
    handler: function(request, reply) {

        console.log("PAYLOAD-----" + JSON.stringify(request.payload));

        var specialist_id = request.params.studio_id;
        var customer_id = request.params.cust_id;
        var cust_name = request.payload.name;
        var cust_phone = request.payload.phone;
        /*var cust_addr1 = request.payload.addr;
        var cust_addr2 = request.payload.addr2;
        var cust_addr_landmark = request.payload.landmark;
        var cust_task = request.payload.task;*/
        var book_date;
        if (!(request.payload.book_date === undefined)) {
            book_date = new Date(Date.parse(request.payload.book_date));
        }

        if (!(request.payload.book_date_milli === undefined)) {
            book_date = new Date(parseInt(request.payload.book_date_milli));
        }

        if (specialist_id === null) {
            util.reply.error("Incorrect studio id ", reply);
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

        if (request.payload.service === undefined) {
            util.reply.error("Provide service", reply);
            return;
        }

        util.logger.info(__filename, ["booking studio for: " + specialist_id + ":" + customer_id + ":"], JSON.stringify(request.payload));

        db.studio.findOne({
            _id: specialist_id
        }).populate('services.id').exec(function(err, studio) {

            if (err) {
                util.reply.error(err, reply);
                return;
            }

            if (studio === null) {
                reply("Studio not found " + specialist_id).code(510);
                return;
            }

            StudioController.checkCoupon(request.payload.coupon_code, function(err, coupon){
                if(err){
                    //console.log(err);
                    util.reply.error("Invalid Coupon code " + request.payload.coupon_code, reply);
                    return;
                }

                var job = db.job();

                // service
                job.service = request.payload.service;

                job.price = 0;
                
                for(x in studio.services){
                    console.log(studio.services[x]);
                    if(studio.services[x].id && studio.services[x].id._id == job.service){
                        job.price = studio.services[x].price;
                    }
                }

                var total_amount = job.price;
                if(request.payload.coupon_code){
                    var discount = (job.price*(coupon.discount/100));
                    if(discount > coupon.max_amount){
                        discount = coupon.max_amount;
                    }

                    total_amount -= discount;

                    job.coupon = {
                        code: coupon.code,
                        description: coupon.description,
                        discount: coupon.discount,
                        discount_amt: discount,
                        max_amount: coupon.max_amount
                    }
                }

                job.total_amount = total_amount;

                // studio/specialist
                job.specialist_id = specialist_id;
                job.specialist_name = studio.name;
                job.specialist_ph = studio.phone;
                job.specialist_image = studio.profile_img;

                // customer
                job.cust_id = customer_id;
                job.cust_name = cust_name;
                job.cust_ph = cust_phone;

                /*job.cust_addr1 = cust_addr1;
                job.cust_addr2 = cust_addr2;
                job.cust_addr_landmark = cust_addr_landmark;
                job.cust_task = cust_task;*/

                job.book_date = book_date;
                job.save();

                job.setJobId();
                job.save();
                
                console.log(__filename + "new job created: " + JSON.stringify(job._id));
                /*specialist.current_job = job._id;
                specialist.jobs.push(job._id);
                specialist.available = false;
                //console.log(__filename + "adding job to specialist: " + JSON.stringify(specialist));
                specialist.save();*/

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
                        job.cust_name = customer.name;
                        job.save();

                        db.job.findOne({_id: job._id}).populate('service', null, 'category').exec(function(err, new_job){
                            console.log(new_job);
                            if(err || !new_job){
                                util.logger.info(__filename, "No booking notifcation as no valid customer found");
                                return;
                            }
                            util.email.sendBookingConfirmation(customer, new_job);
                            util.sms.sendBookingConfirmation(customer.ph, new_job, customer.name);
                            util.sms.notifySpecialistNewBooking(new_job);
                            reply(new_job);
                        });
                    } else {
                        util.logger.info(__filename, "No booking notifcation as no valid customer found");
                    }
                });
                /*if (!(request.payload.catalog_ids === undefined)) {
                    //console.log('----000------------'+request.payload.catalog_ids.split(",")[0]);
                    db.catalog.find({ _id: { $in: request.payload.catalog_ids.split(',') } }).exec(function (err, catalogList) {
                        //console.log('-----555-----' + catalogList);
                        if (err) {
                            util.reply.error(err, reply);
                            return;
                        }
                        var total_price = 0;
                        var total_quantity = 0;
                        var order = db.order();
                        var line_items = new Array();
                        for (var catalog in catalogList) {
                            var item = {
                                catalog_id: catalogList[catalog]._id,
                                specialist_id: catalogList[catalog].specialist_id,
                                name: catalogList[catalog].name,
                                detail: catalogList[catalog].detail,
                                price: catalogList[catalog].price,
                                icon_size_image: catalogList[catalog].icon_size_image, 
                                medium_image: catalogList[catalog].medium_image
                            };
                            total_quantity++;
                            total_price += catalogList[catalog].price;
                            line_items.push(item);
                        }
                        order.total_price = total_price;
                        order.total_quantity = total_quantity;
                        order.line_items = line_items;
                        order.save();
                        job.order_id = order._id;
                        job.save();
                    });
                }*/
            });
            
        });
    }
};

StudioController.prototype.checkCoupon = function(coupon_code, callback){
    if(coupon_code){
        db.coupon.findOne({code: coupon_code, active: true}, function(err, coupon){
            if(coupon)
                callback(false, coupon);
            else{
                callback(err||true, false);
            }
        });
    }
    else{
        callback(false, false);
    }
};

var StudioController = new StudioController();
module.exports = StudioController;