var express = require('express')
var mongoose      = require('mongoose')
var restify     = require('restify')
var Schedules  = mongoose.model('Schedules')


exports.getAllSchedules = function(req, res , next){
 // console.log("in find all schedules" +  mongoose.connection)
  res.setHeader('Access-Control-Allow-Origin','*')
  Schedules.find(function (err, schedules) {
        
        if (err) return console.error(err)
        res.json(schedules);
  })
}


exports.getScheduleByScheduleId = function(req, res , next){
 // console.log("in find all schedules" +  mongoose.connection)
 console.log("req.params.scheduleId " +req.params.scheduleId)
  //res.setHeader('Access-Control-Allow-Origin','*')
  Schedules.find({ schedule_id:req.params.scheduleId  },function (err, schedules) {
        if (err) return console.error(err)
        res.json(schedules);
      })
}


exports.getScheduleByCustomerId = function(req, res , next){
 console.log("req.params.customerId " +req.params.customerId)
  //res.setHeader('Access-Control-Allow-Origin','*')
  Schedules.find({ customer_id:req.params.customerId  },function (err, schedules) {
        if (err) return console.error(err)
        res.json(schedules);
      })
}

exports.getScheduleBySpecialistId = function(req, res , next){

 console.log("req.params.specialistId " +req.params.specialistId)
  //res.setHeader('Access-Control-Allow-Origin','*')
  Schedules.find({ specialist_id:req.params.specialistId  },function (err, schedules) {
        if (err) return console.error(err)
        res.json(schedules);
      })
}

exports.getScheduleBySpecialistIdAndDate = function(req, res , next){

 console.log("req.params.specialistId " +req.params.specialistId)
  //res.setHeader('Access-Control-Allow-Origin','*')
  Schedules.find({ specialist_id:req.params.specialistId  },function (err, schedules) {
        if (err) return console.error(err)
        res.json(schedules);
      })
}

exports.postNewSchedule = function(req, res , next){

  var schedule = new Schedules(req.body)

  console.log("in post new schedule " + JSON.stringify(req.body))

  schedule.save(function (error, data) {
  
  if (error) {
   return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
  }else {
   res.json(data);
  }
  res.send(201, schedule)
 })
}