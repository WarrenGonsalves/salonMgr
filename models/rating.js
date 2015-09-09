var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// schema
var ratingSchema = new Schema({
    text: String,
    count: {
        type: Boolean,
        default: true
    }
}, {
    id: false
});

// export
module.exports = mongoose.model('rating', ratingSchema);
module.exports.schema = ratingSchema;