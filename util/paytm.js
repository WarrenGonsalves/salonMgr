var logger = require('./logger');
var request = require('request');
var paytmChecksum = require('./paytm/checksum');

module.exports.testTransaction = function transaction(orderId, customerId, amount, cb) {
    var paytmApi = "https://pguat.paytm.com/oltp-web/processTransaction?orderid=" + orderId;

    postdata = {
        form: {
            REQUEST_TYPE: 'DEFAULT',
            MID: 'ALSOdi44238291101945',
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

    paytmChecksum.genchecksum(postdata.form, 'kgTCLAvHnjmPcIva', function(err, checksum) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(checksum);
        console.log(paytmChecksum.verifychecksum(checksum, 'kgTCLAvHnjmPcIva'));

        request.post(paytmApi, {
                form: checksum,
                followAllRedirects: true
            },
            function(err, response, body) {

                console.log(" --------- yaaay status codes ----" , response.statusCode);

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

module.exports.getPaytmPost = function transaction(orderId, customerId, amount, cb){

    postdata = {
        form: {
            REQUEST_TYPE: 'DEFAULT',
            MID: 'ALSOdi44238291101945',
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
    
    paytmChecksum.genchecksum(postdata.form, 'kgTCLAvHnjmPcIva', function(err, checksum) {
        if (err) {
            console.log(err);
            cb(err);
        }
        console.log(checksum);
        console.log(paytmChecksum.verifychecksum(checksum, 'kgTCLAvHnjmPcIva'));

        cb(null, checksum);
    });
};





