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
     * /specialists
     * /specialists?store=123456
     * /specialists?store=123456&category=667766
     * /specialists?store=123456&category=667766&grouped=true
     */
    {
      method: 'GET',
      path: BASE_URL,
      config: specialistController.getConfigHandler
    },
    /*!
     * Create a sample specialist
     * POST
     * /specialists/{fname}/{cat}
     */
    {
      method: 'POST',
      path: BASE_URL + '/{fname}/{cat}',
      config: specialistController.postConfigHandler
    },
    /**
     * @api {post} /specialists/{spc_id}/book/{cust_id} Booking: book specialist
     * @apiName bookSpecialist
     * @apiGroup specialist
     *
     * @apiParam {String} spc_id      Specialist id [Url parameter]
     * @apiParam {String} cust_id     Customer id / Store id [Url parameter]
     * @apiParam {String} name        Customer name [Post parameter]
     * @apiParam {String} phone       Customer phone [Post parameter]
     * @apiParam {String} addr        Customer address [Post parameter]
     * @apiParam {String} task        Customer task [Post parameter]
     *
     * @apiExample Example usage:
     * /specialists/123456/book/34343434
     */
    {
      method: 'POST',
      path: BASE_URL + '/{spc_id}/book/{cust_id}',
      config: specialistController.postBookSpecialist
    },
    /**
     * @api {post} /specialists/{spc_id}/unbook Booking: unbook specialist
     * @apiName unbookSpecialist
     * @apiGroup specialist
     *
     * @apiParam {String} spc_id      Specialist id [Url parameter]
     *
     * @apiExample Example usage:
     * /specialists/123456/unbook
     */
    {
      method: 'POST',
      path: BASE_URL + '/{spc_id}/unbook',
      config: specialistController.postUnBookSpecialist
    }, {
      method: 'GET',
      path: '/img/{id}',
      // handler: {
      //   directory: {
      //     path: './img',
      //     listing: true,
      //     index: true
      //   }
      // }
      handler: function(request, reply) {
        var path = __dirname + "/../img/" + request.params.id;
        reply.file(path).header('Content-type', 'image/gif');
      }
    }
  ];
}();