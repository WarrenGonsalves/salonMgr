var BASE_URL = '/appsettings';
var util = require("../util");

module.exports = function() {
    return [
        /**
         * @api {get} /appsettings AppSettings: get
         * @apiName getAppsettings
         * @apiGroup Appsettings
         *
         * @apiExample Example usage:
         * /appsettings
         */
        {
            method: 'GET',
            path: BASE_URL,
            config: {
                handler: function(req, reply) {
                    var settings = {}
                    settings.android = "9";
                    settings.ios = "1.3";
                    settings.pay_gen = "http://handz-api.elasticbeanstalk.com/admin/paytm/gen_checksum"
                    settings.pay_callback = "http://handz-api.elasticbeanstalk.com/hawaii" 
                    reply(settings);
                }
            }
        }
    ];
}();