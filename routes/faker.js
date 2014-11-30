var BASE_URL = '/data/faker';
var util = require('../util');
var FakeController = require('../controller/Faker');

module.exports = function() {
  return [{
    method: 'POST',
    path: BASE_URL + '/specialist',
    config: FakeController.newSpecialistHandler
  }];
}();