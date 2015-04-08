var db = require('../db');
var BASE_URL = '/products';

var controller = require('../controller/product');

module.exports = function() {
    return [
        /**
         * @api {get} /products?specialist_id=123456 Product: get
         * @apiName getProduct
         * @apiGroup Product
         *
         * @apiExample Example usage:
         * /products?specialist_id=123123123
         */
        {
            method: 'GET',
            path: BASE_URL,
            config: controller.getHandler
        },
        /**
         * @api {post} /products
         * @apiName postProduct
         * @apiGroup Product
         *
         * @apiParam {String} specialist_id     Specialist id [Post parameter]
         * @apiParam {String} name              Product item name [Post parameter]
         * @apiParam {String} detail            Product item detail [Post parameter]
         * @apiParam {Number} price             Product item price [Post parameter]
         */
        {
            method: 'POST',
            path: BASE_URL,
            config: controller.postHandler
        },
        /**
         * @api {put} /products/{product_id}
         * @apiName putProduct
         * @apiGroup Product
         *
         * @apiParam {String} specialist_id     Specialist id [Post parameter]
         * @apiParam {String} name              Product item name [Post parameter]
         * @apiParam {String} detail            Product item detail [Post parameter]
         * @apiParam {Number} price             Product item price [Post parameter]
         * @apiParam {String} img_s             Product item icon image [Post parameter]
         * @apiParam {String} img_l             Product item medium image [Post parameter]
         */
        {
            method: 'PUT',
            path: BASE_URL + '/{id}',
            config: controller.putHandler
        },
        /**
         * @api {delete} /products/{id}
         * @apiName deleteProduct
         * @apiGroup Product
         *
         */
        {
            method: 'DELETE',
            path: BASE_URL + '/{id}',
            config: controller.deleteHandler
        },
        /**
         * @api {put} /products/img/{id}
         * @apiName imgProduct
         * @apiGroup Product
         *
         * @apiParam {String} img_s         Product item small image [Post parameter]
         * @apiParam {String} img_l         Product item large image [Post parameter]
         */
        {
            method: 'PUT',
            path: BASE_URL + '/img/{id}',
            config: controller.imgHandler
        }
    ];
}();