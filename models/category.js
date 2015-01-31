var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var _ = require("underscore");

// schema
var categorySchema = new Schema({
    category: String,
    sub_category: String,
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