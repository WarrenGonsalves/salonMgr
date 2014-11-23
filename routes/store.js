/*!
 * Routing for Orgs
 */

var BASE_URL = '/stores';
var storeController = require('../controller/store');

module.exports = function() {
    return [
        /**
         * @api {get} /stores get all
         * @apiName getStores
         * @apiGroup store
         */
        {
            method: 'GET',
            path: BASE_URL,
            config: storeController.getConfigHandler
        }
    ];
}();