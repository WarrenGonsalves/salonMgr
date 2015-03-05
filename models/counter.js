var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// schema
var counterSchema = new Schema({
    job_count: {
        type: Number
    }
});

//statics

counterSchema.statics.initCounter = function() {

    model = this;

    model.findOne({}).exec(function(err, counter) {

        if (counter == null || counter.job_count < 1000) {

            console.log("upsert");

            var query = {
                job_count: {
                    $lt: 1000
                }
            };
            var update = {
                job_count: 1000
            };
            var options = {
                upsert: true
            };

            model.findOneAndUpdate(query, update, options, function(err, counter) {

                if (err) {
                    console.log(err);
                }

                console.log("Counter Model", "init counter", counter.job_count);
            });
        } else {
            console.log("Counter Model", "Y u no like current counter :/ me no change current counter");
        }
    });
};

counterSchema.statics.getNext = function(cb) {
    var query = {};
    var update = {
        $inc: {
            job_count: 1
        }
    };
    var options = {
        upsert: true
    };

    this.findOneAndUpdate(query, update, options, function(err, counter) {

        if (err) {
            console.log(err);
        }

        console.log("Counter Model", counter.job_count);
        cb(err, counter.job_count);
    });
};

// export
module.exports = mongoose.model('counter', counterSchema);
module.exports.schema = counterSchema;