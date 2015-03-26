var db = require('../db');
var BASE_URL = '/catalogs';

var CatalogController = require('../controller/catalog');

module.exports = function () {
    return [
        /**
         * @api {get} /catalogs?catalogId={catalogId} Catalog: get catalogs
         * @apiName getCatalogs
         * @apiGroup Catalog
         *
         * @apiExample Example usage:
         * /catalog //will return all catalogs
         * /catalog?catalogId=54fc5a41c4ee2a000025737c
         */
        {
            method: 'GET',
            path: BASE_URL,
            config: CatalogController.getAllCatalog
        },
        /**
         * @api {get} /catalogs/{specialist_id} Catalog: get catalogs
         * @apiName getCatalogs
         * @apiGroup Catalog
         *
         * @apiExample Example usage:
         * /catalog/54fc5a41c4ee2a000025737c //gets catalogs based on the vendor id
         */
        {
            method: 'GET',
            path: BASE_URL + '/{specialist_id}',
            config: CatalogController.getVendorCatalog
        },
        /**
         * @api {post} /catalogs/add
         * @apiName addCatalog
         * @apiGroup Catalog
         *
         * @apiParam {String} specialist_id     Specialist id [Post parameter]
         * @apiParam {String} name              Catalog item name [Post parameter]
         * @apiParam {String} detail            Catalog item detail [Post parameter]
         * @apiParam {Number} price             Catalog item price [Post parameter]
         * @apiParam {String} icon_size_image   Catalog item icon image [Post parameter]
         * @apiParam {String} medium_image      Catalog item medium image [Post parameter]
         */
        {
            method: 'POST',
            path: BASE_URL + '/add',
            config: CatalogController.addCatalog
        },
        /**
         * @api {post} /catalogs/update
         * @apiName updateCatalog
         * @apiGroup Catalog
         *
         * @apiParam {String} _id               Catalog item id [Post parameter]
         * @apiParam {String} name              Catalog item name [Post parameter]
         * @apiParam {String} detail            Catalog item detail [Post parameter]
         * @apiParam {Number} price             Catalog item price [Post parameter]
         * @apiParam {String} icon_size_image   Catalog item icon image [Post parameter]
         * @apiParam {String} medium_image      Catalog item medium image [Post parameter]
         */
        {
            method: 'POST',
            path: BASE_URL + '/update',
            config: CatalogController.updateCatalog
        },
        /**
         * @api {post} /catalogs/delete
         * @apiName deleteCatalog
         * @apiGroup Catalog
         *
         * @apiParam {String} _id     Catalog item id [Post parameter]
         */
         {
            method: 'POST',
            path: BASE_URL + '/delete',
            config: CatalogController.deleteCatalog
        }
    ];
}();