var deals = require('../models/deals');
var dealListController = require('../controller/deals');
var BASE_URL = '/deals';
var util = require('../util');
var config = require('../config/constants');

module.exports = function() {
  return [
    {
      method: 'GET',
      path: BASE_URL,
      config: dealListController.getDeals
    }
  ];
}();