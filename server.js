//  OpenShift sample Node application
var fs = require('fs')
var restify = require('restify')
var mongoose = require("mongoose")

setupVariables = function() {

  //  Set the environment variables we need.
  nodejs_ip_address = process.env.BUMBLEBEE_NODEJS_IP
  nodejs_port = (process.env.BUMBLEBEE_NODEJS_PORT || 5000)
  mongo_db_server = process.env.BUMBLEBEE_MONGODB_DB_HOST
  mongo_db_port = process.env.BUMBLEBEE_MONGODB_DB_PORT
  mongo_db_name = process.env.BUMBLEBEE_MONGODB_DB_NAME
  mongo_db_user = process.env.BUMBLEBEE_MONGODB_DB_USER
  mongo_db_pwd = process.env.BUMBLEBEE_MONGODB_DB_PWD

  if (typeof ipaddress === "undefined") {
    //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
    //  allows us to run/test the app locally.
    console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
    ipaddress = "127.0.0.1";
  };
}

populateCache = function() {
  if (typeof zcache === "undefined") {
    zcache = {
      'index.html': ''
    };
  }

  //  Local cache for static content.
  zcache['index.html'] = fs.readFileSync('./index.html');
}


cache_get = function(key) {
  return zcache[key];
};

terminator = function(sig) {
  if (typeof sig === "string") {
    console.log('%s: Received %s - terminating sample app ...',
      Date(Date.now()), sig);
    process.exit(1);
  }
  console.log('%s: Node server stopped.', Date(Date.now()));
}

setupTerminationHandlers = function() {
  //  Process on exit and signals.
  process.on('exit', function() {
    terminator();
  });

  // Removed 'SIGPIPE' from the list - bugz 852598.
  ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
    'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
  ].forEach(function(element, index, array) {
    process.on(element, function() {
      terminator(element);
    });
  });
}


