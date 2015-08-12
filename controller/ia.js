var db = require('../db');
var _ = require('underscore');
var util = require('../util');
var ia_config = require("../public/ia.json");

function IAController() {};

/**
 * Get Category
 */
IAController.prototype.getConfigHandler = {
    handler: function(request, reply) {
        //db.category.find({$and:[{active: {'$ne': false }},{category:{'$ne':'super_users'}}]}).select('category sub_category active').sort('order sub_category').find(function(err, services) {
        var query_param = {};
      //  query_param['active'] = {'$ne': false };
      console.log("in IA controller  ")
        
      
                reply({
                    ia: ia_config
                });
    }
}
          


module.exports = new IAController();