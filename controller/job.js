var db = require("../db");
var util = require("../util");
var config = require("../config/constants");
var fs = require('fs');
var _ = require('underscore');

function JobController() {};

/**
 * Get Job
 */
JobController.prototype.getConfigHandler = {
    handler: function(request, reply) {

        var query_param = request.query;

        if (!(request.query.customer === undefined)) {
            query_param['cust_id'] = request.query.customer;
        }

        if (!(request.query.specialist === undefined)) {
            query_param['specialist_id'] = request.query.specialist;
        }

        if (!(request.query.complete === undefined)) {
            query_param['complete'] = request.query.complete;
        }

        console.log("job query: " + JSON.stringify(query_param));

        // TODO sort by book date.
        db.job.find(query_param).sort('book_date').exec(function(err, jobs) {
            console.log("getting all jobs ");
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

                if (request.payload.status == 'Estimated' && request.payload.estimate == undefined) {
                    util.reply.error('Need valid estimate data to set job status = Estimated', reply);
                    return;
                } else {
                    selectedJob.estimate = request.payload.estimate
                }
            }

            selectedJob.save(function(err, savedJob) {
                if (err) {
                    util.reply.error(err, reply);
                    return;
                }

                reply(selectedJob);

                if (selectedJob.status === "Accepted" || selectedJob.status === "Cancelled") {
                    removeJobFromSpecialist(selectedJob);
                }

            });
        });
    }
};

function removeJobFromSpecialist(job) {

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

        // TODO: soft delete booking entry.
        //reply(job);
    });
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
        });
    }
};


module.exports = new JobController();