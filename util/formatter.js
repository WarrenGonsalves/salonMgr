var logger = require('./logger');
var _ = require('underscore');
var moment = require('moment');
var momenttz = require('moment-timezone');

module.exports.toHTML = function toHTML(model) {

    console.log("formatter ----------", model);

    if (model) {
        model = model.toObject();
        var html = "";

        _.each(model, function(value, key) {
            html += key + " - " + value + "<br>"
        });

        return html;


    } else {
        return "null";
    }    
}

module.exports.toDisplayDate = function (date) {
    return momenttz(date).tz('Asia/Kolkata').format('Do MMM YYYY');
}

module.exports.toDisplayTime = function (date) {
    return momenttz(date).tz('Asia/Kolkata').format('h:mm a');
}

module.exports.toDisplayTimeRange = function (date) {
    return momenttz(date).tz('Asia/Kolkata').format('h:mm a') + " - " + momenttz(date).add(2, 'h').tz('Asia/Kolkata').format('h:mm a')
}