var db = require('../db');
var BASE_URL = '/categories';
var ADMIN_URL = "/admin" + BASE_URL;
var Controller = require('../controller/category');

module.exports = function() {
    return [
        /**
         * @api {get} /categories/ Get all categories
         * @apiName getCategories
         * @apiGroup categories
         */
        {
            method: 'GET',
            path: BASE_URL,
            config: Controller.getConfigHandler
        },  /**
         * @api {get} /categories/trending Get trending categories
         * @apiName getCategories
         * @apiGroup categories
         */
        {
            method: 'GET',
            path: BASE_URL+"/trending/",
            config: Controller.getTrendingCategories
        },   /**
         * @api {get} /categories/trending Get trending categories
         * @apiName getCategories
         * @apiGroup categories
         */
        {
            method: 'GET',
            path: BASE_URL+"/all/",
            config: Controller.getCategoriesForCatalogDisplay
        },
        /**  /**
         * @api {get} /categories/ Get all categories
         * @apiName add Categories
         * @apiGroup categories
         */
        {
            method: 'POST',
            path: BASE_URL,
            config: Controller.postConfigHandler
        },
         /* @api {get} /getIA/ Get all categories
         * @apiName getIA
         * @apiGroup IA
         */
        {
            method: 'GET',
            path: BASE_URL+"/ia/",
            config: Controller.getIA
        },
        /**
         * @api {post} /admin/categories/{category}/{sub_category} Category: create new
         * @apiName bookSpecialist
         * @apiGroup admin
         *
         * @apiParam {String} category      Category name
         * @apiParam {String} sub_category  Sub category name
         *
         * @apiExample Example usage:
         * /admin/categories/Fixers/Plumber
         */
        {
            method: 'POST',
            path: ADMIN_URL + "/{category}/{sub_category}",
            config: {
                handler: function(req, reply) {
                    db.category.createNew(req.params.category, req.params.sub_category, function(err, data) {
                        if (err) {
                            reply({
                                "error": err
                            });
                        }
                        reply({
                            data: data
                        });
                    });
                }
            }
        }
    ];
}();