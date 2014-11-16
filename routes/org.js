/*!
 * Routing for Orgs
 */

var BASE_URL = '/organizations'

module.exports = function() {
    return [{
        method: 'GET',
        path: BASE_URL,
        config: {
            handler: function(req, reply) {
                reply("getting org")
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