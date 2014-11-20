/*!
 * Routing for Regsitration
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
                    reply({message:"valid user"});
                } else {
                    reply({error:'invalid user', message:"invalid user"}).code(500);
                }
            }
        }
    }];
}();