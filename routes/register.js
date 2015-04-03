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
         * @api {post} /register/store/{store_phone} Register: store
         * @apiName registerStore
         * @apiGroup Register
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
        },
        /**
         * @api {post} /register/customer/{customer_phone} Register: customer
         * @apiName registerCustomer
         * @apiGroup Register
         *
         * @apiParam {String} customer_phone Customer phone number
         * @apiParam {String} name Customer Name [Post Param]
         * @apiParam {String} email Customer email [Post Param]
         *
         * @apiExample Example usage:
         * /register/customer/9999888999
         */
        {
            method: 'POST',
            path: BASE_URL + '/customer/{phone}',
            config: registrationController.registerCustomerHandler
        },
        /**
         * @api {post} /register/specialist/{specialist_phone} Register: specialist
         * @apiName registerSpecialist
         * @apiGroup Register
         *
         * @apiParam {String} specialist_phone Specialist phone number
         *
         * @apiExample Example usage:
         * /register/specialist/9999888999
         */
        {
            method: 'POST',
            path: BASE_URL + '/specialist/{phone}',
            config: registrationController.registerSpecialistHandler
        },
        /**
         * @api {post} /register/auth/{phone}/{auth_code} Register: auth phone
         * @apiName auth
         * @apiGroup Register
         *
         * @apiParam {String} phone Store / Customer phone number
         * @apiParam {String} auth_code authorization code received via SMS
         *
         * @apiExample Example usage:
         * /register/auth/9999888999/2424
         */
        {
            method: 'GET',
            path: BASE_URL + '/auth/{phone}/{code}',
            config: registrationController.authHandler
        }
    ];
}();