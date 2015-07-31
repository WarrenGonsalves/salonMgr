var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var _ = require("underscore");

// schema
var categorySchema = new Schema({
    parent: String, // parent category id
    category: String, // category name
    icon: String, // icon
    active: {
        type: Boolean,
        default: true
    },
    order: Number,
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