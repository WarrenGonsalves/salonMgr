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

      //  console.log(__filename + ' hsdjfhjsdfhkjsdkjfhjquery param ' + JSON.stringify(request.query));

        var query_param = {};

        // filter for category
        if (!(request.query.categoryId === undefined)) {
            query_param['services.id'] = mongoose.Types.ObjectId(request.query.categoryId);
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

        //db.studio.find(query_param).populate('services.id').exec(function(err, studioList) {
         db.studio.find(query_param).populate('services.id practitioners ratings').exec(function(err, studioList) {
            if (err) {
                util.reply.error(err, reply);
                return;
            }
            console.log(__filename + ' studioList' + studioList);
            reply({
                studio_list: studioList
            });
        });
    }
};


StudioController.prototype.getStudioListWithType = {
    handler: function(request, reply) {

        console.log("STUDIO CONTROLLER");

        var query_param = {};
        
          // filter for category
        if (!(request.query.categoryId === undefined)) {
            query_param['services.id'] = request.query.categoryId;
        }
/*
        // filter for category
        if (!(request.query.category === undefined)) {
            query_param['services.category'] = request.query.category;
        }

        if (!(request.query.subcat === undefined)) {
            query_param['services.subcategory'] = request.query.subcat;
        }

        if (!(request.query.service === undefined)) {
            query_param['services.service'] = request.query.service;
        }

      
        console.log("query "+ query_param['services.category'] + " subcat " +query_param['services.subcategory'] + " service "+query_param['services.service']);
 */
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
        
       // query_param['services.id']="55d77aab46faeb0a4d0a7b9f";

        console.log(__filename + ' query param ' + request.query.categoryId);

        db.studio.find(query_param).exec(function(err, studioList) {
            if (err) {
                util.reply.error(err, reply);
                return;
            }
            // console.log(__filename + ' query param ' +studioList);
           // console.log('STUDIO LIST ' +studioList);
            reply({
                studio_list: studioList
            });
        });
    }
};


