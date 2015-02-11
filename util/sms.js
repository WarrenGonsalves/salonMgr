var logger = require('./logger');
var request = require('request');

var TAG = "Send SMS"

var EXOTEL_SID = "alsodigital"
var EXOTEL_TOKEN = "2bb41cad024062adc1f9136a4fabcdf28e93b8dc"

module.exports.sendSMS = function sendSMS(to, body) {
    var exotelApi = "https://" + EXOTEL_SID + ":" + EXOTEL_TOKEN + "@twilix.exotel.in/v1/Accounts/" + EXOTEL_SID + "/Sms/send"
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