var specialist = require('../models/specialist');
var specialistController = require('../controller/specialist');
var BASE_URL = '/specialists';
var util = require('../util');

module.exports = function() {
  return [{
    method: 'GET',
    path: BASE_URL,
    config: {
      handler: function(req, reply) {
        specialist.getAll(function(err, data) {
          util.replyHelper.ifError(err, reply);
          reply({
            specialist_list: data
          });
        });
      }
    }
  }, {
    method: 'GET',
    path: BASE_URL + '/distinctCat',
    config: {
      handler: function(req, reply) {
        specialist.getDistinctCat(function(err, data) {
          util.replyHelper.ifError(err, reply);
          reply(data);
        });
      }
    }
  }, {
    method: 'GET',
    path: BASE_URL + '/filterSpecialistBySkill/{category}',
    config: {
      handler: function(req, reply) {
        specialist.getByCategory(req.params.category, function(err, data) {
          util.replyHelper.ifError(err, reply);
          reply({
            specialist_list: data
          });
        });
      }
    }
  }, {
    method: 'POST',
    path: BASE_URL + '/{fname}/{cat}',
    config: specialistController.postConfigHandler
  }];
}();


// // var express = require('express')
// // var mongoose = require('mongoose')
// // var restify = require('restify')
// // var iSpecialist = require('./../models/iSpecialist.js')
// // var Specialist = mongoose.model('Specialist')
// // var url = require('url')

// // exports.getAllSpecialists = function(req, res, next) {

// //   var tmp_specialist_list = []
// //   var errors = {}
// //   var results_holder = {}
// //   var results = {}

// //   Specialist.find(function(err, specialists) {


// //     if (err) {

// //       errors.status = "error"
// //       errors.error_message = "This should never happen, we will fix this next time"


// //     } else {


// //       specialists.forEach(function(v) {

// //         var specialist = new iSpecialist(v.specialist_id, v.name, v.address1, v.address2, v.city, v.state, v.pincode, v.average_rating,
// //             "yahoo.com", v.service_type, v.review_count, "4:30 PM", "nothing right now", "From 150Rs", v.locs[0], v.locs[1], "", "")
// //           //console.log(" ispecialist " + specialist)

// //         tmp_specialist_list.push(specialist)
// //       })

// //       errors.status = "ok"

// //       results_holder.specialist_list = tmp_specialist_list

// //     }
// //     results_holder.errors = errors

// //     results.results = results_holder
// //     console.error("in else" + results);
// //     //console.log(stats)
// //     res.json(results)
// //   })

// // }

// // exports.getAllOrganizations = function(req, res, next) {

// //   Specialist.find(function(err, organizations) {

// //     if (err) return console.error(err)
// //     res.json(organizations);
// //   })

// // }

// // function getSpecialistsWithLatLon(req, res, next) {

// //   var tmp_specialist_list = []
// //   var errors = {}
// //   var results_holder = {}
// //   var results = {}

// //   var req_lon = (req.params.lon || (url.parse(req.url, true).query.lon))
// //   var req_lat = (req.params.lat || (url.parse(req.url, true).query.lat))
// //   var req_distance = (req.params.distance || (url.parse(req.url, true).query.distance))

// //   if (req_lon == null || req_lat == null) {
// //     errors.status = "error"
// //     errors.error_message = "Hmmm.. Something went wrong with the gps. Are you sure your device's gps is turned on?"
// //     results_holder.errors = errors

// //     results.results = results_holder
// //     res.json(results)
// //   }

// //   var distance = parseInt(req_distance) / 6371 // for spherical surfaces , 6371 kms is the circumference of earth

// //   Specialist.where('locs').within({
// //     center: [req_lon, req_lat],
// //     radius: distance,
// //     unique: true,
// //     spherical: true
// //   }).exec(function(err, queryresults) {
//   Specialist.find(function(err, specialists) {
//     res.json(createResultJSON(err, specialists, "specialist"))
//   })

// }

// function createResultJSON(errorObj, queryResults, resultObjectType) {

//   var errors = {}
//   var results = {}

//   if (errorObj) {

//     errors.status = "error"
//     errors.error_message = "This should never happen, we will fix this next time"
//     results.errors = errors

//   } else {

//     results.specialist_list = queryResults

//   }

//   return results

// //     if (err) {

