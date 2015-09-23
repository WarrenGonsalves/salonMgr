var nodemailer = require('nodemailer');
var sesTransport = require('nodemailer-ses-transport');
var smtpTransport = require('nodemailer-smtp-transport');
var logger = require('./logger');
var formatter = require('./formatter');
var _ = require('underscore');

var SupportEmailId = process.env.SUPPORT_EMAIL_ID || "vivek@sassystudios.in";
var SupportDistEmail = process.env.DIST_EMAIL_ID || "ops@sassystudios.in";

var EMAIL_FOOTER = "<br><br>Please feel free to call Sassy customer service at 7506750700 anytime if you have any questions.<br><br>Regards<br>Vivek"

// var transporter = nodemailer.createTransport(sesTransport({
//     accessKeyId: 'AKIAI35TGSKIAFGVQFVQ',
//     secretAccessKey: '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',
//     rateLimit: 5
// }));
// 
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'vivek@sassystudios.in',
        pass: 'Vivek1023'
    }
});
/*
var transporter = nodemailer.createTransport(smtpTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
        user: 'vivek@sassy.co.in',
        pass: 'Vivek1023'
    }
}));
*/
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

module.exports.sendFeedback = function(feedback, customer) {
    logger.info("Email Notification", ["Feedback", feedback]);

    var feedbackHtmlMsg = "Customer - " + customer.name + " has sent following feedback.<br><hr>" + feedback.text;
    this.sendMail(SupportEmailId, SupportDistEmail, "Customer Feedback - " + customer.name, feedbackHtmlMsg);
}

module.exports.sendNewSpecialistReferral = function(name, phone, category, customer_id) {
    logger.info("Email Notification", ["New Spec Referral", name, phone, category, customer_id]);

    var referralHtmlMsg = "Specialist Name: " + name + " - " + category + "<br>" + "Specialist Phone: " + phone + "<br>" + "Referred by customer: " + customer_id;
    this.sendMail(SupportEmailId, SupportDistEmail, "New Specialist Referral " + name, referralHtmlMsg);
}

module.exports.sendBookingConfirmation = function(customer, booking) {

    logger.info("Email Notification", ["Booking Confirmation", customer, booking]);
    var bookedServices = "";
    for (var i = 0; i < booking.services.length; i++) {
        bookedServices = bookedServices + booking.services[i].title + ", ";
    };
    var bookingHtmlMsg = "Hello " + booking.cust_id.name + ", " + "your booking has been confirmed.";
    bookingHtmlMsg += "<br><br> Studio name - " + booking.studio_id.name + " - " + bookedServices;
    bookingHtmlMsg += "<br>Phone# - " + booking.studio_id.ph;
    bookingHtmlMsg += EMAIL_FOOTER;

    this.sendMail(SupportEmailId, customer.email, "Sassy booking confirmation " + booking.booking_no, bookingHtmlMsg);
    this.sendMail(SupportEmailId, SupportDistEmail, "Sassy Booking - Support - " + customer.name, bookingHtmlMsg + "<br><hr><br>CUSTOMER - " + formatter.toHTML(customer) + "<br><br> booking - " + formatter.toHTML(booking));
}

module.exports.sendContractNotification = function(contract, customer) {

    logger.info("Email Notification", ["New Contract", contract]);

    var HtmlBody = "Contract details <br>" + formatter.toHTML(contract) + "<br><hr><br>" + "Customer details<br>" + formatter.toHTML(customer);
    this.sendMail(SupportEmailId, SupportDistEmail, "New Contract", HtmlBody);
}


module.exports.sendStudioFeedback = function(feedback) {

    logger.info("Email Notification", ["Feedback ", feedback]);

    var HtmlBody = "feedback details <br>" 
                + "customer_name : " + feedback.customer_name + "<br>"
                + "phone_number : " + feedback.phone_number + "<br>"
                + "customer_email : " + feedback.customer_email + "<br>"
                + "How did you make your booking? : " + feedback.question1 + "<br>"
                + "Did you have any issues selecting the service you required? : " + feedback.question2 + "<br>"
                + "Did you get a reminder for your appointment? : " + feedback.question3 + "<br>"
                + "Did you have to wait at the salon? : " + feedback.question4 + "<br>"
                + "What would you change about the practitioner who served you? : " + feedback.question5 + "<br>"
                + "Did you think the service was priced fair? : " + feedback.question6 + "<br><br><br>"
                + "Category selected  by customer: " + feedback.category + "<br>"
                + "practitioner name: " + feedback.practitioner + "<br>"
                + "service : " + feedback.service + "<br>"
                + "price : " + feedback.price + "<br>";

    this.sendMail(SupportEmailId, SupportDistEmail, "New feedback", HtmlBody);

}

module.exports.sendStatusUpdate = function(job) {

    logger.info("Email Notification", ["Job Status", job]);
    var bookingHtmlSubject;
    var bookingHtmlMsg;

    if (job.status == "Accepted") {
        bookingHtmlSubject = "Hands booking " + job.job_id + " is Accepted";
        bookingHtmlMsg = "Hello " + job.cust_name + ", " + job.specialist_name + " has accepted your booking - " + job.job_id + ".";
        bookingHtmlMsg += EMAIL_FOOTER;
    }

    if (job.status == "Estimated") {
        bookingHtmlSubject = "Hands booking " + job.job_id + " Estimated";
        bookingHtmlMsg = "Hello, " + job.cust_name + ", " + job.specialist_name + " has submitted an estimation for your booking " + job.job_id + ".";
        bookingHtmlMsg += "<br><br>Number of days - " + job.estimate + " days";
        bookingHtmlMsg += "<br>Total Fees (approx) - ₹ " + job.estimate_cost;
        bookingHtmlMsg += EMAIL_FOOTER;

        this.sendMail(SupportEmailId, job.cust_email, bookingHtmlSubject, bookingHtmlMsg);
    }

    // use seperate function for sending invoice email as it required invoice data

    if (job.status == "Finished") {
        bookingHtmlSubject = "Hands booking " + job.job_id + " completed";
        bookingHtmlMsg = "Hello, " + job.cust_name + ", " + job.specialist_name + " has indicated that the job is now complete. "
        bookingHtmlMsg += "Please use hands app to provide valuable feedback so we can improve the quality of service providers.";

        bookingHtmlMsg += EMAIL_FOOTER;

        this.sendMail(SupportEmailId, job.cust_email, bookingHtmlSubject, bookingHtmlMsg);
    }

    // using sendMail for each status for more control.
    //this.sendMail(SupportEmailId, job.cust_email, bookingHtmlSubject, bookingHtmlMsg);
    this.sendMail(SupportEmailId, SupportDistEmail, bookingHtmlSubject, bookingHtmlMsg);
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

    this.sendMail(SupportEmailId, SupportDistEmail, bookingHtmlSubject, bookingHtmlMsg);
}