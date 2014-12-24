var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// schema
var jobSchema = new Schema({
    specialist_id: String,
    cust_id: String,
    cust_name: String,
    cust_ph: String,
    cust_addr: String,
    cust_task: String,
    book_date: Date,
    images: [String],
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
jobSchema.statics.createNew = function(specialist_id, cust_id, cust_name, cust_ph, cust_addr, cust_task, book_date, cb) {
    doc = {
        'specialist_id': specialist_id,
        'cust_id': cust_id,
        'cust_name': cust_name,
        'cust_ph': cust_ph,
        'cust_addr': cust_addr,
        'cust_task': cust_task,
        'book_date': book_date
    }
    console.log(__filename + "creating new job: " + doc);
    this.create(doc, cb);
}

// export
module.exports = mongoose.model('job', jobSchema);
module.exports.schema = jobSchema;