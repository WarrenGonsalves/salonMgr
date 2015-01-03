var db = require('../db');
var _ = require('underscore');
var util = require('../util');

function FeedbackController() {};

FeedbackController.prototype.getConfigHandler = {
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
                util.reply.error(err, reply);
                return;
            }

            reply({
                joblist: jobs
            });
        });
    }
};

module.exports = new FeedbackController();