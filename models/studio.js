var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var categoryModel = require("./category");
var _ = require("underscore");
// var practitioners = require("./practitioner");

// schema
var studioSchema = new Schema({
  	name: String,
    email: String,
  	phone: String,
    profile_img: String,
    description: String,
    likes: Number,
  	type: [{type: String, enum: ['salon','spa','stylist']}],
  	circle: Schema.Types.Mixed,
  	circleloc: Schema.Types.Mixed,
    services: [{
       id: {
          type: Schema.Types.ObjectId,
          ref: 'category'
        },
        price: {type: Number, default: 0.00, set: setPrice },
        service_time: String,
        attributetype:String,
        attributeArray:Schema.Types.Mixed
        
    }],
    products: [{type: String}],
  	features: [{type: String}],
  	images: [{
      	name: String,
      	url: String
  	}],
  	created_date: {
    	type: Date,
    	default: Date.now()
  	},
  	updated_date: Date,
    practitioners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'practitioner'}],
    ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'rating'}]
}, 
{strict: false},
{
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  },
  id: false
});

studioSchema.index({
  	circleloc: '2dsphere'
});

function setPrice(num){
    return num.toFixed(2);
}

// export
module.exports = mongoose.model('studio', studioSchema);