// //       errors.status = "error"
// //       errors.error_message = "This should never happen, we will fix this next time"
// //       console.error("Asas" + err)

// //     } else {

// //       console.error("in else" + queryresults)
// //       queryresults.forEach(function(v) {
// //         console.error("in foreach ")
// //         var specialist = new iSpecialist(v.specialist_id, v.name, v.address1, v.address2, v.city, v.state, v.pincode, v.average_rating,
// //             "yahoo.com", v.service_type, v.review_count, "4:30 PM", "nothing right now", "From 150Rs", v.locs[0], v.locs[1], req_lat, req_lon)
// //           //  console.log(" ispecialist " + specialist)


//   var req_lon = (req.params.lon || (url.parse(req.url, true).query.lon))
//   var req_lat = (req.params.lat || (url.parse(req.url, true).query.lat))
//   var req_distance = (req.params.distance || (url.parse(req.url, true).query.distance))


// //         tmp_specialist_list.push(specialist)
// //       })

// //       errors.status = "ok"

// //       results_holder.specialist_list = tmp_specialist_list

// //     }
// //     results_holder.errors = errors

// //     results.results = results_holder

// //     res.json(results)
// //   })



// // }

// // exports.getSpecialistsWithLatLon = getSpecialistsWithLatLon



// // exports.addSpecialist = function(req, res, next) {

// //   var specialist = new Specialist(req.body)
// //   console.log(req.contentLength())
// //   console.log(req.contentType())
// //   console.log(req.body)
// //   specialist.save(function(error, data) {

// //     if (error) {
// //       return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
// //     } else {
// //       res.json(data);
// //     }
// //     res.send(201, specialist)
// //   })
// // }

// // exports.getSpecialistBySpecialistId = function(req, res, next) {

// //   specialist_id_passed = (req.params.specialistId || (url.parse(req.url, true).query.specialistId))

//     res.json(createResultJSON(err, queryresults, "specialist"))
//   })

// }

// //   Specialist.find({
// //     specialist_id: parseInt(specialist_id_passed)
// //   }, function(err, specialist) {

// //     if (err) return console.error(err)
// //     res.json(specialist);
// //   })
// // }

// // exports.updateSpecialistBySpecialistId = function(req, res, next) {

// //   console.log("in updateOrganizationByOrganizationId req.params.organizationId " + req.params.specialistId)

// //   var query = {
// //     specialist_id: req.params.specialistId
// //   };

// //   Specialist.findOneAndUpdate(query, req.body, null, function(err, specialist) {

// //     if (err) return console.error(err)

// //     res.json(specialist);
// //   })
// // }

// // exports.getSpecialistSchema = function(req, res, next) {


//     res.json(createResultJSON(err, specialist, "specialist"))
//   })
// }

// exports.getSpecialistBySkill = function(req, res, next) {

//   specialist_skill_passed = (req.params.skill || (url.parse(req.url, true).query.skill))

// console.log("specialist_skill_passed " +specialist_skill_passed)
//   Specialist.find({
//     'categories.specialist_title': specialist_skill_passed
//   }, function(err, specialist) {
// console.log("specialist " +specialist)
//     res.json(createResultJSON(err, specialist, "specialist"))
//   })
// }
// // }

// // exports.testArray = function(req, res, next) {
// //   console.log("in test array")
// //   var services = {}
// //   var category = []
// //   var tmpcat = {}

// //   var subcategories = []

// //   var tmpcat = {}
// //   var tmpsubcat = {}
// //   tmpcat.category = "category1"
// //   category.push(tmpcat)

// //   var tmpcat = {}
// //   tmpcat.category = "category2"
// //   category.push(tmpcat)

// //   var tmpcat = {}
// //   tmpcat.category = "category3"
// //   category.push(tmpcat)

// //   services.services = category

// //   res.json(services)
// // }

// // exports.testArray2 = function(req, res, next) {
// //   console.log("in test array")
// //   var services = {}
// //   var category = []
// //   var tmpcat = {}

// //   var subcategories = []
// //   var tmp_subcategories = {}
// exports.testResults = function(req, res, next) {

//   var errors = {
//     status: "ok"

//   }

//   var list = {

//     specialist_id: 1,
//     name: "Robert Hansen",
//     address1: "Summerview",
//     address2: "003 Delladonna Park",

//   }

//   var results = {}

//   results.list = list
//   results.errors = errors