StudioController.prototype.addStudioServices = {
    handler: function(request, reply) {
         var studioServicesObject = request.payload.studioServices;
          

        var studioID = request.params.studio_id;
        var services = {};
       
         db.studio.findOne({
            _id: studioID
        }).exec(function(err, studio) {
           
         
            /* studio.services['id']              = mongoose.Types.ObjectId(studioServicesObject.id);
             studio.services['attributetype']   = studioServicesObject.attributetype;
             studio.services['attributeArray']  = studioServicesObject.attributeArray;
             studio.services['service_time']    = studioServicesObject.service_time;*/

        services.id              = studioServicesObject.id;
        services.attributetype   = studioServicesObject.attributetype;
        services.attributeArray  = studioServicesObject.attributeArray;
        services.service_time    = studioServicesObject.service_time;
        if(studioServicesObject.attributetype == 0)
            services.price = parseInt(studioServicesObject.price);
        studio.services.push(services);

        studio.save();
            
            //  console.log(" in addStudioServices studioServicesObject.attributeArray  "  + JSON.stringify(studio.services));
            
             //console.log("studioServicesObject  in service " +JSON.stringify(studio.name));
             reply(studio);
        })
}

}

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
        attributeArrayValue = {"regular":{"up-to-waist":"3500","up-to-waist":"3700","below-waist":"3900"},"crown":{"up-to-waist":"3500","up-to-waist":"3700","below-waist":"3900"}};

        //studio.services.push({category:'hair',attributeArray:attributeArrayValue, subcategory:'color',service:'global',attributetype:'2', price: 300, service_time: '30 min', products: ['Loreal']});
       //  studio.services.push({id: '55cd8eef9ccf90a5fcf937db', price: 300, service_time: '30 min', products: ['Loreal']});
          studio.services.push({id: '55cf5e2bddedd324b4c138da', price: 400, service_time: '30 min', attributeArray: attributeArrayValue,attributetype:'2', products: ['Loreal']});
       //   studio.services.push({id: '55cd8eef9ccf90a5fcf937dd', price: 400, service_time: '30 min', products: ['Loreal']});

        //   studio.services.push({id: '55aac875e4b0f6549e074f4a', price: 300, service_time: '30 min', products: ['Loreal']});
        
        studio.features = ['ac', 'home', 'pick&drop'];

        // profile pic 
        studio.profile_img = "https://s3.amazonaws.com/uifaces/faces/twitter/HenryHoffman/128.jpg";

        // images
        studio.images.push({"name": "img1", "url": "https://s3.amazonaws.com/uifaces/faces/twitter/HenryHoffman/128.jpg"});
        studio.images.push({"name": "img2", "url": "https://s3.amazonaws.com/uifaces/faces/twitter/HenryHoffman/128.jpg"});
       
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

        //console.log("PAYLOAD-----" + JSON.stringify(request.payload));
        var studioOrder = request.payload.studioOrder;
        var studio_id = request.params.studio_id;
        var customer_id = request.params.cust_id;
        var practitioner = request.payload.practitioner;
        var cust_name = request.payload.name;
        var cust_phone = request.payload.phone;
        var product_orig_price = request.payload.product_orig_price;
        var affiliate = request.payload.affiliate;
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

        if (studio_id === null) {
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

        if (request.payload.services === undefined) {
            util.reply.error("Provide service", reply);
            return;
        }
        console.log("AFTER CHECKS");
        util.logger.info(__filename, ["booking studio for: " + studio_id + ":" + customer_id + ":"], JSON.stringify(request.payload));

        db.studio.findOne({
            _id: studio_id
        }).exec(function(err, studio) {

            if (err) {
                util.reply.error(err, reply);
                return;
            }

            if (studio === null) {
                reply("Studio not found " + studio_id).code(510);
                return;
            }

         //   StudioController.checkCouponWhileBooking(request.payload.coupon_code, function(err, coupon){
            StudioController.checkCouponWhileBooking(request.payload.coupon_code, function(err, coupon) {

                            if(err){
                                //console.log(err);
                                util.reply.error("Invalid Coupon code " + request.payload.coupon_code, reply);
                                return;
                            }
                            if (request.payload.coupon_code) 
                                var coupon = request.payload.coupon_code;
                            else var coupon = "notapplied";

                            var booking = new db.booking();
                            booking.studio_id = studio_id;
                            booking.book_date = new Date(Date.parse(book_date));
                            booking.cust_id = customer_id;
                            booking.practitioner = practitioner;
                            booking.services = request.payload.services;
                            booking.price = product_orig_price;
                            booking.affiliate = affiliate;
                            booking.coupon = coupon;
                            booking.save(function (err, newBooking) {
                                if (err) console.log(err);
                                var jobList = [];
                                for (var i = 0; i < request.payload.services.length; i++) 
                                {   
                                    var job = db.job();
        
                                    // service
                                    console.log("JOB LOOP !!!!!!!!!!!!!!!!!!!")
                                    console.log(request.payload.services[i].id)
                                    var currCategory = studio.services.id(request.payload.services[i].id);
                                    job.booking_slot_id = newBooking._id;

                                    job.service = currCategory.id;
        
                                    job.price = 0;
        
                                    var total_amount = product_orig_price;
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
                                    job.price = product_orig_price;
                                    job.total_amount = total_amount;
        
                                    // studio/specialist
                                    job.studio_id = studio_id;
                                    job.studio_name = studio.name;
                                    job.studio_ph = studio.phone;
                                    job.studio_image = studio.profile_img;
        
                                    // customer
                                    job.cust_id = customer_id;
                                    job.cust_name = cust_name;
                                    job.cust_ph = cust_phone;
                                    
        
                                    job.book_date = book_date;
                                    job.save();
        
                                    job.setJobId();
                                    job.save();
                                    jobList.push(job._id);
                                    console.log(__filename + "new job created: " + JSON.stringify(job._id));
                                }
                                newBooking.job_ids = jobList;
                                newBooking.save();
                                
                                db.customer.findById(customer_id).exec(function(err, customer) {
                                    if (customer != null) {
                                        // job.cust_email = customer.email;
                                        // job.cust_name = customer.name;
                                        // job.save();
                                        newBooking.setBookingNo(function (book) {
                                            db.booking.findById(newBooking._id).populate('cust_id studio_id').exec(function(err, currBooking){
                                                if(err || !currBooking){
                                                    util.logger.info(__filename, "No booking notifcation as no valid customer found");
                                                    return;
                                                }
                                                util.email.sendBookingConfirmation(customer, currBooking);
                                                if (studioOrder) 
                                                    util.sms.sendThankYouForComing(customer.ph, currBooking, currBooking.cust_id.name);
                                                else {
                                                    util.sms.sendBookingConfirmation(customer.ph, currBooking, currBooking.cust_id.name, coupon);
                                                    util.sms.notifySpecialistNewBooking(currBooking);
                                                }
                                                reply(newBooking);
                                            });
                                        });
                                        
                                    } else {
                                        util.logger.info(__filename, "No booking notifcation as no valid customer found");
                                        reply({message:"Booking created without customer"}).code(200);
                                    }
                                });
                            });

                            
                      
                    });
            
                });
    }
};


StudioController.prototype.checkCouponWhileBooking = function(coupon_code, callback){
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

StudioController.prototype.studiolead = {
    handler: function(request, reply) {
        var name = request.params.customer_name;
        var phone = request.params.phone;
        console.log(" in studiolead "+name +"  "+phone);
         util.sms.sendStudioLeadToCustomerService(name, phone);
         util.sms.sendStudioLeadToRequest(name, phone);
    }
}

StudioController.prototype.studiofeedback = {
    handler: function(request, reply) {
        var name = request.payload.customer_name;
        var phone = request.payload.phone_number;
        console.log(" in studiolead "+name +"  "+phone);
        util.email.sendStudioFeedback(request.payload);
        if(phone != undefined || phone != null)
            util.sms.sendThankYouForFeedback(name, phone);

        reply('{"success":"true"}');

    }
}

StudioController.prototype.checkCoupon = {
    handler: function(request, reply) {

        var coupon_code = request.params.coupon_code;
        var orig_price = request.params.orig_price;
      
        var couponMessage = [];
        db.coupon.findOne({code: coupon_code, active: true}, function(err, coupon){

            console.log("coupon "+coupon);

            //console.log("not null coupon "+coupon);
            if(coupon != null){

                console.log("coupon.discount = " + coupon.discount );
                var new_price = "";

                discount = (10*orig_price)/100;

                if(discount < coupon.max_amount){
                    new_price = orig_price - discount;
                }else{
                    new_price = orig_price - coupon.max_amount;
                    discount = coupon.max_amount;
                }
                
                console.log("new_price "+new_price);
                //coupon.new_price = new_price;       
               
               coupon.discount = discount;
                reply(coupon);
            }else
                util.reply.error('Could not find Circle/Location. ', reply);

        });
    }
};

var StudioController = new StudioController();
module.exports = StudioController;