var BASE_URL = '/admin';

module.exports = function() {
    return [{
        method: 'GET',
        path: '/',
        config: {
            handler: function(req, reply) {
                reply('derp');
            }
        }
    }];
}();