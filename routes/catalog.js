var specialist = require('../models/catalog');
var specialistController = require('../controller/catalog');
var BASE_URL = '/catalog';
var util = require('../util');
var config = require('../config/constants');

module.exports = function () {
    return [
        {
            method: 'GET',
            path: BASE_URL,
            config: controller.getAllCatalog
        }, {
            method: 'GET',
            path: BASE_URL + '/{vendor_id}',
            config: controller.getVendorCatalog
        }, {
            method: 'POST',
            path: BASE_URL + '/add',
            config: controller.addCatalog
        }, {
            method: 'POST',
            path: BASE_URL + '/update',
            config: controller.updateCatalog
        }, {
            method: 'POST',
            path: BASE_URL + '/{catalog_id}',
            config: controller.deleteCatalog
        }
    ];
}();