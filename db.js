var Mongoose = require('mongoose');
var config = require('./config/constants');
var models = require('./models');
var _ = require('underscore')

//load database
Mongoose.connect(config.mongo.connecturl);
var db = Mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log("Connection with database succeeded.");
});

exports.Mongoose = Mongoose;
exports.db = db;
exports.category = models.category;
exports.specialist = models.specialist;
exports.store = models.store;
exports.job = models.job;
exports.authCode = models.authcode;
exports.customer = models.customer;
exports.job = models.job;
exports.circle = models.circle;
exports.booking = models.booking;
exports.rating = models.rating;
exports.specialistRating = models.specialistRating;
exports.invoice = models.invoice;
exports.logger = models.logger;
exports.feedback = models.feedback;
exports.shopify_customer = models.shopify_customer;
exports.counter = models.counter;
exports.deals = models.deals;
exports.contract = models.contract;
exports.tnx = models.transaction;
exports.catalog = models.catalog;
exports.order = models.order;
exports.product = models.product
exports.image = models.image
exports.visit = models.visit

exports.decorateModel = function(model, modelInstance, fieldMap) {

    var model_metadata = model.schema.paths;

    // process all updates fields.
    _.each(fieldMap, function(field_value, field_key) {
        console.log("decorateModel", field_key, field_value);

        if (model_metadata[field_key]) {

            var datatype = String(model_metadata[field_key].options.type);

            if ("String" == model_metadata[field_key].instance) {
                console.log(field_key, "is a string");
                modelInstance[field_key] = field_value;
            } else if (datatype.indexOf("Boolean") != -1) {
                console.log(field_key, "is a boolean");
                modelInstance[field_key] = field_value;
            } else if (datatype.indexOf("Number") != -1) {
                console.log(field_key, "is a Number");
                modelInstance[field_key] = field_value;
            }

        } else {
            console.log("decorateModel ", "cannot find key ", field_key)
        }

        return modelInstance;
    });
}

exports.isValidObjectId = function(obj_id) {
    return Mongoose.Types.ObjectId.isValid(obj_id)
}