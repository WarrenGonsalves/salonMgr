var logger = require('./logger');
var request = require('request');

module.exports.testTransaction = function transaction(orderId, customerId, amount) {
    var paytmApi = "https://pguat.paytm.com/oltp-web/processTransaction?orderid=" + orderId;

    request.post(paytmApi, {
            form: {
                REQUEST_TYPE: 'DEFAULT',
                MID: 'ALSOdi44238291101945',
                ORDER_ID: orderId,
                CUST_ID: customerId,
                TXN_AMOUNT: amount,
                CHANNEL_ID: 'WEB',
                INDUSTRY_TYPE_ID: 'Retail',
                WEBSITE: 'adplweb'
            }
        },
        function(err, response, body) {
            if (!err && response.statusCode == 200) {
                console.log(body)
            }
        }
    );
}