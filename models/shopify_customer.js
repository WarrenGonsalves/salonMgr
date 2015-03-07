var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// schema
var s_customer = new Schema({
    shopify_id: String,
    phone: String,
    city: String,
    society: String,
    wing: String,
    apt: String,
    identifier: String
});

// export
module.exports = mongoose.model('shopify_customer', s_customer);
module.exports.schema = s_customer;