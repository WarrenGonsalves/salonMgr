var util = require('../util');
var BASE_URL = '/admin/data';
var controller = require('../controller/admindata');
var config = require('../config/constants');
var moment = require('moment');
var db = require('../db');

module.exports = function() {
    return [
        {
            method: 'GET',
            path: BASE_URL + '/{entity}',
            config: controller.getHandler
        }, {
            method: 'POST',
            path: BASE_URL + '/{entity}',
            config: controller.postHandler
        },{
            method: 'PUT',
            path: BASE_URL + '/{entity}/{id}',
            config: controller.putHandler
        },{
            method: 'DELETE',
            path: BASE_URL + '/{entity}',
            config: controller.deleteHandler
        }
    ];
}();