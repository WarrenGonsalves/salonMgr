var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// schema
var jobSchema = new Schema({
    specialist_id: String,
    cust_name: String,
    cust_ph: String,
    cust_addr: String,
    cust_task: String,
    complete: {
        type: Boolean,
        default: false
    },
    created_date: {
        type: Date,
        default: Date.now()
    }
})

//methods
jobSchema.statics.createNew = function(specialist_id, cust_name, cust_ph, cust_addr, cust_task, cb) {
    console.log(__filename + "creating new job");
    doc = {
        'specialist_id': specialist_id,
        'cust_name': cust_name,
        'cust_ph': cust_ph,
        'cust_addr': cust_addr,
        'cust_task': cust_task
    }
    console.log(__filename + "creating new job: " + doc);
    this.create(doc, cb);
}

// export
module.exports = mongoose.model('job', jobSchema);
module.exports.schema = jobSchema;