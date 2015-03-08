var deals = require('../models/deals');
var dealListController = require('../controller/deals');
var BASE_URL = '/deals';
var util = require('../util');
var config = require('../config/constants');

module.exports = function() {
  return [
    /**
     * @api {get} /specialist?store={storeid}&category={categoryid}&lat={latitude}&lng={longitude}&book_date={YYYY-MM-DDThh:mmTZD}&grouped=true get specialists
     * @apiName getSpecialists
     * @apiGroup specialist
     *
     * @apiExample Example usage:
     * /specialists
     * /specialists?store=123456
     * /specialists?store=123456&category=667766
     * /specialists?store=123456&category=667766&grouped=true
     * /specialists?category=667766&lat=19.1999999&lng=72.9444444&book_date=2014-11-12T10:00+05:30
     */
    {
      method: 'GET',
      path: BASE_URL,
      config: dealListController.getDeals
    }
  ];
}();