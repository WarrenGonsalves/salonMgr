var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var _ = require("underscore");

// schema
var categorySchema = new Schema({
    service: String, // category name
    title: String, // subcategory id
    grade: [{type: String, enum: ['a+','a','a-']}], // service name
    variation: String, // attribute1 name
    variationTitle: String, // attribute2 name
    variationType: String, // attribute2 name
    icon: String, // icon
    time: String,
    description: String,
    active: {
        type: Boolean,
        default: true
    },
    trending: String,
    customerType: String,
    price: {type: Number, default: 0.00, set: setPrice }
},{
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    },
    id: false
});
function setPrice(num){
    return num.toFixed(2);
}
// export
module.exports = mongoose.model('category', categorySchema);
module.exports.categorySchema = categorySchema;