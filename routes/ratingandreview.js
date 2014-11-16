/*!
 * Routing for Ratings n Reviews
 */

var BASE_URL = '/ratingsAndReview'

module.exports = function() {
    return [{
        method: 'GET',
        path: BASE_URL,
        config: {
            handler: function(req, reply) {
                reply("getting rating")
            }
        }
    }, {
        method: 'GET',
        path: BASE_URL + '/{lat}/{long}/{distance}',
        config: {
            handler: function(req, reply) {
                reply("getting org for lat long distance")
            }
        }
    }, {
        method: 'GET',
        path: BASE_URL + '/organizationId/{id}',
        config: {
            handler: function(req, reply) {
                reply("getting org for id" + req.params.id)
            }
        }
    }];
}();