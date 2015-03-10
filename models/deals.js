var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var _ = require("underscore");

// schema
var dealsSchema = new Schema({
  deal_id: String,
  deal_title: String,
  deal_detail: String,
  category: String,
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
  deal_price: String,
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
dealsSchema
    .virtual('valid_to_millisecs')
    .get(function() {
        return Date.parse(this.valid_to);
});

dealsSchema
    .virtual('valid_from_millisecs')
    .get(function() {
        return Date.parse(this.valid_from);
});

// export
module.exports = mongoose.model('deals', dealsSchema);
module.exports.schema = dealsSchema;