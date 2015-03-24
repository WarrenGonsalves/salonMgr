var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var moment = require('moment');
var momenttz = require('moment-timezone');

var counter = require('./counter');
var db = require('../db');
// schema
var jobSchema = new Schema({
    status: {
        type: String,
        enum: ['New', 'Accepted', 'Estimated', 'Started', 'Finished', 'Cancelled', 'Invoiced'],
        default: 'New'
    },
    is_shopify: {
        type: Boolean,
        default: false
    },
    shopify_order: Schema.Types.Mixed,
    shopify_customer_id: String,
    estimate: String,
    estimate_cost: String,
    job_id: String,
    invoice_id: String,
    booking_slot_id: String,
    specialist_id: String,
    specialist_name: String,
    specialist_category: String,
    specialist_ph: String,
    specialist_image: String,
    cust_id: String,
    cust_name: String,
    cust_ph: String,
    cust_email: String,
    cust_addr1: String,
    cust_addr2: String,
    cust_addr_landmark: String,
    cust_task: String,
    book_date: Date,
    images: [String],
    history: [Schema.Types.Mixed],
    complete: {
        type: Boolean,
        default: false
    },
    cancelled: {
        type: Boolean,
        default: false
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    last_updated: {
        type: Date,
        default: Date.now
    },
    complete_date: Date
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    },
    id: false
})

//virtuals
jobSchema
    .virtual('book_date_millisecs')
    .get(function() {
        return Date.parse(this.book_date);
    });

jobSchema
    .pre('save', function(next) {

        if (this.isNew) {
            if (this.status == "New") {
                this.logHistory("Booked");
            }
        }

        if (this.isModified('status')) {

            console.log(" ------ updating job  ------ ", this.status);

            this.logHistory(this.status);

            if (this.status == "Finished") {
                this.complete = true;
            }

            if (this.status == "Cancelled") {
                this.complete = true;
                this.cancelled = true;
            }
        }

        this.last_updated = new Date;

        next();

    });

// statics
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

// methods
jobSchema.methods.setJobId = function() {

    var currJob = this;

    db.counter.getNext(function(err, count) {
        currJob.job_id = count;
        currJob.save();
    });
}


jobSchema.methods.logHistory = function(data) {
    var logData = {
        status: data,
        time: momenttz().tz('Asia/Kolkata').format('Do MMM YYYY, h:mm:ss a')
    };

    this.history.push(logData);
};

// export
module.exports = mongoose.model('job', jobSchema);
module.exports.schema = jobSchema;