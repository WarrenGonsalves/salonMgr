var db = require("../db");

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

        db.job.find(query_param, function(err, jobs) {
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

module.exports = new JobController();