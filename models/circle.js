var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// schema
var circleSchema = new Schema({
    name: String,
    locs: {
        type: [Number],
        index: '2dsphere'
    }
})

//methods

// export
module.exports = mongoose.model('circle', circleSchema);
module.exports.schema = circleSchema;