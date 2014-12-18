var BASE_URL = '/circles';
var CircleController = require('../controller/circle');

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
            config: CircleController.getConfigHandler
        },
        /**
         * @api {post} /circles/{name}/{lat}/{lng} Circles: create
         * @apiName postCircles
         * @apiGroup Circle
         *
         * @apiExample Example usage:
         * /circles/Powai/12.556795/12.7676767
         */
        {
            method: 'POST',
            path: BASE_URL,
            config: CircleController.postConfigHandler
        }
    ];
}();