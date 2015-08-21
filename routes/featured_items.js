var deals = require('../models/featured_items');
var featuredListController = require('../controller/featured_items');
var BASE_URL = '/featured_items';
var util = require('../util');
var config = require('../config/constants');

module.exports = function() {
  return [
    /**
     * @api {get} /
     * @apiName getFeaturedItems
     * @apiGroup featured_items
     *
     * @apiExample Example usage:
     * /featured_items
     */
    {
      method: 'GET',
      path: BASE_URL,
      config: featuredListController.getFeaturedItems
    },
    /**
     * @api {post} /
     * @apiName setFeaturedItems
     * @apiGroup featured_items
     *
     * @apiParam {String} item_id                 Specialist/deal/market_block id [Post parameter]
     * @apiParam {String} title                   Specialist/deal/market_block name/title [Post parameter]
     * @apiParam {String} img                     Specialist/deal/market_block img url [Post parameter]
     * @apiParam {String} category                deal category [Post parameter]
     * @apiParam {String} url                     url [Post parameter]
     * @apiParam {String} rating                  Specialist rating [Post parameter]
     * @apiParam {String} type                    item type [Post parameter]
     *
     * @apiExample Example usage:
     * /featured_items
     */
    {
      method: 'POST',
      path: BASE_URL,
      config: featuredListController.setFeaturedItem
    }
  ];
}();