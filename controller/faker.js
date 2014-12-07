var db = require("../db");
var util = require("../util");
var _ = require('underscore');
var faker = require('faker');

function FakeController() {};

FakeController.prototype.newSpecialistHandler = {
    handler: function(request, reply) {

        db.category.find({
            'category': 'Fixers'
        }).exec(function(err, categoryList) {

            if (err) {
                reply(err).code(420);
                return;
            }

            var specialist = new db.specialist();
            specialist.name = faker.name.findName();
            specialist.addr = faker.address.streetAddress() + ", " + faker.address.city() + ", " + faker.address.state();
            specialist.city = faker.address.city();
            specialist.state = faker.address.state();
            specialist.zip = faker.address.zipCode();
            specialist.phone = 9920111222;
            specialist.profile_img = faker.internet.avatar();
            specialist.family  = "Married, 3 kids. 2 daughters and one son."
            // var profilePic = {
            //     cat: 'profile',
            //     url: faker.internet.avatar()
            // }
            // specialist.media.push(profilePic);
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

        });


    }
};

module.exports = new FakeController();