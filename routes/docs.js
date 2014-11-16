/*!
 * Routing for docs
 */

module.exports = function() {
    return [{
        method: 'GET',
        path: '/docs/{path*}',
        handler: {
            directory: {
                path: './docs',
                listing: true,
                index: true
            }
        }
    }];
}();