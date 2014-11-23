var category = require('../models/meta_category');
var BASE_URL = '/categories';
var ADMIN_URL = "/admin" + BASE_URL;

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
            config: {
                handler: function(req, reply) {
                    category.getAll(function(err, data) {
                        if (err) {
                            reply({
                                "error": err
                            });
                        }
                        reply({
                            services: data
                        });
                    });
                }
            }
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
                    category.createNew(req.params.category, req.params.sub_category, function(err, data) {
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