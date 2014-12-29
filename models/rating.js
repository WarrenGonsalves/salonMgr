var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// schema
var ratingSchema = new Schema({
    text: String,
    count: {
        type: Number,
        default: 0
    }
});

// export
module.exports = mongoose.model('rating', ratingSchema);
module.exports.schema = ratingSchema;