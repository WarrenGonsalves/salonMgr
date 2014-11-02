
var iSpecialist = function(specialist_id, name, address1, address2, city, state, pincode,  average_rating, image_url, service_type, review_count, nextslot_tooltip, deal_tooltip, min_price, longitude, latitude, req_lat, req_lon ){
	console.log("setting ispecialist")
	this.specialist_id = specialist_id
	this.name = name
	this.address1 = address1
	this.address2 = address2
	this.city = city
	this.state = state
	this.pincode = pincode
	this.average_rating =  Math.round(average_rating * 10) / 10,
	this.image_url = image_url
	this.service_type = service_type
	this.review_count = review_count
	this.nextslot_tooltip = nextslot_tooltip
	this.deal_tooltip = deal_tooltip
	this.min_price = min_price
	this.longitude = longitude
	this.latitude = latitude
	this.distance = Math.round(getDistanceFromLatLonInKm(req_lat, req_lon, latitude, longitude) * 100) / 100 
}

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



module.exports = iSpecialist
