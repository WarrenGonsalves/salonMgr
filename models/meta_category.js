var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var _ = require("underscore");

// schema
var categorySchema = new Schema({
    category: String,
    sub_category: String
})

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

        // group services by category
        grouped = _.groupBy(services, function(value) {
            return value.category
        });

        // re-map json structure to match requirement
        mapped = _.map(grouped, function(value) {
            var mappedValue = {
                'category': value[0].category,
                'sub_categories': value
            };
            return mappedValue;
        })

        cb(err, mapped)
    });
}

categorySchema.statics.getDistinctServices = function(cb) {
    console.log(__filename + "Distinct Services");
    this.find({},cb);
}


// export
module.exports = mongoose.model('category', categorySchema);
module.exports.categorySchema = categorySchema;