var nodemailer = require('nodemailer');
var sesTransport = require('nodemailer-ses-transport');
var logger = require('./logger');

var SupportEmailId = process.env.SUPPORT_EMAIL_ID || "hands-support@handsforhome.com";

var transporter = nodemailer.createTransport(sesTransport({
    accessKeyId: 'AKIAI35TGSKIAFGVQFVQ',
    secretAccessKey: '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',
    rateLimit: 5
}));

module.exports.sendMail = function sendMail(fromAddr, toAddr, subject, text) {

    console.log("sending email to", toAddr)
    transporter.sendMail({
        from: fromAddr,
        to: toAddr,
        subject: subject,
        html: text
    });
}

module.exports.sendBookingConfirmation = function(customer, job) {

    logger.info("Email Notification", ["Booking Confirmation", customer, job]);

    var bookingHtmlMsg = job.cust_name + ", " + "your booking has been confirmed.";
    this.sendMail(SupportEmailId, customer.email, "Hands Booking Confirmation", bookingHtmlMsg);
}

module.exports.sendStatusUpdate = function(job) {

    logger.info("Email Notification", ["Job Status", job]);
    var bookingHtmlSubject;
    var bookingHtmlMsg;

    if (job.status == "Accepted") {
        bookingHtmlSubject = "Hands Booking Acknowldegement";
        bookingHtmlMsg = job.specialist_name + " has acknowledged your request.";
    }

    if (job.status == "Estimated") {
        bookingHtmlSubject = "Estimate for your Booking";
        bookingHtmlMsg = "Estimate for your Booking ref# " + job._id + " has been generated and sent to your Hands app.";
    }

    if (job.status == "Invoiced") {
        bookingHtmlSubject = "Invoice for your booking";
        bookingHtmlMsg = "Invoice for your Booking ref# " + job._id + " has been generated and sent to your Hands app.";
    }

    if (job.status == "Finished") {
        bookingHtmlSubject = "Thank you for using Hands";
        bookingHtmlMsg = "Thank you for using Hands. Please use your Hands app to provide valuable feedback for " + job.specialist_name;
    }
    
    this.sendMail(SupportEmailId, job.cust_email, bookingHtmlSubject, bookingHtmlMsg);
}