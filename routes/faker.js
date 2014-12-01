var BASE_URL = '/data/faker';
var util = require('../util');
var FakeController = require('../controller/faker');

module.exports = function() {
  return [{
    method: 'POST',
    path: BASE_URL + '/specialist',
    config: FakeController.newSpecialistHandler
  }];
}();