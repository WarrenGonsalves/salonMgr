var util = require('../util');
var BASE_URL = '/admin';
var SPECIALIST_URL = BASE_URL + '/specialist';

var adminController = require('../controller/admin');

module.exports = function() {
    return [{
        method: 'GET',
        path: '/',
        config: {
            handler: function(req, reply) {
                util.replyHelper.derp(reply);
            }
        }
    }, {
        method: 'POST',
        path: SPECIALIST_URL + '/addcat/{spc_id}/{cat_id}',
        config: adminController.addSpecialistCategoryHandler
    }];
}();