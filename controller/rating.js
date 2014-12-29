var db = require("../db");
var _ = require('underscore');

function RatingController() {};


RatingController.prototype.getConfigHandler = {
    handler: function(request, reply) {

        var query_param = {}
        var isGrouped = false;

        if (!(request.query.grouped === undefined)) {
            isGrouped = request.query.grouped;
        }

        console.log(__filename + ' query param ' + JSON.stringify(query_param));

        db.rating.find(query_param).exec(function(err, ratings) {
            console.log("getting all ratings " + JSON.stringify(ratings));
            if (err) {
                reply(err).code(420);
                return;
            }

            reply({
                ratingList: ratings
            });
        });
    }
};

RatingController.prototype.postConfigHandler = {
    handler: function(request, reply) {
        var rating_ids = request.payload.rating_ids || "";
        var review_comment = request.params.comment;

        // find specialist
        db.specialist.findById(request.params.spc_id).exec(function(err, specialistDoc){

            specialist = specialistDoc;

            if (err) {
                reply(err).code(420);
                return;
            }

            if (specialist === null) {
                reply("Specialist not found").code(420);
                return;
            }

            console.log("updating rating for specialist: " + JSON.stringify(rating_ids));

            _.each(specialist.ratings, function(rating){
                console.log(JSON.stringify(rating._id));
                if (rating_ids.indexOf(rating._id) > -1) {
                    rating.count = rating.count + 1;
                    console.log("increment");
                }
            });

            specialist.save();

            reply("done");

        });
    }
};

module.exports = new RatingController();