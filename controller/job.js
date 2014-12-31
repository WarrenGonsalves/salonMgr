var db = require("../db");
var util = require("../util");
var config = require("../config/constants");
var fs = require('fs');

function JobController() {};

/**
 * Get Job
 */
JobController.prototype.getConfigHandler = {
    handler: function(request, reply) {

        var query_param = {}

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
                reply(err).code(420);
                return;
            }

            reply({
                joblist: jobs
            });
        });
    }
};

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
                reply(err).code(510);
                return;
            }

            if (selectedJob === null) {
                reply("Job not found ").code(510);
                return;
            }

            selectedJob.complete = true;
            selectedJob.complete_date = Date.now();
            selectedJob.save();
            db.specialist.findById(selectedJob.specialist_id).exec(function(err, selectedSpecialist) {

                if (err) {
                    reply(err).code(510);
                    return;
                }

                if (selectedSpecialist === null) {
                    reply("Specialist not found ").code(510);
                    return;
                }

                var index = selectedSpecialist.jobs.indexOf(selectedJob._id);
                if (index > -1) {
                    selectedSpecialist.jobs.splice(index, 1);
                    console.log("splicing");
                }
                selectedSpecialist.save();
                console.log("removed job from specialist: " + selectedJob._id);
                // TODO: soft delete booking entry.
                reply(selectedSpecialist);
            });
        });
    }
}
module.exports = new JobController();