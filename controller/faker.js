var db = require("../db");
var util = require("../util");
var _ = require('underscore');
var faker = require('faker');
var server = require('../server');

function FakeController() {};

FakeController.prototype.productsHandler = {
    handler: function(request, reply) {

        var sample_prods = []
        sample_prods.push({
            name: 'tshirt',
            price: 10,
            active: true
        })
        sample_prods.push({
            name: 'jeans',
            price: 20,
            active: true
        })
        sample_prods.push({
            name: 'suit',
            price: 100,
            active: true
        })
        sample_prods.push({
            name: 'saree',
            price: 40,
            active: true
        })
        sample_prods.push({
            name: 'salwar',
            price: 50,
            active: true
        })
        sample_prods.push({
            name: 'dress',
            price: 150,
            active: true
        })

        _.each(sample_prods, function(prod_item) {
            var product = new db.product()
            db.decorateModel(db.product, product, prod_item)
            product.specialist_id = request.params.specialist_id
            product.img_s = faker.image.technics()
            product.img_l = faker.image.technics()
            product.save()
        })

        reply("ok");
    }
}

FakeController.prototype.invoiceHandler = {
    handler: function(request, reply) {

        request = {
            url: '/invoices',
            method: 'POST',
            payload: {
                job_id: request.params.job_id,
                total: 9000,
                'line_item[]': {
                    item: 'lights',
                    amount: 6000
                },
                'line_item[]': {
                    item: 'cabling',
                    amount: 6000
                }
            }
        }

        server.inject(request, function(res) {
            console.log("response from post invoice: " + res);
        });
    }
};

FakeController.prototype.newSpecialistHandler = {
    handler: function(request, reply) {

        db.category.find({}).exec(function(err, categoryList) {

            if (err) {
                reply(err).code(420);
                return;
            }

            db.circle.find({}).exec(function(err, circleList) {

                db.rating.find({}).exec(function(err, ratings) {

                    var specialist = fakeSpecialist();

                    specialist.categories.push(_.sample(categoryList)._id);

                    var circle = _.sample(circleList);
                    specialist.circle = circle;
                    specialist.circleloc = circle.locs;

                    _.each(ratings, function(rating) {
                        specialist.ratings.push(rating);
                    })

                    specialist.save(function(err, data) {
                        if (err) {
                            reply(err).code(420);
                        } else {
                            reply(data);
                        }
                    });

                });
            });
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
    specialist.phone = 992011 + util.authUtil.generateAuthCode();
    specialist.profile_img = faker.internet.avatar();
    specialist.family = "Married, 3 kids. 2 daughters and one son."
    specialist.consulting_fee = 'Minimum of ₹ 200';
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