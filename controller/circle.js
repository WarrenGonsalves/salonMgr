var db = require("../db");

function CircleController() {};

/**
 * Get Circle
 */
CircleController.prototype.getConfigHandler = {
    handler: function(request, reply) {

        var query_param = {}

        // if (!(request.query.customer === undefined)) {
        //     query_param['cust_id'] = request.query.customer;
        // }

        // if (!(request.query.specialist === undefined)) {
        //     query_param['specialist_id'] = request.query.specialist;
        // }

        db.circle.find(query_param, function(err, circles) {
            console.log("getting all circles ");
            if (err) {
                reply(err).code(420);
                return;
            }

            reply({
                circleList: circles
            });
        });
    }
};

CircleController.prototype.postConfigHandler = {
    handler: function(request, reply) {
        console.log("Creating new circle.");
        var circle = new db.circle()
        circle.name = request.params.name;
        circle.locs = [request.params.lng, request.params.lat];
        circle.save(function(err, data) {
            if (err) {
                console.log(err);
            }
        });
        reply(circle);
    }
};

module.exports = new CircleController();