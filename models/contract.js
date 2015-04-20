var mongoose = require("mongoose")
var Schema = mongoose.Schema
var util = require('../util')

// schema
var contractSchema = new Schema({
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: 'customer'
    },
    contract_img: String,
    contract_type: {
        type: String,
        enum: ['Appliance']
    },
    device_type: String,
    vendor: String,
    phone: String,
    start_date: Date,
    end_date: Date,
    visits_remaining: Number,
    description: String,
    is_processed: {
        type: Boolean,
        default: false
    },
    visits: [{
        type: Schema.Types.ObjectId,
        ref: 'visit'
    }],
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

contractSchema
    .virtual('start_date_display')
    .get(function() {
        return util.formatter.toDisplayDate(this.start_date)
    });

contractSchema
    .virtual('end_date_display')
    .get(function() {
        return util.formatter.toDisplayDate(this.end_date)
    });

// export
module.exports = mongoose.model('contract', contractSchema);
module.exports.schema = contractSchema;