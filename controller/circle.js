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

        if (!(request.query.lat === undefined) && !(request.query.lng === undefined)) {
            // var nearLoc = {
            //     $near: {
            //         $geometry: {
            //             type: "Point",
            //             coordinates: [request.query.lng, request.query.lat]
            //         }
            //     }
            // };
            var nearLoc = {
                $nearSphere: [request.query.lng, request.query.lat],
                $maxDistance: 10 / 6368
            }
            query_param['locs'] = nearLoc;
        }

        console.log(__filename + ' query param ' + JSON.stringify(query_param));

        db.circle.find(query_param, function(err, circles) {
            console.log("getting all circles " + JSON.stringify(circles));
            if (err) {
                reply(err).code(420);
                return;
            }

            reply({
                circleList: circles
            });
        });

        // var point = {
        //     type: 'Point',
        //     coordinates: [parseFloat(request.query.lng), parseFloat(request.query.lat)]
        // };

        // console.log("print something atleast" + JSON.stringify(point));
        // db.circle.geoNear(point, {
        //     maxDistance: 1,
        //     spherical: true
        // }, function(error, docs) {
        //     console.log("print something atleast");
        //     console.log(JSON.stringify(error));
        //     console.log(JSON.stringify(docs));
        //     reply("finished");
        // });
    }
};

CircleController.prototype.postConfigHandler = {
    handler: function(request, reply) {
        console.log("Creating new circle.");
        var circle = new db.circle()
        circle.city = request.payload.city;
        circle.name = request.payload.name;
        circle.locs.coordinates = [parseFloat(request.payload.lng), parseFloat(request.payload.lat)];
        circle.save(function(err, data) {
            if (err) {
                console.log(err);
            }
        });
        reply(circle);
    }
};

module.exports = new CircleController();