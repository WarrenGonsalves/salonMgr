var db = require('../db');
var util = require('../util');
var _ = require('underscore');

// Controller
function invoiceController() {};

invoiceController.prototype.getConfigHandler = {
    handler: function(request, reply) {
        var query_param = {};

        if (!(request.query.id === undefined)) {
            query_param['_id'] = request.query.id;
        }

        db.invoice.find(query_param).populate('job').populate('specialist').lean().exec(function(err, invoiceList) {
            if (err) {
                util.reply.error(err, reply);
                return;
            }

            reply({
                invoice_list: invoiceList
            });
        });
    }
};

invoiceController.prototype.postConfigHandler = {
    handler: function(request, reply) {

        util.logger.info("Invoice", ["Invoice post payload", request.payload]);

        if (request.payload.job_id === undefined) {
            util.reply.error("Invalid job id", reply);
            return;
        }

        if (request.payload.line_item === undefined) {
            util.reply.error("Invalid line items", reply);
            return;
        }

        if (request.payload.total === undefined) {
            util.reply.error("Invalid total", reply);
            return;
        }

        db.job.findById(request.payload.job_id).lean().exec(function(err, job) {
            if (err) {
                util.reply.error(err, reply);
                return;
            }

            if (job === null) {
                util.reply.error("job not found for id: " + request.payload.job_id, reply);
                return;
            }

            var invoice = new db.invoice();
            invoice.customer_id = job.cust_id;
            invoice.job = job._id;
            invoice.specialist = job.specialist_id;

            _.each(request.payload.line_item, function(line_item) {
                var line_item_obj = JSON.stringify(eval('(' + line_item + ')'));
                invoice.line_items.push(JSON.parse(line_item_obj));
            });

            invoice.total = request.payload.total;
            invoice.save()

            sendPushNotification(invoice);

            util.logger.info("Invoice", ["Invoice created: ", invoice._id]);

            reply(invoice);

        });
    }
};

function sendPushNotification(invoice) {

    db.customer.findById(invoice.customer_id).lean().exec(function(err, customer) {
        if (!(customer.gcm_id === undefined)) {
            util.gcm.sendGCM(customer.gcm_id, invoice._id);
            return;
        }

        if (!(customer.apn_id === undefined)) {
            util.apn.sendAPN(customer.apn_id, {
                invoice_id: invoice._id
            });
            return;
        }

    });

}

module.exports = new invoiceController();