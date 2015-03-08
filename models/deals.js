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
  active: {
        type: Boolean,
        default: true
    }
  }
  );


// export
module.exports = mongoose.model('deals', dealsSchema);
module.exports.schema = dealsSchema;