var util = require('../util');
var BASE_URL = '/admin';
var SPECIALIST_URL = BASE_URL + '/specialist';
var adminController = require('../controller/admin');

module.exports = function() {
    return [

        {
            /**
             * Endpoint for testing
             * GET
             * /
             */
            method: 'GET',
            path: '/',
            config: {
                handler: function(req, reply) {
                    util.replyHelper.derp(reply);
                }
            }
        }, {
            /**
             * Add category to given specialist
             * POST
             * /admin/specialist/addcat/{spc_id}/{cat_id}
             */
            method: 'POST',
            path: SPECIALIST_URL + '/addcat/{spc_id}/{cat_id}',
            config: adminController.addSpecialistCategoryHandler
        }, {
            /**
             * Add category to given specialist
             * POST
             * /admin/specialist/addcat/{spc_id}/{cat_id}
             */
            method: 'GET',
            path: BASE_URL + '/config',
            config: {
                handler: function(req, reply) {
                    reply({
                        "server": process.env.OPENSHIFT_APP_DNS,
                        "app": process.env.OPENSHIFT_APP_NAME
                    })
                }
            }
        }
    ];
}();