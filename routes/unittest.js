var BASE_URL = '/test';
var util = require("../util");
// var db = require('./db');

module.exports = function() {
    return [
        /**
         * @api {get} /circles?grouped=true Circles: get all
         * @apiName getCircles
         * @apiGroup Circle
         *
         * @apiExample Example usage:
         * /circles
         * /circles?grouped=true
         */
        {
            method: 'post',
            path: BASE_URL + '/test_laundry_sms',
            config: {
                handler: function(req, reply) {
                    // db.job.findById(req.paylaod.job_id).exec(function(err, job){
                    //     util.sms.notify.notifyLaundryBooking(job);
                    //     reply(job);
                    // });
                }
            }
        }
    ];
}();