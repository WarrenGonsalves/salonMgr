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
             * Add Store to given specialist
             * POST
             * /admin/specialist/addstore/{spc_id}/{store_id}
             */
            method: 'POST',
            path: SPECIALIST_URL + '/addstore/{spc_id}/{store_id}',
            config: adminController.addSpecialistStoreHandler
        }, {
            /**
             * admin config
             * GET
             * /admin/config
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
        },{
            /**
             * admin post test
             * POST
             * /admin/config
             */
            method: 'POST',
            path: BASE_URL + '/test',
            config: {
                handler: function(req, reply) {
                    console.log("post parameters: " + req.query.addr);
                    reply("yes we are posting: "+ req.query.addr);
                }
            }
        }
    ];
}();