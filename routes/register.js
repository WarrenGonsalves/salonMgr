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
    return [
        /**
         * @api {post} /register/store/{store_phone} Register: new store
         * @apiName registerStore
         * @apiGroup register
         *
         * @apiParam {String} store_phone Store phone number
         *
         * @apiExample Example usage:
         * /register/store/9999888999
         */
        {
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
        },
        /**
         * @api {post} /register/auth/{phone}/{auth_code} Register: auth store
         * @apiName authStore
         * @apiGroup register
         *
         * @apiParam {String} phone phone number
         * @apiParam {String} auth_code authorization code received via SMS
         *
         * @apiExample Example usage:
         * /register/auth/9999888999/2424
         */
        {
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
        }
    ];
}();