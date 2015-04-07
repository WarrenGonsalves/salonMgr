﻿var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var catalogSchema = new Schema({
    specialist_id: String,
    name: String,
    detail: String,
    price: Number,
    icon_size_image: String, 
    medium_image: String,
    delete_status: {
        type: Number,
        default: 0
    }
});

// export
module.exports = mongoose.model('catalog', catalogSchema);
module.exports.schema = catalogSchema;