var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var OrganizationSchema = new Schema({
                          org_id                : Number,
                          name                  : String,
                          address1              : String,
                          address2              : String,
                          city                  : String,
                          state                 : String,
                          zip                   : Number,
                          country               : String,
                          phone_number          : Number,
                          locs                  : { type: [Number], index: '2dsphere'}, 
                          image                 : String,
                          average_rating        : Number,
                          review_count          : Number,
                          service_type          : String,
                          created_date          : Date,
                          updated_date          : Date,
                          created_by            : Number,
                          updated_by            : Number
                        })

OrganizationSchema.index({ locs: '2dsphere' });

mongoose.model("Organization",OrganizationSchema)