initializeServer = function() {
  //createRoutes();
  //app = express.createServer();
  server = restify.createServer({
    name: "mundu"
  })

  var connection_string = "mongodb://" + mongo_db_user + ":" + mongo_db_pwd + "@" + mongo_db_server + ":" + mongo_db_port + "/" + mongo_db_name
    //  var connection_string = "mongodb://"+mongo_db_server+":"+mongo_db_port+"/"+mongo_db_name

  console.log("connection_string " + connection_string)
  // Connect to mongodb
  var connect = function() {
    var options = {
      server: {
        socketOptions: {
          keepAlive: 1
        }
      }
    }
    mongoose.connect(connection_string, options)
  }

  connect()

  mongoose.connection.on('error', console.log)
  mongoose.connection.on('disconnected', connect)

  fs.readdirSync(__dirname + '/models').forEach(function(filename) {
    console.log("filename " + filename)
    if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
  })

  server.use(restify.bodyParser())
  server.use(restify.queryParser())



  var Organization = mongoose.model('Organization')
  var Schedules = mongoose.model('Schedules')
  var RatingAndReview = mongoose.model('RatingAndReview')
  var Specialist = mongoose.model('Specialist')

  var organization = require('./routes/organization.js')
  var ratingandreview = require('./routes/ratingandreview.js')
  var schedule = require('./routes/schedule.js')
  var specialist = require('./routes/specialist.js')

  var RATINGANDREVIEW_PATH = '/ratingsAndReview'
  server.get({
    path: RATINGANDREVIEW_PATH
  }, ratingandreview.getAllRatingAndReview) //get all rating and Review
  server.post({
    path: RATINGANDREVIEW_PATH
  }, ratingandreview.addNewRatingAndReview)
  server.post({
    path: RATINGANDREVIEW_PATH + '/ratingAndReviewId/:ratingAndReviewId'
  }, ratingandreview.updateRatingAndReviewByRatingId) //update rating and Review schema with changes by rating id


  var SCHEDULE_PATH = '/schedules'

  server.get({
    path: SCHEDULE_PATH
  }, schedule.getAllSchedules) //get all schedules
  server.get({
    path: SCHEDULE_PATH + '/scheduleId/:scheduleId'
  }, schedule.getScheduleByScheduleId) //get a schedule document with schedule id
  server.get({
    path: SCHEDULE_PATH + '/customerId/:customerId'
  }, schedule.getScheduleByCustomerId) //get a schedule document with customer id
  server.get({
    path: SCHEDULE_PATH + '/specialistId/:specialistId'
  }, schedule.getScheduleBySpecialistId) //get a schedule document with specialist id
  server.get({
    path: SCHEDULE_PATH + '/specialistId/:specialistId/appointmentdate/:appointmentdate'
  }, schedule.getScheduleBySpecialistIdAndDate) //get a schedule document with schedule id

  server.post({
    path: SCHEDULE_PATH
  }, schedule.postNewSchedule);

  var ORGANIZATION_PATH = '/organizations'

  server.get({
    path: ORGANIZATION_PATH
  }, organization.getAllOrganizations) //get all organizations
  server.get({
    path: ORGANIZATION_PATH + '/:lat/:lon/:distance'
  }, organization.getOrganizationsWithLatLon) //get all organizations with lat lon and distance
  server.get({
    path: ORGANIZATION_PATH + '/latlon'
  }, organization.getOrganizationsWithLatLon) //get all organizations with lat lon and distance
  server.get({
    path: ORGANIZATION_PATH + '/organizationId/:organizationId'
  }, organization.getOrganizationByOrganizationId) //get organizations by Organization id
  server.get({
    path: ORGANIZATION_PATH + '/organizationId'
  }, organization.getOrganizationByOrganizationId) //get organizations by Organization id

  server.post({
    path: ORGANIZATION_PATH + '/addOrganization'
  }, organization.addOrganization) //get all organizations
  server.post({
    path: ORGANIZATION_PATH + '/organizationId/:organizationId'
  }, organization.updateOrganizationByOrganizationId) //update organization by organization id
  //server.del({path : PATH +'/:scheduleId' , version: '0.0.1'} , deleteSchedule);

  var CATEGORY_PATH = '/categories'

  server.get({
    path: CATEGORY_PATH
  }, specialist.getCategories) //get all schedules

  var TEST_PATH = '/test'

  server.get({
    path: TEST_PATH + '/testArray2'
  }, specialist.testArray2) //get all schedules

  server.get({
    path: TEST_PATH + '/testResults'
  }, specialist.testResults) //get all schedules


  var SPECIALIST_PATH = '/specialists'

  server.get({
    path: SPECIALIST_PATH
  }, specialist.getAllSpecialists) //get all specialists
  server.get({
    path: SPECIALIST_PATH + '/:lat/:lon/:distance'
  }, specialist.getSpecialistsWithLatLon) //get all specialists with lat lon and distance
  server.get({
    path: SPECIALIST_PATH + '/latlon'
  }, specialist.getSpecialistsWithLatLon) //get all organizations with lat lon and distance
  server.get({
    path: SPECIALIST_PATH + '/specialistId/:specialistId'
  }, specialist.getSpecialistBySpecialistId) //get organizations by Organization id
  /*server.get({
    path: SPECIALIST_PATH + '/specialistID'
  }, specialist.getSpecialistBySpecialistId) //get organizations by Organization id
*/
  server.post({
    path: SPECIALIST_PATH + '/addSpecialist'
  }, specialist.addSpecialist) //get all organizations
  server.post({
    path: SPECIALIST_PATH + '/specialistId/:specialistId'
  }, specialist.updateSpecialistBySpecialistId) //update organization by organization id
  server.get({
    path: SPECIALIST_PATH + '/schema'
  }, specialist.getSpecialistSchema) //update organization by organization id

  //server.del({path : PATH +'/:scheduleId' , version: '0.0.1'} , deleteSchedule);

}

start = function() {

  server.listen(nodejs_port, nodejs_ip_address, function() {
    console.log('%s: Node server started on %s:%d ...',
      Date(Date.now()), nodejs_ip_address, nodejs_port)
  })



}


initialize = function() {
  setupVariables();
  populateCache();
  setupTerminationHandlers();

  // Create the express server and routes.
  initializeServer();
}

initialize();

start();