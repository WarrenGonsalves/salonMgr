var db = require('../db');
var _ = require('underscore');
var util = require('../util');

function FeedbackController() {};

FeedbackController.prototype.getConfigHandler = {
    handler: function(request, reply) {

        var query_param = {}

        // TODO sort by book date.
        db.feedback.find(query_param).exec(function(err, feedbackList) {
            if (err) {
                util.reply.error(err, reply);
                return;
            }

            reply({
                feedbackList: feedbackList
            });
        });
    }
};

FeedbackController.prototype.postConfigHandler = {
    handler: function(request, reply) {

        if (request.payload.customer_id === undefined) {
            return util.reply.error("Invalid customer_id", reply);
        }

        if (request.payload.text === undefined) {
            return util.reply.error("Invalid feedback text", reply);
        }

        var feedback = new db.feedback();
        feedback.customer_id = request.payload.customer_id;
        feedback.text = request.payload.text;
        feedback.save();

        db.customer.findById(request.payload.customer_id).exec(function(err, customer) {
            // ignore error not important just log it in console
            if (err) {
                util.logger.err("Feedback", ["Customer not found for", request.payload.customer_id]);
            }

            util.email.sendFeedback(feedback, customer);

        });
        reply(feedback);
    }
};

module.exports = new FeedbackController();