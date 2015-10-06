var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var _ = require("underscore");

// schema
var couponSchema = new Schema({
  code: String, // coupon Code
  description: String,
  discount: Number, // percent
  max_amount: Number, // max discount amount
  created_date: {
    type: Date,
    default: Date.now()
  },
  valid_from:  {
    type: Date,
    default: Date.now()
  },
  valid_to:  {
    type: Date,
    default: Date.now()
  },
  active: {
        type: Boolean,
        default: true
    }
  }, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    },
    id: false
  }
  );

//virtuals
couponSchema
    .virtual('valid_to_millisecs')
    .get(function() {
        return Date.parse(this.valid_to);
});

couponSchema
    .virtual('valid_from_millisecs')
    .get(function() {
        return Date.parse(this.valid_from);
});

// export
module.exports = mongoose.model('coupons', couponSchema);
module.exports.schema = couponSchema;