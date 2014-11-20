/*
 * Regsistration
 *
 * Register a store / user using -
 * POST
 * /register/store/{phone}
 * /register/user/{phone}
 *
 * Response -
 * {
 * "__v": 0,
 * "ph": 234234,
 * "_id": "546d81538b55f82ca98e37b9",
 * "created_date": "2014-11-20T05:50:33.844Z"
 * }
 *
 * Save '_id' for stores / user and use it for query filter where ever store or user query parameter is used.
 *
 */

var registrationController = require('../controller/register');

var BASE_URL = '/register'

module.exports = function() {
    return [{
        /**
         * Register new store
         * POST
         * /register/store/{phone}
         */
        method: 'POST',
        path: BASE_URL + '/store/{phone}',
        config: registrationController.registerStoreHandler
    }, {
        /**
         * NOT YET IMPLEMENTED.
         * Register new user
         * POST
         * /register/store/{phone}
         */
        method: 'POST',
        path: BASE_URL + '/user/{phone}',
        config: {
            handler: function(req, reply) {
                reply("TODO: user registration for phone: " + req.params.phone);
            }
        }
    }, {
        /**
         * Authenticate user / store using giving phone / code
         * GET
         * /register/auth/{phone}/{code}
         */
        method: 'GET',
        path: BASE_URL + '/auth/{phone}/{code}',
        config: {
            handler: function(req, reply) {
                console.log("auth user for phone: " + req.params.phone + " :code " + req.params.code);
                if (req.params.code === '1234') {
                    reply({
                        message: "valid user"
                    });
                } else {
                    reply({
                        error: 'invalid user',
                        message: "invalid user"
                    }).code(500);
                }
            }
        }
    }];
}();