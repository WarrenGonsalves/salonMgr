var logger = require('./logger');
var request = require('request');
var _ = require('underscore');
var paytmChecksum = require('./paytm/checksum');

var PAYTM_CHECKSUM_KEY = 'kgTCLAvHnjmPcIva';
var PAYTM_MERCHANT_ID = 'ALSOdi44238291101945';

var PAYTM_POST_DEFAULTS = {
    REQUEST_TYPE: 'DEFAULT',
    MID: PAYTM_MERCHANT_ID,
    CHANNEL_ID: 'WEB',
    INDUSTRY_TYPE_ID: 'Retail',
    WEBSITE: 'adplweb',
    THEME: 'merchant',
    CHECKSUMHASH: ''
}

module.exports.testTransaction = function transaction(orderId, customerId, amount, cb) {
    var paytmApi = "https://pguat.paytm.com/oltp-web/processTransaction?orderid=" + orderId;

    postdata = {
        form: {
            REQUEST_TYPE: 'DEFAULT',
            MID: PAYTM_MERCHANT_ID,
            ORDER_ID: orderId,
            CUST_ID: customerId,
            TXN_AMOUNT: amount,
            CHANNEL_ID: 'WEB',
            INDUSTRY_TYPE_ID: 'Retail',
            WEBSITE: 'adplweb',
            MOBILE_NO: '9920251667',
            EMAIL: 'email.naikparag@gmail.com',
            ORDER_DETAILS: 'Test transaction for hawaii',
            CHECKSUMHASH: ''
        }
    }

    paytmChecksum.genchecksum(postdata.form, PAYTM_CHECKSUM_KEY, function(err, checksum) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(checksum);
        console.log(paytmChecksum.verifychecksum(checksum, PAYTM_CHECKSUM_KEY));

        request.post(paytmApi, {
                form: checksum,
                followAllRedirects: true
            },
            function(err, response, body) {

                console.log(" --------- yaaay status codes ----", response.statusCode);

                if (err) {
                    console.log("paytm post error - ", err);
                    cb(err);
                }

                if (!err && response.statusCode == 200) {
                    console.log("paytm response", response);
                    //console.log("paytm body", body);
                    cb(null, data);
                }

                cb(null, "ok");
            }
        );

    });
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

    // dont add order_detail parameter as it will fail on mobile.
    //paytmParams.ORDER_DETAILS = "payment for hands"

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
        // paytmPostParams.ORDER_DETAILS = "payment for hands"
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