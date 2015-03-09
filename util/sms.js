var logger = require('./logger');
var request = require('request');
var config = require("../config/constants")

var TAG = "Send SMS"

var EXOTEL_SID = "alsodigital"
var EXOTEL_TOKEN = "2bb41cad024062adc1f9136a4fabcdf28e93b8dc"
var CUSTOMER_SERVICE_PHONE = "9920251667"

module.exports.sendSMS = function sendSMS(to, body) {
    var exotelApi = "https://" + EXOTEL_SID + ":" + EXOTEL_TOKEN + "@twilix.exotel.in/v1/Accounts/" + EXOTEL_SID + "/Sms/send"

    if (config.env != 'prod') {
        logger.info(TAG, "skip sms for non prod env");
        return;
    }

    request.post(exotelApi, {
            form: {
                From: "02233814263",
                To: to,
                Body: body
            }
        },
        function(err, response, body) {

            if (err) {
                console.log(err);
            }

            if (!err && response.statusCode == 200) {
                console.log(body);
            }
        }
    );
}

module.exports.sendOTP = function(phone, otp, customername) {

    logger.info(TAG, ["SMS OTP", phone]);

    var smsBody = "Hello, " + customername + ", your One-Time Password is " + otp + " . Welcome aboard. We're all hands for you!"

    this.sendSMS(phone, smsBody);

}

module.exports.sendBookingConfirmation = function(phone, job, customername) {

    logger.info(TAG, ["SMS Booking Confirmation", phone, job]);

    var smsBody = "Hello, " + customername + ". Thank you for booking " + job.specialist_name + "(" + job.specialist_category + "). Your booking confirmation is " + job.job_id + "." +
        " Please call \"hands\" customer service at " + CUSTOMER_SERVICE_PHONE + " if there are any issues."

    this.sendSMS(phone, smsBody);
}

module.exports.notifySpecialistNewBooking = function(job) {
    logger.info(TAG, ["SMS Booking - notification to specialist", job]);

    var smsBody = "Hello, " + job.specialist_name + ", New booking from \"hands\". Customer name - " + job.cust_name + ", customer phone # - " + job.cust_ph + " . Please call customer within 5 minutes to confirm meeting timings."

    // TODO  replace viveks number with job.specialist_ph
    //this.sendSMS("9833789536", smsBody);
    this.sendSMS("9833789536", smsBody);
    this.sendSMS(job.specialist_ph, smsBody);
}