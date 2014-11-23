var specialist = require('../models/specialist');
var specialistController = require('../controller/specialist');
var BASE_URL = '/specialists';
var util = require('../util');

module.exports = function() {
  return [
    /**
     * @api {get} /specialist?store={storeid}&category={categoryid}&grouped=true get specialists
     * @apiName getSpecialists
     * @apiGroup specialist
     *
     * @apiExample Example usage:
     * /specialist
     * /specialist?store=123456
     * /specialist?store=123456&category=667766
     * /specialist?store=123456&category=667766&grouped=true
     */
    {
      method: 'GET',
      path: BASE_URL,
      config: specialistController.getConfigHandler
    },
    /*!
     * Create a sample specialist
     * POST
     * /specialist/{fname}/{cat}
     */
    {
      method: 'POST',
      path: BASE_URL + '/{fname}/{cat}',
      config: specialistController.postConfigHandler
    },
    /**
     * @api {post} /specialist/{spc_id}/book Booking: book specialist
     * @apiName bookSpecialist
     * @apiGroup specialist
     *
     * @apiParam {String} spc_id      Specialist id [Url parameter]
     * @apiParam {String} name        Customer name [Post parameter]
     * @apiParam {String} phone       Customer phone [Post parameter]
     * @apiParam {String} addr        Customer address [Post parameter]
     * @apiParam {String} task        Customer task [Post parameter]
     *
     * @apiExample Example usage:
     * /specialist/123456/book
     */
    {
      method: 'POST',
      path: BASE_URL + '/{spc_id}/book',
      config: specialistController.postBookSpecialist
    },
    /**
     * @api {post} /specialist/{spc_id}/unbook Booking: unbook specialist
     * @apiName unbookSpecialist
     * @apiGroup specialist
     *
     * @apiParam {String} spc_id      Specialist id [Url parameter]
     *
     * @apiExample Example usage:
     * /specialist/123456/unbook
     */
    {
      method: 'POST',
      path: BASE_URL + '/{spc_id}/unbook',
      config: specialistController.postUnBookSpecialist
    }
  ];
}();