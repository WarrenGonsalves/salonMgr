var logger = require('./logger');
var request = require('request');
var config = require("../config/constants")

var TAG = "Send SMS"

var EXOTEL_SID = "alsodigital"
var EXOTEL_TOKEN = "2bb41cad024062adc1f9136a4fabcdf28e93b8dc"

module.exports.sendSMS = function sendSMS(to, body) {
    var exotelApi = "https://" + EXOTEL_SID + ":" + EXOTEL_TOKEN + "@twilix.exotel.in/v1/Accounts/" + EXOTEL_SID + "/Sms/send"

    if (config.env != 'prod') {
        logger.info(TAG, "skip sms for non prod env");
        //return;
    }

    request.post(exotelApi, {
            form: {
                From: "02233814263",
                To: to,
                Body: body
            }
        },
        function(err, response, body) {
            if (!err && response.statusCode == 200) {
                console.log(body)
            }
        }
    );
}

module.exports.sendOTP = function(phone, otp) {

    logger.info(TAG, ["SMS OTP", phone]);

    var smsBody = "Hi " + otp + " OTP ,Thank you for registering; Your account has been activated"
    this.sendSMS(phone, smsBody);
}

module.exports.sendBookingConfirmation = function(phone, job) {

    logger.info(TAG, ["SMS Booking Confirmation", phone, job]);

    var smsBody = "Hi " + job._id + " Booking ,Thank you for registering; Your account has been activated"
    this.sendSMS(phone, smsBody);
}

module.exports.notifySpecialistNewBooking = function(job) {
    logger.info(TAG, ["SMS Booking - notification to specialist", job]);

    var smsBody = "Hi " + job.specialist_name + ", new job " + job.cust_name + "-" + job.cust_ph + " ,Thank you for registering; Your account has been activated"
    this.sendSMS(job.specialist_ph, smsBody);
}