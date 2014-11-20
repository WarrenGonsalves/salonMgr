/*!
 * Routing for Regsitration
 */

var registrationController = require('../controller/registrationController');

var BASE_URL = '/register'

module.exports = function() {
    return [{
        method: 'POST',
        path: BASE_URL + '/store/{phone}',
        config: registrationController.registerStoreHandler
    }, {
        method: 'POST',
        path: BASE_URL + '/user/{phone}',
        config: {
            handler: function(req, reply) {
                reply("TODO: user registration for phone: " + req.params.phone);
            }
        }
    }];
}();