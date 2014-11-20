/*!
 * Routing for Orgs
 */

var BASE_URL = '/stores';
var storeController = require('../controller/store');

module.exports = function() {
    return [{
        /**
         * lists all stores
         * GET
         * /stores
         */
        method: 'GET',
        path: BASE_URL,
        config: storeController.getConfigHandler
    }];
}();