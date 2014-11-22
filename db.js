var Mongoose = require('mongoose');
var config = require('./config/constants');
var category = require('./models/meta_category');
var specialist = require('./models/specialist');
var store = require('./models/store');
var job = require('./models/jobs');

//load database
Mongoose.connect(config.mongo.connecturl);
var db = Mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log("Connection with database succeeded.");
});

exports.Mongoose = Mongoose;
exports.db = db;
exports.category = category;
exports.specialist = specialist;
exports.store = store;
exports.job = job;