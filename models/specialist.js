var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var categoryModel = require("./meta_category");
var _ = require("underscore");

// schema
var specialistSchema = new Schema({
  specialist_id: Number,
  name: String,
  store: [{
    store_id: String
  }],
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip: Number,
  country: String,
  contacts: [{
    contactType: String,
    contact: String
  }],
  locs: {
    type: [Number],
    index: '2dsphere'
  },
  media: [{
    media: String,
    mediaType: String,
    isProfile: Boolean
  }],
  average_rating: Number,
  review_count: Number,
  categories: [categoryModel.categorySchema],
  created_date: Date,
  updated_date: Date,
  created_by: Number,
  updated_by: Number

})

// methods
specialistSchema.statics.getAll = function(cb) {
  console.log(__filename + "get all specialist ");
  this.find({}, cb);
}

specialistSchema.statics.getByCategory = function(sub_category, cb) {
  console.log(__filename + "get specialist by category: " + sub_category);
  this.find({'categories.specialist_title': sub_category}, cb);
}

specialistSchema.statics.getDistinctCat = function(cb) {
  console.log(__filename + "get distinct category ");
  this.find({},'categories.specialist_l1_title categories.specialist_title').where("categories.specialist_l1_title").ne(null).find(cb);
}

// export
module.exports = mongoose.model('specialist', specialistSchema);
