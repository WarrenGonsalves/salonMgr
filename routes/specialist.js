var specialist = require('../models/specialist');
var specialistController = require('../controller/specialist');
var BASE_URL = '/specialists';
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
      config: specialistController.getConfigHandler
    },
    /**
     * @api {post} /specialists       Specialist: Customer Referral
     * @apiName custReferral
     * @apiGroup specialist
     *
     * @apiParam {String} referral_customer_id    Customer id [Post parameter]
     * @apiParam {String} name                    Specialist name [Post parameter]
     * @apiParam {String} phone                   Specialist Phone [Post parameter]
     * @apiParam {String} category_id             Specialist Category [Post parameter]
     */
    {
      method: 'POST',
      path: BASE_URL,
      config: specialistController.postConfigHandler
    },
    /**
     * @api {post} /specialists/{spc_id}/book/{cust_id} Booking: book specialist
     * @apiName bookSpecialist
     * @apiGroup specialist
     *
     * @apiParam {String} spc_id      Specialist id [Url parameter]
     * @apiParam {String} cust_id     Customer id / Store id [Url parameter]
     * @apiParam {String} category    Specialist category title [Post parameter]
     * @apiParam {String} name        Customer name [Post parameter]
     * @apiParam {String} phone       Customer phone [Post parameter]
     * @apiParam {String} addr        Customer address [Post parameter]
     * @apiParam {String} addr2       Customer address 2 [Post parameter]
     * @apiParam {String} landmark    Customer address landmark [Post parameter]
     * @apiParam {String} task        Customer task [Post parameter]
     * @apiParam {String} book_date   Book date and time in YYYY-MM-DDThh:mmTZD format [2014-11-12T10:00+05:30][Post parameter]
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
     * @api {post} /specialists/customerjob Booking: referr customer + job
     * @apiName customerJob
     * @apiGroup specialist
     *
     * @apiParam {String} spc_id      Specialist id [Post parameter]
     * @apiParam {String} category    Specialist category title [Post parameter]
     * @apiParam {String} name        Customer name [Post parameter]
     * @apiParam {String} phone       Customer phone [Post parameter]
     * @apiParam {String} task        Customer task [Post parameter]
     * @apiParam {String} book_date_milli   Book date and time in milli secs [Post parameter]
     *
     * @apiExample Example usage:
     * /specialists/customerjob
     */
    {
      method: 'POST',
      path: BASE_URL + '/customerjob',
      config: specialistController.postCustomerJob
    },

    {
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
        var path = config.imgDir + request.params.id;
        reply.file(path).header('Content-type', 'image/gif');
      }
    }
  ];
}();