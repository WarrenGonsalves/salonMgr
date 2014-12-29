var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var _ = require("underscore");

var SPECIALIST_BY_CATEGORY_HREF = "/specialists/bycategory/"

// schema
var categorySchema = new Schema({
    category: String,
    sub_category: String
}, {
    id: false
});

// methods
categorySchema.statics.createNew = function(category, subCategory, cb) {
    console.log("CATEGORY_DAO: creating cateogry " + category + subCategory);
    doc = {
        "category": category,
        "sub_category": subCategory
    }
    this.create(doc, cb);
}

categorySchema.statics.getAll = function(cb) {
    console.log("CATEGORY_DAO: get all");
    this.find({}).select('category sub_category').sort('category sub_category').find(function(err, services) {
        if (err) {
            cb(err, services);
            return;
        }

        services = _.map(services, function(data) {
            data = data.toJSON();
            data.href = SPECIALIST_BY_CATEGORY_HREF + data._id;
            return data;
        });

        // group services by category
        services = _.groupBy(services, function(data) {
            return data.category;
        });

        // re-map json structure to match requirement
        services = _.map(services, function(data) {
            var mappedValue = {
                'category': data[0].category,
                'sub_categories': data
            };
            return mappedValue;
        })

        cb(err, services)
    });
}

categorySchema.statics.getDistinctServices = function(cb) {
    console.log(__filename + "Distinct Services");
    this.find({}, cb);
}

// export
module.exports = mongoose.model('category', categorySchema);
module.exports.categorySchema = categorySchema;