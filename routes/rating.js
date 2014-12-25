var BASE_URL = '/ratings';
var controller = require('../controller/rating');

module.exports = function() {
    return [
        /**
         * @api {post} /ratings/{specialist_id} Ratings: new specialist rating
         * @apiName postRating
         * @apiGroup Rating
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