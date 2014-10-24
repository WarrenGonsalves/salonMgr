var express 		= require('express')
var mongoose      	= require('mongoose')
var restify 		= require('restify')
var Organization  	= mongoose.model('Organization')

exports.getOrganizationsWithLatLon = function(req, res , next){

    //var point = { type : "Point", coordinates : [parseInt(req.params.lon),parseInt(req.params.lat)] }
    var point = { type : "Point", coordinates : [parseInt(req.params.lat),parseInt(req.params.lon)] }
    var distance = (req.params.distance || 5)/6371

    console.log(" req.params.lon asdsad" + req.params.lon + "   req.params.lat  " + req.params.lat + "  distance " + distance) 

    Organization.geoNear(point, { maxDistance : parseInt(distance), spherical : true}, function(err, results, stats) {
      if (err) return console.error(err)

      	var org = {}
      	var tmp_org_list = []

      	 results.forEach(function(v){

              console.log(" iasdsan getallorg " + v.obj.locs[0])
              org.org_id 			= v.obj.org_id
              org.name 				= v.obj.name
              org.address1 			= v.obj.address1
              org.address2 			= v.obj.address2
              org.city 				= v.obj.city
              org.state 			= v.obj.state
              org.average_rating 	= Math.round(v.obj.average_rating *10)/10
              org.image_url 		= "yahoo.com"
              org.service_type		= v.obj.service_type
              org.review_count		= v.review_count
              org.nextslot_tooltip	= "4:30 PM"
              org.deal_tooltip		= "nothing right now"
              org.longitude			= v.obj.locs[0]
              org.latitude			= v.obj.locs[1]

              tmp_org_list.push(org)
          })

      	 var orglist = {}

      	 orglist.org_list = tmp_org_list
  		
        //console.log(tmpOrgList)
      	//org.salon_list = results

      	//console.log(orglist)

   	   	res.json(orglist)
    
    })

    //Organization.find({loc:{'$near':[72,19]}}).exec(console.log)

}



exports.getAllOrganizations =  function(req, res , next){
 // console.log("in find all schedules" +  mongoose.connection)
  res.setHeader('Access-Control-Allow-Origin','*')
  
    Organization.find(function (err, organizations) {
        if (err) return console.error(err)
         
          organizations.forEach(function(v){
              console.log(" iasdsan getallorg " + v.org_id)
          })
          var orglist = {}
            //console.log(tmpOrgList)
          orglist.salon_list = organizations
      
       // var salonList = salon_list
        res.json(orglist)
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
 // console.log("in find all schedules" +  mongoose.connection)
 console.log(" in getOrganizationByOrganizationId req.params.organizationId " +req.params.organizationId)
  //res.setHeader('Access-Control-Allow-Origin','*')
  Organization.find({ org_id:req.params.scheduleId  },function (err, schedules) {
        if (err) return console.error(err)
        res.json(schedules);
      })
}


