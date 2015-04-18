var BASE_URL = '/images';
var controller = require('../controller/image');

module.exports = function() {
    return [
        {
            method: 'GET',
            path: BASE_URL,
            config: controller.getHandler
        },
        {
            method: 'POST',
            path: BASE_URL,
            config: controller.postHandler
        }
    ];
}();