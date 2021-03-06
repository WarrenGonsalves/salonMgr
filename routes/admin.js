var util = require('../util');
var BASE_URL = '/admin';
var SPECIALIST_URL = BASE_URL + '/specialists';
var RATING_URL = BASE_URL + '/ratings';
var adminController = require('../controller/admin');
var AuthController = require('../controller/auth');
var config = require('../config/constants');
var moment = require('moment');
var db = require('../db');
var _ = require('underscore');
var tnxcontroller = require('../controller/transaction');

module.exports = function() {
  return [
    {
        method: 'GET',
        path: BASE_URL + '/bookings',
        config: {
          pre: [
            { method: AuthController.ensureAuthenticated, assign: 'user'},
            { method: AuthController.isAdmin, assign: 'isAdmin'},
          ]
        },
        handler: adminController.getBookingList
    }, {
        method: 'POST',
        path: BASE_URL + '/bookings/status/{booking_id}',
        config: {
          pre: [
            { method: AuthController.ensureAuthenticated, assign: 'user'},
            { method: AuthController.isAdmin, assign: 'isAdmin'},
          ]
        },
        handler: adminController.postBookingStatus
    }, {
        method: 'POST',
        path: BASE_URL + '/bookings/services/{booking_id}',
        config: {
          pre: [
            { method: AuthController.ensureAuthenticated, assign: 'user'},
            { method: AuthController.isAdmin, assign: 'isAdmin'},
          ]
        },
        handler: adminController.postBookingServices
    }, {
        method: 'GET',
        path: BASE_URL + '/studios',
        config: {
          pre: [
            { method: AuthController.ensureAuthenticated, assign: 'user'},
            { method: AuthController.isAdmin, assign: 'isAdmin'},
          ]
        },
        handler: adminController.getStudioList
    }



    // /**
    //  * @api {get} / Test.
    //  * @apiName TestEndPoint
    //  * @apiGroup admin
    //  */
    // {
    //     method: 'GET',
    //     path: '/',
    //     config: {
    //         handler: function(req, reply) {
    //             util.reply.derp(reply);
    //         }
    //     }
    // }, {
    //     method: 'GET',
    //     path: BASE_URL + '/console/{param*}',
    //     config: adminController.consoleHandler
    // }, {
    //     method: 'GET',
    //     path: SPECIALIST_URL,
    //     config: adminController.getAllSpecialists,
    // }, {
    //     method: 'POST',
    //     path: SPECIALIST_URL,
    //     config: adminController.postSpecialistHandler
    // }, {
    //     method: 'POST',
    //     path: SPECIALIST_URL + '/profile/{spc_id}',
    //     config: adminController.postSpecialistProfileHandler
    // }, {
    //     method: 'POST',
    //     path: SPECIALIST_URL + '/resetratings',
    //     config: adminController.specialistRatingResetHandler
    // },{
    //     method: 'POST',
    //     path: BASE_URL + '/editsp/{spc_id}',
    //     config: adminController.postSpecialistAttributeHandler
    // },
    // /**
    //  * @api {post} /admin/specialist/addcat/{spc_id}/{cat_id} Specialist: Add Category to Specialist
    //  * @apiName AddCat
    //  * @apiGroup admin
    //  *
    //  * @apiParam {String} spc_id        Specialist id.
    //  * @apiParam {String} cat_id        cateogory id.
    //  * @apiParam {String} service_time  Service time [POST param].
    //  */
    // {
    //     method: 'POST',
    //     path: SPECIALIST_URL + '/addcat/{spc_id}/{cat_id}',
    //     config: adminController.addSpecialistCategoryHandler
    // },
    // /**
    //  * @api {post} /admin/specialist/addstore/{spc_id}/{store_id} Specialist: Add Store to specialist
    //  * @apiName AddStore
    //  * @apiGroup admin
    //  *
    //  * @apiParam {String} spc_id      Specialist id.
    //  * @apiParam {String} store_id    Store id.
    //  *
    //  */
    // {
    //     method: 'POST',
    //     path: SPECIALIST_URL + '/addstore/{spc_id}/{store_id}',
    //     config: adminController.addSpecialistStoreHandler
    // },
    // /**
    //  * @api {post} /admin/reviews Reviews: new review metadata
    //  * @apiName AddReviewMetadata
    //  * @apiGroup admin
    //  *
    //  * @apiParam {String} text     Review text [Pay]
    //  *
    //  */
    // {
    //     method: 'POST',
    //     path: RATING_URL,
    //     config: adminController.postReviewMetadataHandler
    // }, {
    //     method: 'POST',
    //     path: BASE_URL + '/setup/category',
    //     config: adminController.setupCategoryHandler
    // },
    // /**
    //  * @api {put} /admin/category Category: update
    //  * @apiName ServerCateogry
    //  * @apiGroup admin
    //  */
    // {
    //     method: 'PUT',
    //     path: BASE_URL + '/category',
    //     config: adminController.categoryPutHandler
    // },
    // /**
    //  * @api {get} /admin/config Server: Get Server config
    //  * @apiName Server Config
    //  * @apiGroup admin
    //  */
    // {
    //     method: 'GET',
    //     path: BASE_URL + '/config',
    //     config: {
    //         handler: function(req, reply) {
    //             reply({
    //                 "server": process.env.OPENSHIFT_APP_DNS,
    //                 "app": process.env.OPENSHIFT_APP_NAME,
    //                 "host": process.env.OPENSHIFT_MONGODB_DB_HOST,
    //                 "port": process.env.OPENSHIFT_MONGODB_DB_PORT,
    //                 "connect": process.env.OPENSHIFT_MONGODB_DB_URL,
    //                 "env": process.env.NODE_ENV,
    //                 "dbname": process.env.BUMBLEBEE_MONGODB_DB_NAME,
    //                 "dbname_2": process.env.OPENSHIFT_MONGODB_DB,
    //                 "data": process.env.OPENSHIFT_DATA_DIR,
    //                 "data_dir": config.dataDir,
    //                 "img_dir": config.imgDir,
    //                 "date_time_format": moment().format('YYYY-MM-DDTHH:mmZZ'),
    //                 "date_time": moment("2015-01-04T13:07:00.000+05:30", 'YYYY-MM-DDTHH:mmZZ').format('YYYY-MM-DDTHH:mmZZ')
    //             })
    //         }
    //     }
    // }, {
    //     method: 'POST',
    //     path: BASE_URL + '/testpay',
    //     config: {
    //         handler: function(req, reply) {
    //             util.paytm.testTransaction(req.payload.order_id, req.payload.customer_id, req.payload.amount);
    //             reply("done");
    //         }
    //     }
    // }, {
    //     method: 'POST',
    //     path: BASE_URL + '/pushnotify/gcm',
    //     config: {
    //         handler: function(req, reply) {
    //             util.gcm.sendGCM(req.payload.token, {
    //                 invoice_id: "12312112324"
    //             });
    //             reply("done");
    //         }
    //     }
    // }, {
    //     method: 'POST',
    //     path: BASE_URL + '/pushnotify/apn',
    //     config: {
    //         handler: function(req, reply) {
    //             util.apn.sendAPN(req.payload.token, {
    //                 invoice_id: "12312112324"
    //             });
    //             reply("done");
    //         }
    //     }
    // }, {
    //     method: 'POST',
    //     path: BASE_URL + '/initCounter',
    //     config: {
    //         handler: function(req, reply) {
    //             db.counter.initCounter();
    //             reply("done");
    //         }
    //     }
    // }
  ];
}();