var db = require("../db");
var _ = require('underscore');

function ReviewController() {};

/**
 * Get Circle
 */
ReviewController.prototype.getConfigHandler = {
    handler: function(request, reply) {

        var query_param = {}
        var isGrouped = false;

        if (!(request.query.grouped === undefined)) {
            isGrouped = request.query.grouped;
        }

        console.log(__filename + ' query param ' + JSON.stringify(query_param));

        db.circle.find(query_param).exec(function(err, circles) {
            console.log("getting all circles " + JSON.stringify(circles));
            if (err) {
                reply(err).code(420);
                return;
            }

            if (isGrouped) {
                // group circles by city
                circles = _.groupBy(circles, function(data) {
                    return data.city;
                });

                // re-map json structure to match requirement
                circles = _.map(circles, function(data) {
                    var mappedValue = {
                        'city': data[0].city,
                        'circles': data
                    };
                    return mappedValue;
                })
            }

            reply({
                circleList: circles
            });
        });
    }
};

ReviewController.prototype.postConfigHandler = {
//
};

module.exports = new ReviewController();