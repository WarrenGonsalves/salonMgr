var nodemailer = require('nodemailer');
var sesTransport = require('nodemailer-ses-transport');
var logger = require('./logger');
var formatter = require('./formatter');

var SupportEmailId = process.env.SUPPORT_EMAIL_ID || "hands-support@handsforhome.com";
var SupportDistEmail = process.env.DIST_EMAIL_ID || "email.naikparag@gmail.com";

var EMAIL_FOOTER = "<br><br>Please feel free to call hands customer service at 9833789536 anytime if you have any questions.<br><br>Regards<br>Paul"

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

module.exports.sendNewSpecialistReferral = function(name, phone, category, customer_id) {
    logger.info("Email Notification", ["New Spec Referral", name, phone, category, customer_id]);

    var referralHtmlMsg = "Specialist Name: " + name + " - " + category + "<br>" + "Specialist Phone: " + phone + "<br>" + "Referred by customer: " + customer_id;
    this.sendMail(SupportEmailId, SupportDistEmail, "New Specialist Referral " + name, referralHtmlMsg);
}

module.exports.sendBookingConfirmation = function(customer, job) {

    logger.info("Email Notification", ["Booking Confirmation", customer, job]);

    var bookingHtmlMsg = "Hello " + job.cust_name + ", " + "your booking has been confirmed.";
    bookingHtmlMsg += "<br><br> Service provider name - " + job.specialist_name + " - " + job.specialist_category;
    bookingHtmlMsg += "<br>Phone# - " + job.specialist_ph;
    bookingHtmlMsg += EMAIL_FOOTER;

    this.sendMail(SupportEmailId, customer.email, "Hands booking confirmation " + job.job_id, bookingHtmlMsg);
    this.sendMail(SupportEmailId, SupportDistEmail, "Hands Booking - Support - " + customer.name, bookingHtmlMsg + "<br><hr><br>CUSTOMER - " + formatter.toHTML(customer) + "<br><br> JOB - " + formatter.toHTML(job));
}

module.exports.sendContractNotification = function(contract, customer) {

    logger.info("Email Notification", ["New Contract", contract]);

    var HtmlBody = "Contract details <br>" + formatter.toHTML(contract) + "<br><hr><br>" + "Customer details<br>" + formatter.toHTML(customer);
    this.sendMail(SupportEmailId, SupportDistEmail, "New Contract", HtmlBody);
}

module.exports.sendStatusUpdate = function(job) {

    logger.info("Email Notification", ["Job Status", job]);
    var bookingHtmlSubject;
    var bookingHtmlMsg;

    if (job.status == "Accepted") {
        bookingHtmlSubject = "Hands Booking " + job.job_id + " is Accepted";
        bookingHtmlMsg = "Hello " + job.cust_name + ", " + job.specialist_name + " has accepted your booking - " + job.job_id + ".";
        bookingHtmlMsg += EMAIL_FOOTER;
    }

    if (job.status == "Estimated") {
        bookingHtmlSubject = "Estimate for your Booking #" + job.job_id;
        bookingHtmlMsg = "Hi, " + job.cust_name + "<br>Estimate for your Booking ref# " + job.job_id + " is as follows";
        bookingHtmlMsg += "<br><br>Duration: " + job.estimate;
        bookingHtmlMsg += "<br>Cost (approx): ₹" + job.estimate_cost;
        bookingHtmlMsg += EMAIL_FOOTER;

        this.sendMail(SupportEmailId, job.cust_email, bookingHtmlSubject, bookingHtmlMsg);
    }

    if (job.status == "Invoiced") {
        bookingHtmlSubject = "Invoice for your booking";
        bookingHtmlMsg = "Invoice for your Booking ref# " + job.job_id + " has been generated and sent to your Hands app.";

        this.sendMail(SupportEmailId, job.cust_email, bookingHtmlSubject, bookingHtmlMsg);
    }

    if (job.status == "Finished") {
        bookingHtmlSubject = "Thank you for using Hands";
        bookingHtmlMsg = "Thank you for using Hands. Please use your Hands app to provide valuable feedback for " + job.specialist_name;

        this.sendMail(SupportEmailId, job.cust_email, bookingHtmlSubject, bookingHtmlMsg);
    }

    // using sendMail for each status for more control.
    //this.sendMail(SupportEmailId, job.cust_email, bookingHtmlSubject, bookingHtmlMsg);
    this.sendMail(SupportEmailId, SupportDistEmail, bookingHtmlSubject, bookingHtmlMsg);
}