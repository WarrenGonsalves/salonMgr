var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var _ = require("underscore");

// schema
var categorySchema = new Schema({
    category: String, // category name
    subcategory: String, // subcategory id
    service: String, // service name
    attribute1: String, // attribute1 name
    attribute2: String, // attribute2 name
    icon: String, // icon
    service_time: String,
    active: {
        type: Boolean,
        default: true
    },
    order: Number
},{
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    },
    id: false
});

// export
module.exports = mongoose.model('category', categorySchema);
module.exports.categorySchema = categorySchema;