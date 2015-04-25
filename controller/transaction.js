var db = require('../db');
var util = require('../util');
var _ = require('underscore');

var TAG = "Transaction";

// Controller
function Controller() {};

Controller.prototype.hawaiiHandler = {
    handler: function(request, reply) {

        util.logger.info(TAG, ["paytm callback", JSON.stringify(request.payload)])

        if (request.payload.STATUS == "TXN_SUCCESS") {

            reply.view('paytm_success.jade', {
                OrderId: request.payload.ORDERID
            })

        } else {

            reply.view('paytm_error.jade', {
                OrderId: request.payload.ORDERID
            })

        }
    }
};

/** get Job object and create paytm POST object and return. */
Controller.prototype.postHandler = {
    handler: function(request, reply) {

        var amount = request.payload.amount;
        var job_id = request.payload.job_id;
        var channel_id = request.payload.channel_id;

        if (!amount) {
            util.reply.error("Tnx amount is required", reply);
            return;
        }

        if (!job_id) {
            util.reply.error("job id is required", reply);
            return;
        }

        if (!channel_id) {
            util.reply.error("channel_id either needs to be WEB or WAP", reply);
            return;
        }

        util.logger.info(TAG, ["new paytm transaction", JSON.stringify(request.payload)]);

        db.job.findById(job_id).exec(function(err, job) {

            if (err) {
                util.reply.error(err, reply);
                return;
            }

            console.log(job);

            if (!job) {
                util.reply.error("no valid job found for id " + job_id, reply);
                return;
            }

            // valid job lets create a transaction.
            var tnx = new db.tnx();
            tnx.save();

            util.paytm.getPaytmPost(amount, tnx._id, job, channel_id, function(err, paytmPost) {
                tnx.data = JSON.stringify(paytmPost);
                tnx.save();
                reply(paytmPost);
            });
        });
    }
};

module.exports = new Controller();