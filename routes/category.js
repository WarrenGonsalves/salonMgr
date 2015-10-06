var db = require('../db');
var BASE_URL = '/categories';
var ADMIN_URL = "/admin" + BASE_URL;
var Controller = require('../controller/category');

module.exports = function() {
    return [
        /**
         * @api {get} /categories/ Get all categories
         * @apiName getCategories
         * @apiGroup Categories
         */
        {
            method: 'GET',
            path: BASE_URL,
            config: {
                handler: function(req, reply) {
                    //util.reply.derp(reply);
                    reply("{\"services\":[{\"category\":\"Repair\",\"display\":\"Other Services\",\"sub_categories\":[{\"_id\":\"54cfd3c418239e2c23574eaf\",\"category\":\"Repair\",\"sub_category\":\"AC\",\"display\":\"Other Services\",\"active\":true},{\"_id\":\"54b73a31a8cc019a0f9fba06\",\"sub_category\":\"Carpenter\",\"category\":\"Repair\",\"display\":\"Other Services\",\"active\":true},{\"_id\":\"54d023f35412cb4016ff1a90\",\"category\":\"Repair\",\"sub_category\":\"Contractors\",\"display\":\"Other Services\",\"active\":true},{\"_id\":\"54b73a31a8cc019a0f9fba07\",\"sub_category\":\"Electrician\",\"category\":\"Repair\",\"display\":\"Other Services\",\"active\":true},{\"_id\":\"54b73a31a8cc019a0f9fba09\",\"sub_category\":\"Painter\",\"category\":\"Repair\",\"display\":\"Other Services\",\"active\":true}]}]}").header('Content-Type', 'application/json')
                }
            }
        }, {
            method: 'GET',
            path: '/v2/categories',
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
         * @apiGroup Admin
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