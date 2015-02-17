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

// methods
customerSchema.methods.isValidSecret = function(mySecret) {
    console.log("model-- " + this.secret)
    return bcrypt.compareSync(mySecret, this.secret);
}

// export
module.exports = mongoose.model('customer', customerSchema);
module.exports.schema = customerSchema;