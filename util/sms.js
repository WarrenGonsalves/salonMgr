var logger = require('./logger');
var request = require('request');
var config = require("../config/constants");

var TAG = "Send SMS";

var EXOTEL_SID = "alsodigital";
var EXOTEL_TOKEN = "2bb41cad024062adc1f9136a4fabcdf28e93b8dc";
var CUSTOMER_SERVICE_PHONE = "7506750700";


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
                From: "02233814032",
                To: to,
                Body: body,
                Priority: sms_priority
            }
        },
        function(err, response, body) {

            if (err) {
                console.log(err);
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


module.exports.sendBookingConfirmation = function(phone, booking, customername, coupon) {

    logger.info(TAG, ["SMS Booking Confirmation", phone, booking]);
    var bookedServices = "";
    for (var i = 0; i < booking.services.length; i++) {
        bookedServices = bookedServices + booking.services[i].title + ", ";
    };
   
   
    var smsBody =   "Hello " + customername + ". Thank you for booking at Sassy Studios, your booking id is " + booking.booking_no 
                    + ". Price " + booking.price + ". Discount coupon - " + coupon + ". Please show this at the reception to avail the service. Please call Sassy Studios Care @ " 
                    + CUSTOMER_SERVICE_PHONE + " if there are any concerns.";

    console.log("CUSTOMER SMS");
    console.log(smsBody);
    this.sendSMS(phone, smsBody);
}

module.exports.sendStudioLeadToRequest = function(name, phone) {

    logger.info(TAG, ["sendStudioLeadToRequest", name, phone]);

    var smsBody = "Hello,"+ name + ". Thank you for sharing your phone number. Our customer service will get back to you in two days. Have a sassy week. "

    this.sendSMS(phone, smsBody);
}

module.exports.sendStudioLeadToCustomerService = function(name, phone) {

    logger.info(TAG, ["sendStudioLeadToCustomerService", name, phone]);

   
    var smsBody = "Hello, customer service . We have a new lead for studio from  the web. Name : "+ name  +". Phone #: "+ phone

    this.sendSMS(CUSTOMER_SERVICE_PHONE, smsBody);
}

module.exports.sendThankYouForFeedback = function(name, phone) {

    logger.info(TAG, ["sendStudioLeadToRequest", name, phone]);

    var smsBody = "Hello,"+ name + ". Thank you for sharing feedback and helping us improve. Our customer service will call you to resolve any issues. Have a great day ahead. Sassy Studios - whatsapp 7506 7507 00.  "

    this.sendSMS(phone, smsBody);
}

module.exports.notifySpecialistNewBooking = function(booking) {
    logger.info(TAG, ["SMS Booking - notification to specialist", booking]);

    var smsBody = "Hello, " + booking.studio_id.name + ", New booking from \"Sassy\". Customer - " 
                    + booking.cust_id.name + ", Phone # - " + booking.cust_id.ph + " . Thank you."
    console.log("STUDIO SMS");
    console.log(smsBody);
    // TODO  replace viveks number with job.specialist_ph
    // //this.sendSMS("9833789536", smsBody);
    // if (config.env == 'prod') {
        this.sendSMS(CUSTOMER_SERVICE_PHONE, smsBody);
        // this.sendSMS(booking.studio_id.phone, smsBody);
    // } else {
        // logger.info(TAG, "skip sms for non prod env");
    // }
}