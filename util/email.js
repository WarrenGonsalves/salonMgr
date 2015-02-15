var nodemailer = require('nodemailer');
var sesTransport = require('nodemailer-ses-transport');
var logger = require('./logger');

var SupportEmailId = process.env.SUPPORT_EMAIL_ID || "hands-support@handsforhome.com";
var SupportDistEmail = process.env.DIST_EMAIL_ID || "email.naikparag@gmail.com";

// var transporter = nodemailer.createTransport(sesTransport({
//     accessKeyId: 'AKIAI35TGSKIAFGVQFVQ',
//     secretAccessKey: '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',
//     rateLimit: 5
// }));
// 
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'hands.transform@gmail.com',
        pass: 'hands@123'
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
            console.log('Message sent: ' + info.response);
        }
    });
}

module.exports.sendFeedback = function(feedback) {
    logger.info("Email Notification", ["Feedback", feedback]);

    var feedbackHtmlMsg = "customer_id: " + feedback.customer_id + "<br>" + feedback.text;
    this.sendMail(SupportEmailId, SupportDistEmail, "Feedback from " + feedback.customer_id, feedbackHtmlMsg);
}

module.exports.sendNewSpecialistReferral = function(name, phone, customer_id) {
    logger.info("Email Notification", ["New Spec Referral", name, phone, customer_id]);

    var referralHtmlMsg = "Specialist Name: " + name + "<br>" + "Specialist Phone: " + phone + "<br>" + "Referred by customer: " + customer_id;
    this.sendMail(SupportEmailId, SupportDistEmail, "New Specialist Referral " + name,  referralHtmlMsg);
}

module.exports.sendBookingConfirmation = function(customer, job) {

    logger.info("Email Notification", ["Booking Confirmation", customer, job]);

    var bookingHtmlMsg = job.cust_name + ", " + "your booking has been confirmed.";
    this.sendMail(SupportEmailId, customer.email, "Hands Booking Confirmation", bookingHtmlMsg);
    this.sendMail(SupportEmailId, SupportDistEmail, "Hands Booking - for support team", "CUSTOMER - " + JSON.stringify(customer) + " JOB - " + JSON.stringify(job));
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