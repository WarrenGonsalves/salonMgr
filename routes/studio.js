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
	     * @api {post} /studios post studios
	     * @apiName postStudios
	     * @apiGroup studio
	     *
	     */
	    {
	      method: 'POST',
	      path: BASE_URL,
	      config: studioController.postConfigHandler
	    }
    ]
}();