var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// schema
var txnSchema = new Schema({
    job_id: String,
    data: String
}, {
    toJSON: {
        virtuals: true
    }
});

// export
module.exports = mongoose.model('txn', txnSchema);
module.exports.schema = txnSchema;