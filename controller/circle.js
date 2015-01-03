var db = require('../db');
var _ = require('underscore');
var util = require('../util');

function CircleController() {};

/**
 * Get Circle
 */
CircleController.prototype.getConfigHandler = {
    handler: function(request, reply) {

        var query_param = {}
        var isGrouped = false;

        if (!(request.query.grouped === undefined)) {
            isGrouped = request.query.grouped;
        }

        db.circle.find(query_param).exec(function(err, circles) {
            if (err) {
                util.reply.error(err, reply);
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

CircleController.prototype.postConfigHandler = {
    handler: function(request, reply) {
        var circle = new db.circle()
        circle.city = request.payload.city;
        circle.name = request.payload.name;
        circle.locs.coordinates = [parseFloat(request.payload.lng), parseFloat(request.payload.lat)];
        circle.save(function(err, data) {
            if (err) {
                util.reply.error(err, reply);
                return;
            }
        });
        util.logger.info("Circle", ["New Circle created"], circle);
        reply(circle);
    }
};

module.exports = new CircleController();