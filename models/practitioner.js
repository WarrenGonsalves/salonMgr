var mongoose = require('mongoose');

var practitionerSchema = new mongoose.Schema({
  name:  { type: String,unique: true},
  image: String,
  portfolio: [{
    description: String,
    image: String
  }],
  description: String,
  trainedBy: String,
  verified: Boolean,
  services: [String]
});

module.exports = mongoose.model('practitioner', practitionerSchema);
