var db = require("../db");
var util = require("../util");
var _ = require('underscore');
var faker = require('faker');

function FakeController() {};

FakeController.prototype.newSpecialistHandler = {
    handler: function(request, reply) {

        var categoryList = [];

        db.category.find({}).exec(function(err, categories) {
            if (err) {
                reply(err).code(420);
                return;
            }
            categoryList = categories.slice();
            console.log(_.sample(categoryList));
        });

        var specialist = new db.specialist();
        specialist.name = faker.name.findName();
        specialist.addr = faker.address.streetAddress() + ", " + faker.address.city() + ", " + faker.address.state();
        specialist.city = faker.address.city();
        specialist.state = faker.address.state();
        specialist.zip = faker.address.zipCode();
        var profilePic = {
            cat: 'profile',
            url: faker.internet.avatar()
        }
        specialist.media.push(profilePic);
        specialist.verified.push('verified PAN on 30-Nov_2014');
        var fbSocial = {
            cat: 'fb',
            social_id: faker.internet.email()
        };
        specialist.social.push(fbSocial);

        specialist.categories.push(_.sample(categoryList));

        specialist.save(function(err, data) {
            if (err) {
                reply(err).code(420);
            } else {
                reply(data);
            }
        });
    }
};

module.exports = new FakeController();