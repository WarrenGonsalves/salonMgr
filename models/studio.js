var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var categoryModel = require("./category");
var _ = require("underscore");

// schema
var studioSchema = new Schema({
  	name: String,
    email: String,
  	phone: String,
  	type: {type: String, enum: ['salon','spa','stylist']},
  	circle: Schema.Types.Mixed,
  	circleloc: Schema.Types.Mixed,
  	categories: [{
      	type: Schema.Types.ObjectId,
     	ref: 'category'
  	}],
  	features: [{
      	type: String,
      	enum: ['ac','home','pick&drop']
  	}],
  	images: [{
      	name: String,
      	url: String
  	}],
  	created_date: {
    	type: Date,
    	default: Date.now()
  	},
  	updated_date: Date,
}, {
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

// export
module.exports = mongoose.model('studio', studioSchema);