var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var moment = require('moment');
var momenttz = require('moment-timezone');

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
    estimate: String,
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
    history: [String],
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
        if (this.isModified('status')) {
            this.logHistory('status - ' + this.status);

            if (this.status == "Finished") {
                this.complete = true;
            }

            if (this.status == "Cancelled") {
                this.complete = true;
                this.cancelled = true;
            }
        }
        next();
    });

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

jobSchema.methods.logHistory = function(data) {
    this.history.push(momenttz().tz('Asia/Kolkata').format('MMM Do, h:mm:ss a') + ' : ' + data);
};

// export
module.exports = mongoose.model('job', jobSchema);
module.exports.schema = jobSchema;