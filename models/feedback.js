var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// schema
var feedbackSchema = new Schema({
    customer_id: String,
    text: String,
});

// export
module.exports = mongoose.model('feedback', feedbackSchema);
module.exports.schema = feedbackSchema;
