var category = require('../models/meta_category');
var BASE_URL = '/categories';
var ADMIN_URL = "/admin" + BASE_URL;

module.exports = function() {
    return [{
        /**
         * Get all Categories
         * GET
         * /categories
         */
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
    }, {
        /**
         * Create new category / sub category entry
         * POST
         * /admin/categories/{category}/{sub_category}
         */
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
    }];
}();