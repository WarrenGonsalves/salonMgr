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
                    settings.smart_version = "1.4";
                    settings.not_smart_version = "comming soon"; 
                    reply({settings: settings});
                }
            }
        }
    ];
}();