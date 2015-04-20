var mongoose = require("mongoose")
var Schema = mongoose.Schema
var util = require('../util')

// schema
var schema = new Schema({
    date: Date,
    status: {
        type: String,
        enum: ['Complete', 'Next', 'Pending'],
        default: 'Pending'
    },
    contract_id: String,
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
schema
    .virtual('visit_date_milli')
    .get(function() {
        return Date.parse(this.date);
    });

schema
    .virtual('visit_date_display')
    .get(function() {
        return util.formatter.toDisplayDate(this.date)
    });

// export
module.exports = mongoose.model('visit', schema);
module.exports.schema = schema;