var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// schema
var circleSchema = new Schema({
    city: String,
    name: String,
    locs: {
        'type': {
            type: String,
            default: 'Point'
        },
        coordinates: [Number]
    }
}, {
    toJSON: {
        virtuals: true
    }
});

// virtuals
circleSchema
    .virtual('lng')
    .get(function() {
        return this.locs.coordinates[0];
    });

circleSchema
    .virtual('lat')
    .get(function() {
        return this.locs.coordinates[1];
    });

circleSchema.index({
    locs: '2dsphere'
});

//methods

// export
module.exports = mongoose.model('circle', circleSchema);
module.exports.schema = circleSchema;