var BASE_URL = '/feedbacks';
var Controller = require('../controller/feedback');

module.exports = function() {
    return [
        /**
         * @api {get} /feedbacks feedback: get all
         * @apiName feedbackGet
         * @apiGroup Feedback
         *
         * @apiExample Example usage:
         * /feedbacks
         *
         */
        {
            method: 'GET',
            path: BASE_URL,
            config: Controller.getConfigHandler
        },
        /**
         * @api {post} /feedbacks feedback: create
         * @apiName feedbackPost
         * @apiGroup Feedback
         *
         * @apiParam {String} customer_id       Customer Id [Post parameter]
         * @apiParam {String} text              Feedback text [Post parameter]
         *
         * @apiExample Example usage:
         * /feedbacks
         */
        {
            method: 'POST',
            path: BASE_URL,
            config: Controller.postConfigHandler
        }
    ];
}();