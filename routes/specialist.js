var express = require('express')
var mongoose = require('mongoose')
var restify = require('restify')
var Specialist = mongoose.model('Specialist')
var url = require('url')

exports.getAllSpecialists = function(req, res, next) {

  Specialist.find(function(err, specialists) {

    if (err) return console.error(err)
    res.json(specialists);

  })

}

function getSpecialistsWithLatLon(req, res, next) {

  var tmp_specialist_list = []
  var errors = {}
  var results_holder = {}
  var results = {}

  var req_lon = (req.params.lon || (url.parse(req.url, true).query.lon))
  var req_lat = (req.params.lat || (url.parse(req.url, true).query.lat))
  var req_distance = (req.params.distance || (url.parse(req.url, true).query.distance))

  if (req_lon == null || req_lat == null) {
    errors.status = "error"
    errors.error_message = "Hmmm.. Something went wrong with the gps. Are you sure your device's gps is turned on?"
    results_holder.errors = errors

    results.results = results_holder
    res.json(results)
  }

  var distance = parseInt(req_distance) / 6371 // for spherical surfaces , 6371 kms is the circumference of earth

  Specialist.where('locs').within({
    center: [req_lon, req_lat],
    radius: distance,
    unique: true,
    spherical: true
  }).exec(function(err, queryresults) {

    if (err) {

      errors.status = "error"
      errors.error_message = "This should never happen, we will fix this next time"
      console.error("Asas" + err)

    } else {

      console.error("in else")
      queryresults.forEach(function(v) {
        var specialist = {}

        specialist.specialist_id = v.specialist_id
        specialist.name = v.name
        specialist.address1 = v.address1
        specialist.address2 = v.address2
        specialist.city = v.city
        specialist.state = v.state
        specialist.average_rating = Math.round(v.average_rating * 10) / 10
        specialist.image_url = "yahoo.com"
        specialist.service_type = v.service_type
        specialist.review_count = v.review_count
        specialist.nextslot_tooltip = "4:30 PM"
        specialist.deal_tooltip = "nothing right now"
        specialist.min_price = "From 150Rs"
        specialist.longitude = v.locs[0]
        specialist.latitude = v.locs[1]
        specialist.distance = Math.round(getDistanceFromLatLonInKm(req_lat, req_lon, v.locs[1], v.locs[0]) * 100) / 100

        tmp_specialist_list.push(specialist)
      })

      errors.status = "ok"

      results_holder.specialist_list = tmp_specialist_list

    }
    results_holder.errors = errors

    results.results = results_holder
    console.error("in else" + results);
    //console.log(stats)
    res.json(results)
  })



}

exports.getSpecialistsWithLatLon = getSpecialistsWithLatLon

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}


exports.addSpecialist = function(req , res , next){

  var specialist = new Specialist(req.body)
    console.log(req.contentLength())
    console.log(req.contentType())
    console.log(req.body)
    specialist.save(function (error, data) {
  
  if (error) {
   return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
  }else {
   res.json(data);
  }
  res.send(201, specialist)
 })
}

exports.getSpecialistBySpecialistId = function(req, res , next){

specialist_id_passed = (req.params.specialistId || (url.parse(req.url,true).query.specialistId))

Specialist.find({ specialist_id:parseInt(specialist_id_passed) },function (err, specialist) {

        if (err) return console.error(err)
        res.json(specialist);
  })   
}

exports.updateSpecialistBySpecialistId = function(req, res , next){

  console.log("in updateOrganizationByOrganizationId req.params.organizationId " +req.params.specialistId)

  var query = { specialist_id: req.params.specialistId };

  Specialist.findOneAndUpdate(query, req.body, null, function (err, specialist) {
        
        if (err) return console.error(err)

        res.json(specialist);
  })
}

exports.getSpecialistSchema = function(req, res, next) {

  console.log(Specialist.schema.tree)
  res.json(Specialist.schema.paths)

}

/*

exports.getAllOrganizations =  function(req, res , next){
 
  Organization.find(function (err, organizations) {
        
        if (err) return console.error(err)
        res.json(organizations);
  })
  	
}


exports.updateOrganizationByOrganizationId = function(req, res , next){

  console.log("in updateOrganizationByOrganizationId req.params.organizationId " +req.params.organizationId)

  var query = { org_id: req.params.organizationId };

  Organization.findOneAndUpdate(query, req.body, null, function (err, organization) {
        
        if (err) return console.error(err)

        res.json(organization);
  })
}

exports.addOrganization = function(req , res , next){

  var organization = new Organization(req.body)

  organization.save(function (error, data) {
  
  if (error) {
   return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
  }else {
   res.json(data);
  }
  res.send(201, organization)
 })
}


exports.getOrganizationByOrganizationId = function(req, res , next){


org_id_passed = (req.params.organizationId || (url.parse(req.url,true).query.organizationId))


Organization.find({ org_id:parseInt(org_id_passed) },function (err, organizations) {

        if (err) return console.error(err)
        res.json(organizations);
  })
    /*Organization.find({ org_id:req.params.organizationId },function (err, organization) {
        if (err) return console.error(err)
        res.json(organization);
      })

}
*/