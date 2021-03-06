var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

// schema
var customerSchema = new Schema({
    name: String,
    ph: String,
    addr: String,
    email: String,
    apn_id: String,
    gcm_id: String,
    secret: String,
    shopify_id: String,
    shopify_address_id: String,
    city: String,
    society: String,
    wing: String,
    apt: String,
    identifier: String,
    laundry_provider: String,
    is_shopify: {
        type: Boolean,
        default: false
    },
    notify_sms: {
        type: Boolean,
        default: true
    },
    isSP: {
        type: Boolean,
        default: false
    },
    isAuth: {
        type: Boolean,
        default: false
    },
    created_date: {
        type: Date,
        default: Date.now
    }
})

// methods
customerSchema.methods.toJSON = function() {
    var obj = this.toObject()
        //delete obj.secret
    return obj
}

// methods
customerSchema.methods.initSecret = function() {
    var hash = bcrypt.hashSync(String(this._id), 10);
    this.secret = hash;
    this.save()
    return;
}

customerSchema.methods.setSecret = function(mySecret) {
    var hash = bcrypt.hashSync(String(mySecret), 10);
    this.secret = hash;
    this.save()
    return;
}

customerSchema.methods.isValidSecret = function(mySecret) {
    console.log("model-- " + this.secret)
    return bcrypt.compareSync(mySecret, this.secret);
}

customerSchema.methods.getStreetAddress = function(mySecret) {
    var address = this.society + ", " + this.wing + " - " + this.apt
    console.log("model-- " + address)
    return address
}

// export
module.exports = mongoose.model('customer', customerSchema);
module.exports.schema = customerSchema;