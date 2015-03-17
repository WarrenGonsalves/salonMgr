var logger = require('./logger');
var _ = require('underscore');

module.exports.toHTML = function toHTML(model) {

    console.log("formatter ----------", model);

    model = model.toObject();

    var html = "";

    _.each(model, function(value, key){
        html += key + " - " + value + "<br>"
    });

    return html;
}