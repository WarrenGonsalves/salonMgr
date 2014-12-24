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

        console.log("uploading img for job: " + JSON.stringify(request.payload));

        var job_img = request.payload["img"];
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
}

module.exports = new JobController();