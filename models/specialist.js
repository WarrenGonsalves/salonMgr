var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var categoryModel = require("./category");
var _ = require("underscore");
var ratingModel = require("./rating");

// schema
var specialistSchema = new Schema({
  name: String,
  phone: String,
  profile_img: String,
  consulting_fee: String,
  referral_customer: String,
  addr: String,
  city: String,
  state: String,
  zip: String,
  verified: String,
  family: String,
  services: String,
  shopify_product_id: String,
  is_shopify: {
    type: Boolean,
    default: false
  },
  is_deal: {
    type: Boolean,
    default: false
  },
  circle: Schema.Types.Mixed,
  circleloc: Schema.Types.Mixed,
  ratings: [ratingModel.schema],
  stores: [{
    store_id: String
  }],
  available: {
    type: Boolean,
    default: true
  },
  work_hours: {
    type: String,
    default: '8:00 am to 10:00 pm'
  },
  jobs: [{
    type: Schema.Types.ObjectId,
    ref: 'job'
  }],
  current_job: {
    type: Schema.Types.ObjectId,
    ref: 'job'
  },
  social: [{
    cat: String,
    social_id: String
  }],
  media: [{
    cat: String,
    url: String
  }],
  average_rating: Number,
  review_count: Number,
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'category'
  }],
  active: {
    type: Boolean,
    default: true
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  updated_date: Date,
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  },
  id: false
});

specialistSchema.index({
  circleloc: '2dsphere'
});

// virtuals
specialistSchema
  .virtual('experience')
  .get(function() {
    return '8 years of experience.';
  });

// methods
specialistSchema.statics.getAll = function(cb) {
  console.log(__filename + "get all specialist ");
  this.find({}, cb);
}

specialistSchema.statics.getByCategory = function(sub_category, cb) {
  console.log(__filename + "get specialist by category: " + sub_category);
  this.find({
    'categories.specialist_title': sub_category
  }, cb);
}

specialistSchema.statics.getDistinctCat = function(cb) {
  console.log(__filename + "get distinct category ");
  this.find({}, 'categories.specialist_l1_title categories.specialist_title').where("categories.specialist_l1_title").ne(null).find(cb);
}

// export
module.exports = mongoose.model('specialist', specialistSchema);