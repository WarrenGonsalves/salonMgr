var db = require('../db');
var BASE_URL = '/catalogs';

var CatalogController = require('../controller/catalog');
//var util = require('../util');
//var config = require('../config/constants');
//var catalog = require('../models/catalog');

module.exports = function () {
    return [
        {
            method: 'GET',
            path: BASE_URL,
            config: CatalogController.getAllCatalog
        }, {
            method: 'GET',
            path: BASE_URL + '/{vendor_id}',
            config: CatalogController.getVendorCatalog
        }, {
            method: 'POST',
            path: BASE_URL + '/add',
            config: CatalogController.addCatalog
        }, {
            method: 'POST',
            path: BASE_URL + '/update',
            config: CatalogController.updateCatalog
        }, {
            method: 'POST',
            path: BASE_URL + '/{catalog_id}',
            config: CatalogController.deleteCatalog
        }
    ];
}();