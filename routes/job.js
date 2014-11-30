var BASE_URL = '/jobs';
var JobController = require('../controller/job');

module.exports = function() {
    return [
        /**
         * @api {get} /jobs Job: get all
         * @apiName jobGet
         * @apiGroup job
         *
         * @apiExample Example usage:
         * /jobs
         */
        {
            method: 'GET',
            path: BASE_URL,
            config: JobController.getConfigHandler
        }
    ];
}();