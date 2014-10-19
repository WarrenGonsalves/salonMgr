#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var fs      = require('fs');
var restify = require('restify');
var mongoose = require("mongoose");

var server = restify.createServer({
    name : "appointment"
});

var mongo_db_server = "127.7.192.2"
var mongo_db_server = "27017"

//var connection_string = 'mongodb://localhost:27017/optimus';
//var connection_string = 'mongodb://admin/xdSqqbpcK_-T@$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/bumblebee'
var connection_string = 'mongodb://admin/xdSqqbpcK_-T@'+mongo_db_server+":"+mongo_db_server+'/bumblebee'

console.log(connection_string)
// Connect to mongodb
var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(connection_string, options);
};

connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

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
                          latitude              : Number,
                          longitude             : Number,
                          image                 : String,
                          service_type          : String,
                          created_date          : Date,
                          updated_date          : Date,
                          created_by            : Number,
                          updated_by            : Number
                        })

var Organization = mongoose.model("Organization",OrganizationSchema)

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
                          //date            : { type: Date, set: setDateWithFormat },
                          //start_time  : { type: Date, set: setStartTimeWithFormat },
                          //end_time        : { type: Date, set: setEndTimeWithFormat },
                            
                        })

var Schedules = mongoose.model("Schedules",SchedulesSchema)

 //  Set the environment variables we need.
var nodejs_ip_address = process.env.OPENSHIFT_NODEJS_IP;
var nodejs_port       = process.env.OPENSHIFT_NODEJS_PORT || 8080;

if (typeof nodejs_ip_address === "undefined") {
    //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
    //  allows us to run/test the app locally.
    console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
    nodejs_ip_address = "127.0.0.1";
};

server.use(restify.queryParser())
server.use(restify.bodyParser()) 
server.listen(nodejs_port ,nodejs_ip_address, function(){
    console.log('%s listening at %s ', server.name , server.url);
})

var SCHEDULE_PATH = '/schedules'

server.get({path : SCHEDULE_PATH } , getAllSchedules) //get all schedules

function getAllSchedules(req, res , next){
   // console.log("in find all schedules" +  mongoose.connection)
    res.setHeader('Access-Control-Allow-Origin','*')
    Schedules.find(function (err, schedules) {
          
          if (err) return console.error(err)
          res.json(schedules);
    })
}



