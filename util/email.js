var nodemailer = require('nodemailer');
var sesTransport = require('nodemailer-ses-transport');
var logger = require('./logger');
var formatter = require('./formatter');
var _ = require('underscore');

// var SupportEmailId = process.env.SUPPORT_EMAIL_ID || "hands-support@handsforhome.com";
var SupportEmailId = process.env.DIST_EMAIL_ID || "email.naikparag@gmail.com";
var SupportBookingEmailId = process.env.SUPPORT_BOOKING_EMAIL_ID || "email.naikparag@gmail.com";

var EMAIL_SUPPORT_DETAILS = "<br><br>Please use hands app <a href='http://get.handsforhome.com'>get.handsforhome.com</a> or";
EMAIL_SUPPORT_DETAILS += " email us at <a href='mailto:customerfirst@handsforhome.com'>customerfirst@handsforhome.com</a> to provide feedback so we can improve the quality for service providers.";

var EMAIL_FOOTER = "<br><br>Please feel free to call hands customer service at 8080467567 anytime if you have any questions.<br><br>Regards<br>Paul"

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'customerfirst@handsforhome.com',
        pass: 'Qwer!234'
    }
});

module.exports.sendMail = function sendMail(fromAddr, toAddr, subject, text) {

    console.log("sending email to", toAddr)
    transporter.sendMail({
        from: fromAddr,
        to: toAddr,
        subject: subject,
        html: text
    }, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            //console.log('Message sent: ' + info.response);
        }
    });
}

module.exports.sendFeedback = function(feedback, customer) {
    logger.info("Email Notification", ["Feedback", feedback]);

    var feedbackHtmlMsg = "Customer - " + customer.name + " has sent following feedback.<br><hr>" + feedback.text;
    this.sendMail(SupportEmailId, SupportEmailId, "Customer Feedback - " + customer.name, feedbackHtmlMsg);
}

module.exports.sendNewSpecialistReferral = function(name, phone, category, customer_id) {
    logger.info("Email Notification", ["New Spec Referral", name, phone, category, customer_id]);

    var referralHtmlMsg = "Specialist Name: " + name + " - " + category + "<br>" + "Specialist Phone: " + phone + "<br>" + "Referred by customer: " + customer_id;
    this.sendMail(SupportEmailId, SupportEmailId, "New Specialist Referral " + name, referralHtmlMsg);
}

module.exports.sendBookingConfirmation = function(customer, job) {

    logger.info("Email Notification", ["Booking Confirmation", customer, job]);

    var bookingHtmlMsg = "Hello " + job.cust_name + ", " + "your booking has been confirmed.";
    bookingHtmlMsg += "<br><br> Studio name - " + job.specialist_name + " - " + job.service.category;
    bookingHtmlMsg += "<br>Phone# - " + job.specialist_ph;
    bookingHtmlMsg += EMAIL_FOOTER;

<<<<<<< HEAD
    this.sendMail(SupportEmailId, customer.email, "Hands booking confirmation " + job.job_id, bookingHtmlMsg);
    this.sendMail(SupportEmailId, SupportBookingEmailId, "Hands booking - Support - " + customer.name, bookingHtmlMsg + "<br><hr><br>CUSTOMER - " + formatter.toHTML(customer) + "<br><br> JOB - " + formatter.toHTML(job));
=======
    this.sendMail(SupportEmailId, customer.email, "Sassy booking confirmation " + job.job_id, bookingHtmlMsg);
    this.sendMail(SupportEmailId, SupportDistEmail, "Sassy Booking - Support - " + customer.name, bookingHtmlMsg + "<br><hr><br>CUSTOMER - " + formatter.toHTML(customer) + "<br><br> JOB - " + formatter.toHTML(job));
>>>>>>> 26bf8858c57c88ab34ff16a23f9d41f9f43974c2
}

