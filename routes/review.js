var BASE_URL = '/reviews';
var controller = require('../controller/review');

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
            method: 'GET',
            path: BASE_URL,
            config: controller.getConfigHandler
        }
    ];
}();