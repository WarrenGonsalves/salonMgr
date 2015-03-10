var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var _ = require("underscore");

// schema
var contractSchema = new Schema({
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: 'customer'
    },
    contract_img: String
});

// export
module.exports = mongoose.model('contract', contractSchema);
module.exports.schema = contractSchema;