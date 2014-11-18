var Hapi = require('hapi');
var db = require("../db");
var util = require("../util");

function SpecialistController() {};

/**
 * [postConfigHandler: helper method to create a dummy sepcialist record]
 * @type {Object}
 */
SpecialistController.prototype.postConfigHandler = {
    handler: function(request, reply) {

        db.category.findOne({
            _id: request.params.cat
        }, function(err, data) {
            console.log("creating a specialist with name: " + data);
            var specialist = new db.specialist();
            specialist.name = request.params.fname;
            specialist.address1 = "address 1";
            specialist.address2 = "address 2";
            specialist.city = "my city";
            specialist.categories.push(data);
            specialist.save();
            reply(specialist);
        });
    }
};

/**
 * [getAllByCategoryId: given a category_id find all specialists ]
 */
SpecialistController.prototype.getAllByCategoryId = {
    handler: function(request, reply) {

        console.log(__filename + "get specialist by category: " + request.params.cat_id);
        db.specialist.find({
            'categories._id': request.params.cat_id
        }, function(err, data) {
            util.replyHelper.ifError(err, reply);
            reply({
                specialist_list: data
            });
        });
    }
};

/**
 * [getAllAvailableByCategory: given a category_id and start time find a specialist who is free for that timeslot.]
 * @type {Object}
 */
SpecialistController.prototype.getAllAvailableByCategory = {
    handler: function(request, reply) {

        console.log(__filename + "get all available specialists by category: " + request.params.cat_id + " : time ");
        db.specialist.find({
            'categories._id': request.params.cat_id
        }, function(err, data) {
            util.replyHelper.ifError(err, reply);
            reply({
                specialist_list: data
            });
        });
    }
};

var specialistController = new SpecialistController();
module.exports = specialistController;