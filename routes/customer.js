var BASE_URL = '/customers';
var CustomerController = require('../controller/customer');

module.exports = function() {
    return [
        /**
         * @api {get} /customers Customer: get all
         * @apiName customerGet
         * @apiGroup customer
         *
         * @apiExample Example usage:
         * /customers
         */
        {
            method: 'GET',
            path: BASE_URL,
            config: CustomerController.getConfigHandler
        },
        /**
         * @api {post} /customers/{customer_id}/registerpush Customer: register push notification key
         * @apiName customerPost
         * @apiGroup customer
         *
         * @apiParam {String} gcm_id       GCM id [Post parameter]
         * @apiParam {String} apn_id       APN id [Post parameter]
         *
         * @apiExample Example usage:
         * /customers/547ae3f83ee077774bbb2f5c/registerpush
         */
        {
            method: 'POST',
            path: BASE_URL + "/{customer_id}/registerpush",
            config: CustomerController.pushNotificationConfigHandler
        },
        /**
         * @api {post} /customers/auth     Customer: Auth
         * @apiName customerAuth
         * @apiGroup customer
         *
         * @apiParam {String} customer_id   customer id [Post parameter]
         * @apiParam {String} phone         phone [Post parameter]
         * @apiParam {String} email         email [Post parameter]
         * @apiParam {String} secret        secret to verify [Post parameter]
         * 
         * @apiExample Example usage:
         * /customers/auth
         *
         * @apiDescription provide either the phone / email / customer_id + secret to auth user.
         */
        {
            method: 'POST',
            path: BASE_URL + "/auth",
            config: CustomerController.secretHandler
        },
        /**
         * @api {put} /customers/secret     Customer: update secret
         * @apiName customerUpdate
         * @apiGroup customer
         *
         * @apiParam {String} customer_id   customer id [Post parameter]
         * @apiParam {String} old_secret    old secret to verify [Post parameter]
         * @apiParam {String} new_secret    new secret to set [Post parameter]
         * 
         * @apiExample Example usage:
         * /customers/secret
         */
        {
            method: 'PUT',
            path: BASE_URL + "/secret",
            config: CustomerController.secretUpdateHandler
        }
    ];
}();