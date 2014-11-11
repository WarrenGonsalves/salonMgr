var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var RatingAndReviewSchema = new Schema({
  rating_id: Number,
  customer_id: Number,
  specialist_id: Number,
  org_id: Number,
  schedule_id: Number,
  rating: Number,
  review: String,
  created_date: Date,
  updated_date: Date,
  created_by: Number,
  updated_by: Number
    //date            : { type: Date, set: setDateWithFormat },
    //start_time  : { type: Date, set: setStartTimeWithFormat },
    //end_time        : { type: Date, set: setEndTimeWithFormat },

})

var RatingAndReview = mongoose.model("RatingAndReview", RatingAndReviewSchema)