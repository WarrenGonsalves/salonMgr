var BASE_URL = '/ratings';
var controller = require('../controller/rating');

module.exports = function() {
    return [{
            method: 'GET',
            path: BASE_URL,
            config: controller.getConfigHandler
        },
        /**
         * @api {post} /ratings/{specialist_id} Ratings: specialist rating
         * @apiName postRating
         * @apiGroup Rating
         *
         * @apiParam {String} rating_ids  Comma seperated ids for rating count to be incremented [Post parameter]
         *
         * @apiExample Example usage:
         * /ratings/5468521be05865bc22d26733
         */
        {
            method: 'POST',
            path: BASE_URL + '/{spc_id}',
            config: controller.postConfigHandler
        }
    ];
}();