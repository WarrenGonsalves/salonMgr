var logger = require('./logger');
var request = require('request');
var config = require("../config/constants");
var formatter = require('./formatter');
var _ = require("underscore");

var TAG = "Send SMS"

var EXOTEL_SID = "alsodigital"
var EXOTEL_TOKEN = "2bb41cad024062adc1f9136a4fabcdf28e93b8dc"
var CUSTOMER_SERVICE_PHONE = "8080467567"

module.exports.sendSMS = function sendSMS(to, body, priority) {
    var exotelApi = "https://" + EXOTEL_SID + ":" + EXOTEL_TOKEN + "@twilix.exotel.in/v1/Accounts/" + EXOTEL_SID + "/Sms/send"

    if (config.env != 'prod') {
        // logger.info(TAG, "skip sms for non prod env");
        // return;
    }

    var sms_priority = priority || "normal";

    console.log(TAG, sms_priority);

    request.post(exotelApi, {
            form: {
                From: "02233814263",
                To: to,
                Body: body,
                Priority: sms_priority
            }
        },
        function(err, response, body) {

            if (err) {
                console.log(err);
                logger.err(TAG, err);
            }

            if (!err && response.statusCode == 200) {
                logger.info(TAG, body);
                console.log(body);
            }
        }
    );
}

module.exports.sendOTP = function(phone, otp, customername) {

    logger.info(TAG, ["SMS OTP", phone]);

    //var smsBody = "Hello, " + customername + ", your One-Time Password(OTP) is " + otp + " . Welcome aboard. We're all hands for you! :)"
    //
    var smsBody = "Hello, " + customername + " , " + otp + " is your OTP . Welcome aboard. We're all hands for you! :)";

    this.sendSMS(phone, smsBody, "high");

}

module.exports.sendBookingConfirmation = function(job, specialist) {

    logger.info(TAG, ["SMS Booking Confirmation", job]);

    var smsBody = ""
    if (specialist.is_deal == true) {
        logger.info(TAG, ["SMS Booking", "is a deal"])
        smsBody = "Hello, " + job.cust_name + ". Thank you for booking " + job.specialist_category + " service with us. Your booking confirmation is " + job.job_id + ". ";
        smsBody += "You will receive a call within 60 mins to assign a technician to the job. ";
        smsBody += "Please call \"hands\" customer service at 8080467567 if there are any issues. Have a wonderful day."

<<<<<<< HEAD
    } else {
        logger.info(TAG, ["SMS Booking", "is not a deal"])
        smsBody = "Hello, " + job.cust_name + ". Thank you for booking " + job.specialist_category + " service with us. Your booking confirmation is " + job.job_id + ". ";
        smsBody += "We will visit your home on " + formatter.toDisplayDate(job.book_date) + " at " + formatter.toDisplayTimeRange(job.book_date) + " for this service. ";
        smsBody += "Please call \"hands\" customer service at 8080467567 if there are any issues. Have a wonderful day."

    }
=======
    var smsBody = "Hello, " + customername + ". Thank you for booking " + job.specialist_name + "(" + job.service.category + "). Your booking confirmation is " + job.job_id + "." +
        " Please call \"Sassy\" customer service at " + CUSTOMER_SERVICE_PHONE + " if there are any issues."
>>>>>>> 26bf8858c57c88ab34ff16a23f9d41f9f43974c2

    this.sendSMS(job.cust_ph, smsBody);
}

module.exports.notifySpecialistNewBooking = function(job) {
    logger.info(TAG, ["SMS Booking - notification to specialist", job]);

<<<<<<< HEAD
    //var smsBody = "Hello, " + job.specialist_name + ", New booking from \"hands\". Customer - " + job.cust_name + ", Phone # - " + job.cust_ph + " . Thank you."
    var smsBody = "Hello, " + job.specialist_name + ", New booking from \"hands\". Customer - " + job.cust_name + ", Phone # - " + job.cust_ph + " . ";
    smsBody += "Customer address - " + job.cust_addr1 + " " + job.cust_addr_landmark + " , task - " + job.cust_task + ", date - " + formatter.toDisplayDate(job.book_date) + " time - " + formatter.toDisplayTimeRange(job.book_date) + " Thank you."
=======
    var smsBody = "Hello, " + job.specialist_name + ", New booking from \"Sassy\". Customer - " + job.cust_name + ", Phone # - " + job.cust_ph + " . Thank you."
>>>>>>> 26bf8858c57c88ab34ff16a23f9d41f9f43974c2

    // TODO  replace viveks number with job.specialist_ph
    //this.sendSMS("9833789536", smsBody);
    this.sendSMS("9833789536", smsBody);
    this.sendSMS("8080467567", smsBody);
    this.sendSMS(job.specialist_ph, smsBody);
}

module.exports.notifyLaundryBooking = function(job) {

    var total = 0;

    _.each(job.shopify_order.line_items, function(line_item) {
        total += line_item.quantity;
    });

    var smsBody = "Hello, " + job.specialist_name + " picked up " + total + " clothes, total is Rs " + parseInt(job.shopify_order.total_price);
    smsBody += ". For details, please download the hands app from get.handsforhome.com";

    logger.info(TAG, ["SMS Laundry", job.cust_ph, smsBody]);
    this.sendSMS(job.cust_ph, smsBody);
}

module.exports.notifyCustomerOfSpecialistReassignment = function(job) {

    var smsBody = "Hello, " + job.cust_name + ". Your job # " + job.job_id + " has been assigned to " + job.specialist_name + ".  ";
    smsBody += "We will visit your home on " + formatter.toDisplayDate(job.book_date) + " at " + formatter.toDisplayTimeRange(job.book_date) + " for this service. ";
    smsBody += "Please call \"hands\" customer service at 8080467567 if there are any issues. Have a wonderful day."

    logger.info(TAG, ["SMS SPC Reassign", job.cust_ph, smsBody]);
    this.sendSMS(job.cust_ph, smsBody);
    //this.sendSMS("9920251667", smsBody);
}