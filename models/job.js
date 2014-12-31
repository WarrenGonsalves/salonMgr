var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// schema
var jobSchema = new Schema({
    specialist_id: String,
    specialist_name: String,
    specialist_category: String,
    specialist_ph: String,
    cust_id: String,
    cust_name: String,
    cust_ph: String,
    cust_addr1: String,
    cust_addr2: String,
    cust_addr_landmark: String,
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
    },
    complete_date: Date
})

//methods
jobSchema.statics.createNew = function(specialist_id, cust_id, cust_name, cust_ph, cust_addr1, cust_addr2, cust_addr_landmark, cust_task, book_date, cb) {
    doc = {
        'specialist_id': specialist_id,
        'cust_id': cust_id,
        'cust_name': cust_name,
        'cust_ph': cust_ph,
        'cust_addr1': cust_addr1,
        'cust_addr2': cust_addr2,
        'cust_addr_landmark': cust_addr_landmark,
        'cust_task': cust_task,
        'book_date': book_date
    }
    console.log(__filename + "creating new job: " + doc);
    this.create(doc, cb);
}

// export
module.exports = mongoose.model('job', jobSchema);
module.exports.schema = jobSchema;