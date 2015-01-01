var db = require("../db");
var util = require("../util");
var _ = require('underscore');

// Controller
function invoiceController() {};

invoiceController.prototype.getConfigHandler = {
    handler: function(request, reply) {
        console.log(__filename + ' query param ' + JSON.stringify(request.query));

        var query_param = {};

        if (!(request.query.id === undefined)) {
            query_param['_id'] = request.query.id;
        }

        db.invoice.find(query_param).populate('job').populate('specialist').lean().exec(function(err, invoiceList) {
            if (err) {
                reply(err).code(510);
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

        console.log("payload: ", request.payload);

        if (request.payload.job_id === undefined) {
            reply("Provide valid job id.").code(510);
        }

        if (request.payload.line_item === undefined) {
            reply("Provide valid invoice line items.").code(510);
        }

        if (request.payload.total === undefined) {
            reply("Provide valid invoice total.").code(510);
        }

        db.job.findById(request.payload.job_id).lean().exec(function(err, job) {
            if (err) {
                reply(err).code(510);
                return;
            }

            if (job === null) {
                reply("job not found for id: " + request.payload.job_id).code(510);
                return;
            }

            var invoice = new db.invoice();
            invoice.customer_id = job.cust_id;
            invoice.job = job._id;
            invoice.specialist = job.specialist_id;

            _.each(request.payload.line_item, function(line_item) {
                console.log("line", line_item);
                var line_item_obj = JSON.stringify(eval('(' + line_item + ')'));
                console.log(line_item_obj);
                invoice.line_items.push(JSON.parse(line_item_obj));
            });

            invoice.total = request.payload.total;
            invoice.save()

            sendPushNotification(invoice);

            console.log("Invoice created: " + invoice._id);

            reply(invoice);

        });
    }
};

function sendPushNotification(invoice) {

    db.customer.findById(invoice.customer_id).lean().exec(function(err, customer) {
        if (!(customer.gcm_id === undefined)) {
            util.gcm.sendGCM(customer.gcm_id, {
                invoice_id: invoice._id
            });
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