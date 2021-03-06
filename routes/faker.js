var BASE_URL = '/data/faker';
var util = require('../util');
var FakeController = require('../controller/faker');

module.exports = function() {
    return [{
        method: 'POST',
        path: BASE_URL + '/specialist',
        config: FakeController.newSpecialistHandler
    }, {
        method: 'POST',
        path: BASE_URL + '/products/{specialist_id}',
        config: FakeController.productsHandler
    }, {
        method: 'GET',
        path: BASE_URL + '/invoices/{job_id}',
        config: FakeController.invoiceHandler
    }];
}();