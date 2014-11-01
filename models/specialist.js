var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var SpecialistSchema = new Schema({
  specialist_id: Number,
  name: String,
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip: Number,
  country: String,
  phone_number: Number,
  locs: {
    type: [Number],
    index: '2dsphere'
  },
  image: String,
  average_rating: Number,
  review_count: Number,
  service_type: String,
  created_date: Date,
  updated_date: Date,
  created_by: Number,
  updated_by: Number
})

mongoose.model("Specialist", SpecialistSchema)