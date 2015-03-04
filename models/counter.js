var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// schema
var counterSchema = new Schema({
    city: String,
    name: String,
});

//methods

// export
module.exports = mongoose.model('counter', counterSchema);
module.exports.schema = counterSchema;