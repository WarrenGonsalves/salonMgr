var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var _ = require("underscore");

// schema
var categorySchema = new Schema({
    parent: String,
    category: String,
    active: {
        type: Boolean,
        default: true
    },
    order: Number,
}, {
    id: false
});

// export
module.exports = mongoose.model('category', categorySchema);
module.exports.categorySchema = categorySchema;