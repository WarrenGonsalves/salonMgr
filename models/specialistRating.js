var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// schema
var specialistRatingSchema = new Schema({
    rating_id: {
      type: Schema.Types.ObjectId,
      ref: 'rating'
    },
    count: Number
});

// export
module.exports = mongoose.model('specialistRating', specialistRatingSchema);
module.exports.schema = specialistRatingSchema;