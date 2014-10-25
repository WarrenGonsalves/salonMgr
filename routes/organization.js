var express 		= require('express')
var mongoose      	= require('mongoose')
var restify 		= require('restify')
var Organization  	= mongoose.model('Organization')


function getOrganizationsWithLatLon(req, res, next) {

	console.log( " in getOrganizationsWithLatLon")

    var point = { type : "Point", coordinates : [parseInt(req.params.lon),parseInt(req.params.lat)] }
    var distance = parseInt(req.params.distance)/6371
    

    Organization.where('locs').within({ center : [req.params.lon,req.params.lat], radius: distance, unique: true, spherical: true }).exec(function(err, results){
	var tmp_org_list 	= []
	var errors	  		= {}
	var results_holder 	= {}
	var results 		= {}

    	if (err) { 
    			errors.status = "error"
    			errors.error_message = "This should never happen, we will fix this next time"
    			console.error("Asas"+err)

    		}else{
	      		

	      	 	results.forEach(function(v){
	      	 	  var org = {}

	      	 	  console.log(" some awesome formula  " + req.params.lat + " " + req.params.lon+ " " +v.locs[1]+ " " +v.locs[0]+ "   " +getDistanceFromLatLonInKm(req.params.lat,req.params.lon,v.locs[1],v.locs[0]));
	      	 	 // var tmp_distance = Math.round(v.dis*100000000)/100000000
	             // console.log(" iasdsan getallorg " + tmp_distance*1000)
	              org.org_id 			= v.org_id
	              org.name 				= v.name
	              org.address1 			= v.address1
	              org.address2 			= v.address2
	              org.city 				= v.city
	              org.state 			= v.state
	              org.average_rating 	= Math.round(v.average_rating *10)/10
	              org.image_url 		= "yahoo.com"
	              org.service_type		= v.service_type
	              org.review_count		= v.review_count
	              org.nextslot_tooltip	= "4:30 PM"
	              org.deal_tooltip		= "nothing right now"
	              org.min_price			= "From 150Rs"
	              org.longitude			= v.locs[0]
	              org.latitude			= v.locs[1]
	              org.distance 			= Math.round(getDistanceFromLatLonInKm(req.params.lat,req.params.lon,v.locs[1],v.locs[0])*100)/100

	              tmp_org_list.push(org)
	          })
			
			
	      	
	      	errors.status	= "ok"
	      	results_holder.org_list = tmp_org_list
	      
	      }
	      

      	
  		results_holder.errors = errors

  		results.results = results_holder
     	//console.log(stats)
   	   	res.json(results)
    })

  /*  
    Organization.geoNear(point, { maxDistance : parseInt(distance), spherical : true}, function(err, results, stats) {
    	
		if (err) return console.error(err)

      		var tmp_org_list = []

      	 	results.forEach(function(v){
      	 	  var org = {}

      	 	  console.log(" some awesome formula  " + req.params.lat + " " + req.params.lon+ " " +v.obj.locs[1]+ " " +v.obj.locs[0]+ "   " +getDistanceFromLatLonInKm(req.params.lat,req.params.lon,v.obj.locs[1],v.obj.locs[0]));
      	 	  var tmp_distance = Math.round(v.dis*100000000)/100000000
              console.log(" iasdsan getallorg " + tmp_distance*1000)
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
              org.distance 			= Math.round(tmp_distance)*1000

              tmp_org_list.push(org)
          })

      	 var orglist = {}

      	 orglist.org_list = tmp_org_list
  		
     	console.log(stats)
   	   //	res.json(orglist)
    
    })
*/


}
exports.getOrganizationsWithLatLon = getOrganizationsWithLatLon

    


function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}



exports.getAllOrganizations =  function(req, res , next){
 // console.log("in find all schedules" +  mongoose.connection)
  res.setHeader('Access-Control-Allow-Origin','*')
  
  	if( (req.params.lat != null) && (req.params.lon != null)  ){
  			getOrganizationsWithLatLon(req, res, next)
  	}else{

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


