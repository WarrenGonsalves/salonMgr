var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// schema
var reviewSchema = new Schema({
    text: String,
});

//methods

// export
module.exports = mongoose.model('review', reviewSchema);
module.exports.schema = reviewSchema;