var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var SchedulesSchema = new Schema({
                          schedule_id       : Number,
                          org_id            : Number,
                          customer_id       : Number,
                          specialist_id     : Number,
                          appointment_date  : Date,
                          start_time        : Date,
                          end_time          : Date,
                          created_date      : Date,
                          updated_date      : Date,
                          created_by        : Number,
                          updated_by        : Number
                        })

var Schedules = mongoose.model("Schedules",SchedulesSchema)