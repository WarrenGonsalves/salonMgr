var Mongoose = require('mongoose');
var config = require('./config/constants');
var models = require('./models');

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