//   res.json(results)
// }


// exports.testArray = function(req, res, next) {
//   console.log("in test array")
//   var services = {}
//   var category = []
//   var tmpcat = {}

// //   tmp_subcategories.id = "1"
// //   tmp_subcategories.title = "title 1"
// //   subcategories.push(tmp_subcategories)

// //   var tmp_subcategories = {}
// //   tmp_subcategories.id = "2"
// //   tmp_subcategories.title = "title 2"

// //   subcategories.push(tmp_subcategories)

// //   var tmpcat = {}
// //   var tmpsubcat = {}
// //   var tmp_subcategories = {}

// //   tmp_subcategories.id = "1"
// //   tmp_subcategories.title = "title 1"

// //   tmpcat.category = "category1"
// //   tmpcat.sub_categories = subcategories
// //   category.push(tmpcat)

// //   var tmpcat = {}
// //   tmpcat.category = "category2"
// //   category.push(tmpcat)

// //   var tmpcat = {}
// //   tmpcat.category = "category3"
// //   category.push(tmpcat)

// //   services.services = category

// //   res.json(services)
// // }

// // exports.getCategories = function(req, res, next) {

// //   Specialist.distinct(('categories'), function(err, cats) {
// //     var services = {}
// //     var category = []
// //     var tmpcat = {}

// //     var subcategories = []
// //     var tmp_subcategories = {}
// //     var last_specialist_l1_title

// //     if (err) return console.error(err)

// //     var sortedCategories = cats.sort(function(a, b) {
// //       return a.specialist_l1_title.localeCompare(b.specialist_l1_title)
// //     })

// //     // for-in loop
// //     /*  for (var i in sortedCategories) {

// //       specialist_l1_title = sortedCategories[i].specialist_l1_title
// //       specialist_title = sortedCategories[i].specialist_title

// //       console.log("cat " + sortedCategories.length + "   i  =  " + i + " specialist_l1_title   " + specialist_l1_title + " specialist_title " + specialist_title); //"aa", bb", "cc"

// //       if (((last_specialist_l1_title != null) && (specialist_l1_title != last_specialist_l1_title)) || (sortedCategories.length == (i + 1))) {

// //         tmpcat.category = last_specialist_l1_title
// //         tmpcat.sub_categories = subcategories
// //         category.push(tmpcat)
// //         tmpcat = {}
// //         subcategories = []
// //       }

// //       tmp_subcategories.title = specialist_title
// //       tmp_subcategories.id = ""
// //       subcategories.push(tmp_subcategories)

// //       last_specialist_l1_title = sortedCategories[i].specialist_l1_title
// //       tmp_subcategories = {}
// //     }
// // */

// //     sortedCategories.forEach(function(c) {

// //       console.log(c)
// //       tmpcat.category = c.specialist_l1_title

// //       if (last_specialist_l1_title != null && c.specialist_l1_title != last_specialist_l1_title) {

// //         tmpcat.category = last_specialist_l1_title
// //         tmpcat.sub_categories = subcategories
// //         category.push(tmpcat)

// //         tmpcat = {}
// //         subcategories = []
// //         tmp_subcategories = {}

// //       }

// //       tmp_subcategories.id = ""
// //       tmp_subcategories.title = c.specialist_title
// //       subcategories.push(tmp_subcategories)
// //       last_specialist_l1_title = c.specialist_l1_title
// //       tmp_subcategories = {}


// //     })
// //     tmpcat.category = last_specialist_l1_title
// //     tmpcat.sub_categories = subcategories
// //     category.push(tmpcat)

// //     services.services = category
// //     console.log(services)
// //     res.json(services)
// //   })
// // }
//         tmpcat.category = last_specialist_l1_title
//         tmpcat.sub_categories = subcategories
//         category.push(tmpcat)

//         tmpcat = {}
//         subcategories = []
//         tmp_subcategories = {}

//       }

//       tmp_subcategories.id = ""
//       tmp_subcategories.title = c.specialist_title
//       subcategories.push(tmp_subcategories)
//       last_specialist_l1_title = c.specialist_l1_title
//       tmp_subcategories = {}


//     })
//     tmpcat.category = last_specialist_l1_title
//     tmpcat.sub_categories = subcategories
//     category.push(tmpcat)

//     services.services = category
//     console.log(services)
//     res.json(services)
//   })
// }