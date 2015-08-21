var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var _ = require("underscore");

// schema
var categorySchema = new Schema({
<<<<<<< HEAD
    category: String,
    display: String,
    sub_category: String,
=======
    parent: String, // parent category id
    category: String, // category name
    icon: String, // icon
>>>>>>> 26bf8858c57c88ab34ff16a23f9d41f9f43974c2
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