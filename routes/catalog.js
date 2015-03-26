﻿var db = require('../db');
var BASE_URL = '/catalogs';

var CatalogController = require('../controller/catalog');

module.exports = function () {
    return [
        {
            method: 'GET',
            path: BASE_URL,
            config: CatalogController.getAllCatalog
        }, {
            method: 'GET',
            path: BASE_URL + '/{specialist_id}',
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
            path: BASE_URL + '/delete',
            config: CatalogController.deleteCatalog
        }
    ];
}();