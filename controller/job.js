var db = require("../db");
var util = require("../util");
var config = require("../config/constants");
var fs = require('fs');
var _ = require('underscore');
var ShopifyController = require('./shopify');

function JobController() {};

/**
 * Get Job
 */
JobController.prototype.getConfigHandler = {
    handler: function(request, reply) {

        var query_param = {};

        if (!(request.query.customer === undefined)) {
            query_param['cust_id'] = request.query.customer;
        }

        if (!(request.query.cust_id === undefined)) {
            query_param['cust_id'] = request.query.cust_id;
        }

        if (!(request.query.job_id === undefined)) {
            query_param['job_id'] = request.query.job_id;
        }

        if (!(request.query.shopify_customer_id === undefined)) {
            query_param['shopify_customer_id'] = request.query.shopify_customer_id;
        }

        if (request.query.is_shopify) {
            query_param['is_shopify'] = request.query.is_shopify;
        }

        // if (!(request.query.specialist_id === undefined)) {

        //     if (request.query.specialist_id === "54d34339210754d0a2b874bf") {
        //         query_param = '';
        //     } else {
        //         query_param['specialist_id'] = request.query.specialist;
        //     }

        // }

        if (!(request.query.specialist === undefined)) {
            if (request.query.specialist_id === "54d34339210754d0a2b874bf") {
                query_param = '';
            } else {
                query_param['specialist_id'] = request.query.specialist;
            }
        }

        if (!(request.query.specialist_id === undefined)) {
            if (request.query.specialist_id === "54d34339210754d0a2b874bf") {
                query_param = '';
            } else {
                query_param['specialist_id'] = request.query.specialist_id;
            }
        }

        if (!(request.query.complete === undefined)) {
            query_param['complete'] = request.query.complete;
        }

        util.logger.info("Jobs - get", [query_param])

        // TODO sort by book date.
        db.job.find(query_param).sort('book_date').populate('order_id').exec(function (err, jobs) {
            if (err) {
                util.reply.error(err, reply);
                return;
            }

            reply({
                joblist: jobs
            });
        });
    }
};

JobController.prototype.putHandler = {
    handler: function(request, reply) {
        db.job.findById(request.params.id, function(err, selectedJob) {
          //  console.log("debug","this is a test 3"+request.payload.status + " "+request.payload.estimate+" " + request.payload.estimated_fees);

            if (err) {
                util.reply.error(err, reply);
                return;
            }

            if (selectedJob === null) {
                util.reply.error("Job not found", reply);
                return;
            }

            if (request.payload.status !== undefined && 'Accepted,Estimated,Started,Finished,Cancelled,Invoiced'.indexOf(request.payload.status) > -1) {
                selectedJob.status = request.payload.status;

                if (request.payload.status == 'Estimated' && (request.payload.estimate == undefined || request.payload.estimate_cost == undefined)) {
                    util.reply.error('Need valid estimate + estimate_cost data to set job status = Estimated', reply);
                    return;
                }

                if (request.payload.status == 'Estimated') {
                    selectedJob.estimate = request.payload.estimate;
                    selectedJob.estimate_cost = request.payload.estimate_cost;
                }
            }

            selectedJob.save(function(err, savedJob) {
                if (err) {
                    util.reply.error(err, reply);
                    return;
                }

                if (selectedJob.is_shopify && selectedJob.status == 'Finished') {
                    // if shopify order is being closed then let know shopify too.
                    ShopifyController.closeOrder(selectedJob.shopify_order.id, function(err, response) {
                        if (err) {
                            util.reply.error(err, reply);
                            return;
                        }
                        //var order_info = response.order.order_number + " : " + response.order.id;
                        var jsonResponse = JSON.parse(response);
                        util.reply.success(jsonResponse, reply);
                    });

                } else {
                    reply(selectedJob);
                    sendJobStatusUpdate(selectedJob);
                    if (selectedJob.status == "Accepted" || selectedJob.status == "Cancelled") {
                        removeJobFromSpecialist(selectedJob);
                    }
                }
            });
        });
    }
};

function removeJobFromSpecialist(job) {

    // mark booking slot as inactive.
    db.booking.findOne({
        job_id: job._id
    }, function(err, selectedBooking) {
        util.logger.info('Unblock booking slot', [selectedBooking]);
        selectedBooking.active = false;
        selectedBooking.save();
    });

    db.specialist.findById(job.specialist_id).exec(function(err, selectedSpecialist) {

        if (err) {
            util.logger.err('Jobs', err);
            return;
        }

        if (selectedSpecialist === null) {
            util.logger.err('Jobs', 'Specialist not found');
            return;
        }

        var index = selectedSpecialist.jobs.indexOf(job._id);
        if (index > -1) {
            selectedSpecialist.jobs.splice(index, 1);
        }
        selectedSpecialist.save();
        console.log("removed job from specialist: " + job._id);
        util.logger.info("Jobs", ["removed job from specialist", job._id, selectedSpecialist._id])
    });
}

function sendJobStatusUpdate(job) {
    util.email.sendStatusUpdate(job);
}

JobController.prototype.postImageController = {
    payload: {
        output: 'stream',
        allow: 'multipart/form-data'
    },
    handler: function(request, reply) {

        //console.log("uploading img for job: " + JSON.stringify(request.payload));

        var job_img = request.payload["img"] || request.payload["_data"];
        var fileName = "job_" + util.generator.getUUID();
        var path = config.imgDir + fileName;

        job_img.pipe(fs.createWriteStream(path));

        job_img.on('end', function(err) {

            db.job.findOne({
                _id: request.params.id
            }, function(err, selectedJob) {
                selectedJob.images.push(config.imgURL + fileName);
                selectedJob.save();
                reply(selectedJob);
            });
        });
    }
};

JobController.prototype.jobDoneConfigHandler = {
    handler: function(request, reply) {
        db.job.findById(request.params.id, function(err, selectedJob) {

            if (err) {
                util.reply.error(err, reply);
                return;
            }

            if (selectedJob === null) {
                util.reply.error("Job not found", reply);
                return;
            }

            if (request.payload.cancelled === "true") {
                selectedJob.cancelled = true;
                selectedJob.status = 'Cancelled';
            } else {
                selectedJob.status = 'Finished';
            }

            selectedJob.complete = true;
            selectedJob.complete_date = Date.now();
            selectedJob.save();

            removeJobFromSpecialist(selectedJob);
            sendJobStatusUpdate(selectedJob);
        });
    }
};


module.exports = new JobController();