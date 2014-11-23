var util = require('../util');
var BASE_URL = '/admin';
var SPECIALIST_URL = BASE_URL + '/specialist';
var adminController = require('../controller/admin');

module.exports = function() {
    return [

        /**
         * @api {get} / Test.
         * @apiName TestEndPoint
         * @apiGroup admin
         */
        {
            method: 'GET',
            path: '/',
            config: {
                handler: function(req, reply) {
                    util.replyHelper.derp(reply);
                }
            }
        },
        /**
         * @api {post} /admin/specialist/addcat/{spc_id}/{cat_id} Specialist: Add Category to Specialist
         * @apiName AddCat
         * @apiGroup admin
         *
         * @apiParam {String} spc_id      Specialist id.
         * @apiParam {String} cat_id      cateogory id.
         *
         */
        {
            method: 'POST',
            path: SPECIALIST_URL + '/addcat/{spc_id}/{cat_id}',


            config: adminController.addSpecialistCategoryHandler
        },
        /**
         * @api {post} /admin/specialist/addstore/{spc_id}/{store_id} Specialist: Add Store to specialist
         * @apiName AddStore
         * @apiGroup admin
         *
         * @apiParam {String} spc_id      Specialist id.
         * @apiParam {String} store_id    Store id.
         *
         */
        {
            method: 'POST',
            path: SPECIALIST_URL + '/addstore/{spc_id}/{store_id}',
            config: adminController.addSpecialistStoreHandler
        },
        /**
         * @api {get} /admin/config Server: Get Server config
         * @apiName Server Config
         * @apiGroup admin
         */
        {
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