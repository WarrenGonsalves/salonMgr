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

            db.circle.find({}).exec(function(err, circleList) {

                var specialist = fakeSpecialist();

                specialist.categories.push(_.sample(categoryList));

                var circle = _.sample(circleList);
                specialist.circle = circle;
                specialist.circleloc = circle.locs;

                specialist.save(function(err, data) {
                    if (err) {
                        reply(err).code(420);
                    } else {
                        reply(data);
                    }
                });
            })
        });
    }
};

function fakeSpecialist() {
    var specialist = new db.specialist();
    specialist.name = faker.name.findName();
    specialist.addr = faker.address.streetAddress() + ", " + faker.address.city() + ", " + faker.address.state();
    specialist.city = faker.address.city();
    specialist.state = faker.address.state();
    specialist.zip = faker.address.zipCode();
    specialist.phone = 9920111222;
    specialist.profile_img = faker.internet.avatar();
    specialist.ratings.push({rating_id: '549bc0bc0a76cb000015f4f7', count: 0});
    specialist.ratings.push({rating_id: '549bc0ff0a76cb000015f4f8', count: 0});
    specialist.ratings.push({rating_id: '549bc1070a76cb000015f4f9', count: 0});
    // specialist.review_ids.push('549a67d4e09d82991a1df781');
    // specialist.review_ids.push('549a67e5e09d82991a1df782');
    // specialist.review_ids.push('549a6804e09d82991a1df783');
    specialist.family = "Married, 3 kids. 2 daughters and one son."
    specialist.hourly_rate = '₹ 350/hr';
    specialist.consulting_fee = '₹ 200/hr';
    specialist.services = "Furniture, Polishing, Interior, Plumbing, Laundry, Carpentary, Painting, Wiring, Cabling";
    // var profilePic = {
    //     cat: 'profile',
    //     url: faker.internet.avatar()
    // }
    // specialist.media.push(profilePic);
    specialist.verified = 'verified PAN on 30-Nov_2014';
    var fbSocial = {
        cat: 'fb',
        social_id: faker.internet.email()
    };
    specialist.social.push(fbSocial);

    return specialist;
}

module.exports = new FakeController();