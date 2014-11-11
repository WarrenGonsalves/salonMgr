var BASE_URL = '/ratingsAndReview'

module.exports = function() {
    return [{
        method: 'GET',
        path: BASE_URL,
        config: {
            handler: function(req, reply) {
                reply("getting rating")
            }
        }
    }, {
        method: 'GET',
        path: BASE_URL + '/{lat}/{long}/{distance}',
        config: {
            handler: function(req, reply) {
                reply("getting org for lat long distance")
            }
        }
    }, {
        method: 'GET',
        path: BASE_URL + '/organizationId/{id}',
        config: {
            handler: function(req, reply) {
                reply("getting org for id" + req.params.id)
            }
        }
    }];
}();

// var express = require('express')
// var mongoose      = require('mongoose')
// var restify     = require('restify')
// var RatingAndReview  = mongoose.model('RatingAndReview')

// exports.getAllRatingAndReview = function(req, res , next){
//    // console.log("in find all schedules" +  mongoose.connection)
//     res.setHeader('Access-Control-Allow-Origin','*')

//       RatingAndReview.find(function (err, ratingAndReviewList) {
//           if (err) return console.error(err)

//           res.json(ratingAndReviewList)
//     })
// }

// exports.addNewRatingAndReview =   function(req , res , next){

//     var ratingAndReview = new RatingAndReview(req.body)

//     ratingAndReview.save(function (error, data) {

//     if (error) {
//      return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
//     }else {
//      res.json(data);
//     }
//     res.send(201, ratingAndReview)
//    })
// }

// //update rating in the organization or specialist schema
// exports.updateAverageRatingForOrganization = function(){

//     RatingAndReview.aggregate(
//     { $group: { _id: '$org_id', average_rating: { $avg: '$rating' }}}
//       , function (err, results) {
//       if (err) return handleError(err);
//        console.log(results); 

//        console.log(" orgId " + orgId + "   asdsa  "+results[orgId])

//        var group = { 'Alice': { a: 'b', b: 'c' }, 'Bob': { a: 'd' }};

//         var people = Object.keys(group); 
//         people.forEach(function(person) {
//         console.log("person"+person)
//         var items = Object.keys(group[person]); items.forEach(function(item) {
//         var value = group[person][item]; console.log(person+': '+item+' = '+value); });

//       });

//       // results.
//        /* results.forEach(function(v){
//                     console.log(" in getallorg " + v._id)

//                     Organization.findOneAndUpdate({org_id: v._id}, {average_rating: v.average_rating}, null, function (err, organization) {
//                       if (err) return console.error(err)
//                     })

//         })
//       */
//     })


// }

// //update rating in the organization or specialist schema
// exports.updateReviewCountForOrganization = function (orgId){

//       RatingAndReview.find({org_id: orgId, review: {$ne : null}})
//                     .count(function (err, count) {
//           if (err) return handleError(err);

//           console.log(" in updateReviewCountForOrganization " + orgId + "  count is "+count)

//           Organization.findOneAndUpdate({org_id: orgId}, {review_count: count}, null, function (err, organization) {

//          if (err) return console.error(err)

//          })
//           //res.json(count)
//     })

// }

// exports.updateRatingAndReviewByRatingId = function(req, res , next){


//     var query = { rating_id: req.params.ratingAndReviewId };

//     RatingAndReview.findOneAndUpdate(query, req.body, null, function (err, ratingAndReview) {

//           if (err) return console.error(err)

//           res.json(ratingAndReview);
//     })
// }