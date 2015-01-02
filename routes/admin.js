var util = require('../util');
var BASE_URL = '/admin';
var SPECIALIST_URL = BASE_URL + '/specialists';
var RATING_URL = BASE_URL + '/ratings';
var adminController = require('../controller/admin');
var config = require('../config/constants');

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
                    util.reply.derp(reply);
                }
            }
        }, {
            method: 'GET',
            path: BASE_URL + '/console/{param*}',
            config: adminController.consoleHandler
        }, {
            method: 'POST',
            path: SPECIALIST_URL,
            config: adminController.postSpecialistHandler
        }, {
            method: 'POST',
            path: SPECIALIST_URL + '/profile/{spc_id}',
            config: adminController.postSpecialistProfileHandler
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
         * @api {post} /admin/reviews Reviews: new review metadata
         * @apiName AddReviewMetadata
         * @apiGroup admin
         *
         * @apiParam {String} text     Review text [Pay]
         *
         */
        {
            method: 'POST',
            path: RATING_URL,
            config: adminController.postReviewMetadataHandler
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
                        "app": process.env.OPENSHIFT_APP_NAME,
                        "host": process.env.OPENSHIFT_MONGODB_DB_HOST,
                        "port": process.env.OPENSHIFT_MONGODB_DB_PORT,
                        "connect": process.env.OPENSHIFT_MONGODB_DB_URL,
                        "dbname": process.env.BUMBLEBEE_MONGODB_DB_NAME,
                        "dbname_2": process.env.OPENSHIFT_MONGODB_DB,
                        "data": process.env.OPENSHIFT_DATA_DIR,
                        "data_dir": config.dataDir,
                        "img_dir": config.imgDir
                    })
                }
            }
        }, {
            method: 'POST',
            path: BASE_URL + '/pushnotify/gcm',
            config: {
                handler: function(req, reply) {
                    util.gcm.sendGCM(req.payload.token, {
                        invoice_id: "12312112324"
                    });
                    reply("done");
                }
            }
        }, {
            method: 'POST',
            path: BASE_URL + '/pushnotify/apn',
            config: {
                handler: function(req, reply) {
                    util.apn.sendAPN(req.payload.token, {
                        invoice_id: "12312112324"
                    });
                    reply("done");
                }
            }
        }
    ];
}();