module.exports.sendContractNotification = function(contract, customer) {

    logger.info("Email Notification", ["New Contract", contract]);

    var HtmlBody = "Contract details <br>" + formatter.toHTML(contract) + "<br><hr><br>" + "Customer details<br>" + formatter.toHTML(customer);
    this.sendMail(SupportEmailId, SupportEmailId, "New Contract", HtmlBody);
}

module.exports.sendStatusUpdate = function(job) {

    logger.info("Email Notification", ["Job Status", job]);
    var bookingHtmlSubject;
    var bookingHtmlMsg;

    if (job.status == "Accepted") {
        bookingHtmlSubject = "Hands booking " + job.job_id + " is Accepted";
        bookingHtmlMsg = "Hello " + job.cust_name + ", " + job.specialist_name + " has accepted your booking - " + job.job_id + ".";
        bookingHtmlMsg += EMAIL_FOOTER;

        this.sendMail(SupportEmailId, SupportEmailId, bookingHtmlSubject, bookingHtmlMsg);
    }

    if (job.status == "Estimated") {
        bookingHtmlSubject = "Hands booking " + job.job_id + " Estimated";
        bookingHtmlMsg = "Hello, " + job.cust_name + ", " + job.specialist_name + " has submitted an estimation for your booking " + job.job_id + ".";
        bookingHtmlMsg += "<br><br>Number of days - " + job.estimate + " days";
        bookingHtmlMsg += "<br>Total Fees (approx) - ₹ " + job.estimate_cost;
        bookingHtmlMsg += EMAIL_FOOTER;

        this.sendMail(SupportEmailId, job.cust_email, bookingHtmlSubject, bookingHtmlMsg);
        this.sendMail(SupportEmailId, SupportEmailId, bookingHtmlSubject, bookingHtmlMsg);
    }

    // use seperate function for sending invoice email as it required invoice data

    if (job.status == "Finished") {
        bookingHtmlSubject = "Hands booking " + job.job_id + " completed";
        bookingHtmlMsg = "Hello, " + job.cust_name + ", " + job.specialist_name + " has indicated that the job is now complete."
        bookingHtmlMsg += EMAIL_SUPPORT_DETAILS;
        bookingHtmlMsg += EMAIL_FOOTER;

        this.sendMail(SupportEmailId, job.cust_email, bookingHtmlSubject, bookingHtmlMsg);
        this.sendMail(SupportEmailId, SupportEmailId, bookingHtmlSubject, bookingHtmlMsg);
    }

    if (job.status == "Cancelled") {
        bookingHtmlSubject = "Hands booking " + job.job_id + " cancelled";
        bookingHtmlMsg = "Hello, " + job.cust_name + ", <br>Your booking " + job.job_id + " has been cancelled.";
        bookingHtmlMsg += EMAIL_SUPPORT_DETAILS;
        bookingHtmlMsg += EMAIL_FOOTER;

        this.sendMail(SupportEmailId, job.cust_email, bookingHtmlSubject, bookingHtmlMsg);
        this.sendMail(SupportEmailId, SupportEmailId, bookingHtmlSubject, bookingHtmlMsg);
    }
}

module.exports.sendInvoiceNotification = function(job, invoice) {

    logger.info("Email Notification", ["Job Status", job]);
    var bookingHtmlSubject;
    var bookingHtmlMsg;

    if (job.status == "Invoiced") {
        bookingHtmlSubject = "Hands booking " + job.job_id + " Invoice";
        bookingHtmlMsg = "Hello, " + job.cust_name + ", " + job.specialist_name + " has submitted an invoice for your booking " + job.job_id + " and it has been sent to your hands app as well. ";
        bookingHtmlMsg += "<br>";

        _.each(invoice.line_items, function(lineItem) {
            bookingHtmlMsg += "<br>" + lineItem.item + " -  ₹ " + lineItem.amount;
        });

        bookingHtmlMsg += EMAIL_FOOTER;

        this.sendMail(SupportEmailId, job.cust_email, bookingHtmlSubject, bookingHtmlMsg);
    }

    this.sendMail(SupportEmailId, SupportEmailId, bookingHtmlSubject, bookingHtmlMsg);
}