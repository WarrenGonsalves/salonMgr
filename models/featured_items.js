var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var _ = require("underscore");

// schema
var featuredItemsSchema = new Schema({
  item_id: Schema.Types.ObjectId,
  title: String,
  img: String,
  url: String,
  rating: String,
  category: String,
  type: String,
  created_date: {
    type: Date,
    default: Date.now()
  }
});

// export
module.exports = mongoose.model('featured_items', featuredItemsSchema);
module.exports.schema = featuredItemsSchema;