var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var _ = require("underscore");

// schema
var contractSchema = new Schema({
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: 'customer'
    },
    contract_img: String,
    created_date: {
        type: Date,
        default: Date.now
    }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    },
    id: false
});

//virtuals
contractSchema
    .virtual('create_date_milli')
    .get(function() {
        return Date.parse(this.created_date);
    });

// export
module.exports = mongoose.model('contract', contractSchema);
module.exports.schema = contractSchema;