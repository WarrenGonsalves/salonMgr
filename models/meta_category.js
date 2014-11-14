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
    this.find({}, function(err, services) {
        if (err) {
            cb(err, services);
            return;
        }

        grouped = _.groupBy(services, function(value){
            return value.category
        });

        mapped = _.map(grouped, function(value){
            var newValue = {'category': value[0].category,
                'sub_categories': value};
            return newValue;
        })

        cb(err, mapped)
    });
}

// export
module.exports = mongoose.model('category', categorySchema);