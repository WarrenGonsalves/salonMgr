var logger = require('./logger');
var request = require('request');
var _ = require('underscore');
var paytmChecksum = require('./paytm/checksum');

var PAYTM_CHECKSUM_KEY = '3&GKd!SjeRf9rYPa';
var PAYTM_MERCHANT_ID = 'Handsf55807645643291';

var PAYTM_POST_DEFAULTS = {
    REQUEST_TYPE: 'DEFAULT',
    MID: PAYTM_MERCHANT_ID,
    CHANNEL_ID: 'WEB',
    INDUSTRY_TYPE_ID: 'Retail124',
    WEBSITE: 'adplweb',
    THEME: 'merchant',
    CHECKSUMHASH: ''
}

module.exports.getPaytmPost = function transaction(amount, tnx_id, job, channel_id, cb) {

    var paytmPostData = {
        ORDER_ID: tnx_id,
        CUST_ID: job.cust_id,
        TXN_AMOUNT: amount,
        MOBILE_NO: job.cust_ph,
        EMAIL: job.cust_email,
        ORDER_DETAILS: 'Hands payment for booking #' + job.job_id,
        CHECKSUMHASH: ''
    }

    _.extend(paytmPostData, PAYTM_POST_DEFAULTS);

    if (channel_id == 'WAP') {
        paytmPostData.CHANNEL_ID = 'WAP'
        paytmPostData.WEBSITE = 'adplwap'
    }

    paytmChecksum.genchecksum(paytmPostData, PAYTM_CHECKSUM_KEY, function(err, checksum) {
        if (err) {
            console.log(err);
            cb(err);
        }
        console.log(checksum);
        console.log(paytmChecksum.verifychecksum(checksum, PAYTM_CHECKSUM_KEY));

        cb(null, checksum);
    });
};

module.exports.checksumGenerator = function gen(paytmParams, cb) {

    paytmChecksum.genchecksum(paytmParams, PAYTM_CHECKSUM_KEY, function(err, checksum) {
        if (err) {
            console.log(err);
            cb(err);
        }

        console.log(checksum);
        console.log(paytmChecksum.verifychecksum(checksum, PAYTM_CHECKSUM_KEY));

        var paytmPostParams = {}
        paytmPostParams.CHECKSUMHASH = checksum.CHECKSUMHASH
        paytmPostParams.ORDER_ID = checksum.ORDER_ID
        paytmPostParams.payt_STATUS = 1

        cb(null, paytmPostParams);
    });
};

module.exports.validateChecksum = function validate(paytmParams, cb) {

    if (paytmChecksum.verifychecksum(paytmParams, PAYTM_CHECKSUM_KEY)) {
        paytmParams.IS_CHECKSUM_VALID = 'Y'
    } else {
        paytmParams.IS_CHECKSUM_VALID = 'N'
    }

    console.log("verify checksum", paytmParams);

    cb(null, paytmParams);

};