var studio = require('../models/studio');
var studioController = require('../controller/studio');
var BASE_URL = '/studios';
var util = require('../util');
var config = require('../config/constants');

module.exports = function() {
  	return [
	    /**
	     * @api {get} /studios get studios
	     * @apiName getStudios
	     * @apiGroup studio
	     *
	     * @apiExample Example usage:
	     * /studios
	     * /studios?category=667766
	     * /studios?category=667766&grouped=true
	     * /studios?category=667766&lat=19.1999999&lng=72.9444444
	     */
	    {
	      method: 'GET',
	      path: BASE_URL,
	      config: studioController.getConfigHandler
	    },
	     /**
	     * @api {get} /studios/ype get studios
	     * @apiName getStudios
	     * @apiGroup studio
	     *
	     * @apiExample Example usage:
	     * /studios
	     * /studios?category=667766
	     * /studios?category=667766&grouped=true
	     * /studios?category=667766&lat=19.1999999&lng=72.9444444
	     */
	    {
	      method: 'GET',
	      path: BASE_URL+'/category',
	      config: studioController.getStudioListWithType
	    },
	    /**
	     * @api {post} /studios post studios
	     * @apiName postStudios
	     * @apiGroup studio
	     *
	     */
	    {
	      method: 'POST',
	      path: BASE_URL+'/bulk/{studio_id}',
	      config: studioController.addStudioServices
	    },/**
	     * @api {post} /studios post studios
	     * @apiName postStudios
	     * @apiGroup studio
	     *
	     */
	    {
	      method: 'POST',
	      path: BASE_URL,
	      config: studioController.postConfigHandler
	    },/**
	     * @api {post} /studio/lead  studios
	     * @apiName add leads
	     * @apiGroup studio
	     *
	     */
	    {
	      method: 'POST',
	      path: BASE_URL+'/lead/{customer_name}/{phone}',
	      config: studioController.studiolead
	    },
	    /**
	     * @api {post} /checkcoupon code
	     * @apiName postStudios
	     * @apiGroup studio
	     *
	     */
	    {
	      method: 'POST',
	      path: BASE_URL + '/couponcode/{coupon_code}/{orig_price}',
	      config: studioController.checkCoupon
	    },
	    /**
	     * @api {post} /studios/{studio_id}/book/{cust_id} Booking: book studio
	     * @apiName bookSpecialist
	     * @apiGroup specialist
	     *
	     * @apiParam {String} studio_id   Studio id [Url parameter]
	     * @apiParam {String} cust_id     Customer id [Url parameter]
	     * @apiParam {String} category    sub_category/service id [Post parameter]
	     * @apiParam {String} name        Customer name [Post parameter]
	     * @apiParam {String} phone       Customer phone [Post parameter]
	     * @apiParam {String} addr        Customer address [Post parameter]
	     * @apiParam {String} addr2       Customer address 2 [Post parameter]
	     * @apiParam {String} landmark    Customer address landmark [Post parameter]
	     * @apiParam {String} task        Customer task [Post parameter]
	     * @apiParam {String} book_date   Book date and time in YYYY-MM-DDThh:mmTZD format [2014-11-12T10:00+05:30][Post parameter]
	     *
	     * @apiExample Example usage:
	     * /studios/55a7852a55c065fd35ecc823/book/55aa2a4462f3567778692b9d
	     */
	    {
	      method: 'POST',
	      path: BASE_URL + '/{studio_id}/book/{cust_id}',
	      config: studioController.postBookStudio
	    },
    ]
}();