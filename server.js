#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var fs      = require('fs');
var restify = require('restify');
var mongoose = require("mongoose");

var server = restify.createServer({
    name : "appointment"
});

 //  Set the environment variables we need.
var nodejs_ip_address = process.env.OPENSHIFT_NODEJS_IP
var nodejs_port       = process.env.OPENSHIFT_NODEJS_PORT || 8080

server.use(restify.queryParser())
server.use(restify.bodyParser()) 
server.listen(nodejs_port ,nodejs_ip_address, function(){
    console.log('%s listening at %s ', server.name , server.url);
})

var SCHEDULE_PATH = '/schedules'
 console.log('entering alkshdajshdhjs');
server.get({path : SCHEDULE_PATH } , getAllSchedules) //get all schedules

function getAllSchedules(req, res , next){
   // console.log("in find all schedules" +  mongoose.connection)
    res.setHeader('Access-Control-Allow-Origin','*')
    res.send("yo yo honey singh")
}



