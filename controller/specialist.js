var Hapi = require('hapi');
var db = require("../db");
var util = require("../util");

function SpecialistController() {};

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

SpecialistController.prototype.getAllByCategoryId = {
    handler: function(request, reply) {

        console.log(__filename + "get specialist by category: " + request.params.cat_id);
        db.specialist.find({
            'categories._id': request.params.cat_id
        }, function(err, data) {
            util.replyHelper.ifError(err, reply);
            reply(data);
        });
    }
};

var specialistController = new SpecialistController();
module.exports = specialistController;