
  //  OpenShift sample Node application
  var express = require('express')
  var fs      = require('fs')
  var restify = require('restify')

  var mongoose = require("mongoose")

  setupVariables = function() {

          //  Set the environment variables we need.
            nodejs_ip_address = process.env.BUMBLEBEE_NODEJS_IP
            nodejs_port       = (process.env.BUMBLEBEE_NODEJS_PORT || 5000)
            mongo_db_server   = process.env.BUMBLEBEE_MONGODB_DB_HOST
            mongo_db_port     = process.env.BUMBLEBEE_MONGODB_DB_PORT
            mongo_db_name     = process.env.BUMBLEBEE_MONGODB_DB_NAME
            mongo_db_user     = process.env.BUMBLEBEE_MONGODB_DB_USER
            mongo_db_pwd      = process.env.BUMBLEBEE_MONGODB_DB_PWD

          if (typeof ipaddress === "undefined") {
              //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
              //  allows us to run/test the app locally.
              console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
              ipaddress = "127.0.0.1";
          };
  }

   populateCache = function() {
              if (typeof zcache === "undefined") {
                  zcache = { 'index.html': '' };
              }

              //  Local cache for static content.
              zcache['index.html'] = fs.readFileSync('./index.html');
    }


      cache_get = function(key) { return zcache[key]; };

      terminator = function(sig){
          if (typeof sig === "string") {
             console.log('%s: Received %s - terminating sample app ...',
                         Date(Date.now()), sig);
             process.exit(1);
          }
          console.log('%s: Node server stopped.', Date(Date.now()) );
      }

      setupTerminationHandlers = function(){
              //  Process on exit and signals.
              process.on('exit', function() { terminator(); });

              // Removed 'SIGPIPE' from the list - bugz 852598.
              ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
               'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
              ].forEach(function(element, index, array) {
                  process.on(element, function() { terminator(element); });
              });
       }





  //  Set the environment variables we need.
  /*var nodejs_ip_address = process.env.ip
  var nodejs_port       = (process.env.PORT || 5000);
  var mongo_db_server   = "127.7.192.2"
  var mongo_db_port     = "27017"

  console.log("process.env.OPENSHIFT_MONGODB_DB_URL  " + process.env.OPENSHIFT_MONGODB_DB_HOST + "  port  "+process.env.OPENSHIFT_MONGODB_DB_PORT)

  var connection_string = "mongodb://myapp1_admin:admin123@"+mongo_db_server+":"+mongo_db_port+"/myapp"


  fs.readdirSync(__dirname + '/models').forEach(function(filename){
    console.log("filename "+filename)
    if (~filename.indexOf('.js')) require(__dirname  + '/models/' + filename)
  })

  var Organization      = mongoose.model('Organization')
  var Schedules         = mongoose.model('Schedules')
  var RatingAndReview   = mongoose.model('RatingAndReview')

  var organization      = require('./routes/organization.js')
  var ratingandreview   = require('./routes/ratingandreview.js')
  var schedule          = require('./routes/schedule.js')

  /*if (typeof nodejs_ip_address === "undefined") {
      //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
      //  allows us to run/test the app locally.
      console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1')

      nodejs_ip_address = "127.0.0.1"
      mongo_db_server   = "127.0.0.1"
      mongo_db_port = "27017"
      nodejs_port = 7080
  };

  var connection_string
  if(process.env.PORT == null) 
     connection_string  = 'mongodb://localhost:27017/optimus'
  else
    connection_string   = 'mongodb://bumblebee_admin:admin123@proximus.modulusmongo.net:27017/ohas7uBe'

  //var connection_string = 'mongodb://admin/xdSqqbpcK_-T@$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/bumblebee'
  //var connection_string = 'mongodb://bumblebee/admin123@'+mongo_db_server+":"+mongo_db_port+'/bumblebee'
  //var connection_string = 'mongodb://'+mongo_db_server+":"+mongo_db_port+'/bumblebee'
  //var connection_string = 'mongodb://'+mongo_db_server+":"+mongo_db_port+'/bumblebee'
  //var connection_string   = 'mongodb://bumblebee_admin:admin123@proximus.modulusmongo.net:27017/ohas7uBe'

  console.log(connection_string)

  // Connect to mongodb
  var connect = function () {
    var options = { server: { socketOptions: { keepAlive: 1 } } };
    mongoose.connect(connection_string, options);
  };

  connect();

  mongoose.connection.on('error', console.log);
  mongoose.connection.on('disconnected', connect);

  server.use(restify.queryParser())
  server.use(restify.bodyParser()) 

  server.listen(nodejs_port, function() {
    console.log("Node app is running at localhost:" + nodejs_port)
  })

 */

  initializeServer = function() {
          //createRoutes();
          //app = express.createServer();
          server = restify.createServer({
                name : "mundu"
            })

          //var connection_string = "mongodb://"+mongo_db_user+":"+mongo_db_pwd+"@"+mongo_db_server+":"+mongo_db_port+"/"+mongo_db_name
            var connection_string = "mongodb://"+mongo_db_server+":"+mongo_db_port+"/"+mongo_db_name

            console.log("connection_string "+connection_string)
                // Connect to mongodb
            var connect = function () {
                var options = { server: { socketOptions: { keepAlive: 1 } } }
                mongoose.connect(connection_string, options)
            }

            connect()

            mongoose.connection.on('error', console.log)
            mongoose.connection.on('disconnected', connect)

            fs.readdirSync(__dirname + '/models').forEach(function(filename){
                console.log("filename "+filename)
                if (~filename.indexOf('.js')) require(__dirname  + '/models/' + filename)
              })

              var Organization      = mongoose.model('Organization')
              var Schedules         = mongoose.model('Schedules')
              var RatingAndReview   = mongoose.model('RatingAndReview')

       var organization      = require('./routes/organization.js')
        var ratingandreview   = require('./routes/ratingandreview.js')
        var schedule          = require('./routes/schedule.js')


          var RATINGANDREVIEW_PATH = '/ratingsAndReview'
          server.get({path : RATINGANDREVIEW_PATH } , ratingandreview.getAllRatingAndReview) //get all rating and Review
          server.post({path : RATINGANDREVIEW_PATH } , ratingandreview.addNewRatingAndReview)
          server.post({path : RATINGANDREVIEW_PATH +'/ratingAndReviewId/:ratingAndReviewId'} , ratingandreview.updateRatingAndReviewByRatingId) //update rating and Review schema with changes by rating id

          var SCHEDULE_PATH = '/schedules'

          server.get({path : SCHEDULE_PATH } , schedule.getAllSchedules) //get all schedules
          server.get({path : SCHEDULE_PATH + '/scheduleId/:scheduleId'} , schedule.getScheduleByScheduleId) //get a schedule document with schedule id
          server.get({path : SCHEDULE_PATH + '/customerId/:customerId'} , schedule.getScheduleByCustomerId) //get a schedule document with customer id
          server.get({path : SCHEDULE_PATH + '/specialistId/:specialistId'} , schedule.getScheduleBySpecialistId) //get a schedule document with specialist id
          server.get({path : SCHEDULE_PATH + '/specialistId/:specialistId/appointmentdate/:appointmentdate'} , schedule.getScheduleBySpecialistIdAndDate) //get a schedule document with schedule id

          server.post({path : SCHEDULE_PATH } ,schedule.postNewSchedule);

          var ORGANIZATION_PATH = '/organizations'

          server.get({path : ORGANIZATION_PATH } , organization.getAllOrganizations) //get all organizations
          server.get({path : ORGANIZATION_PATH + '/:lat/:lon/:distance'} , organization.getOrganizationsWithLatLon) //get all organizations with lat lon and distance
          server.get({path : ORGANIZATION_PATH + '/latlon'} , organization.getOrganizationsWithLatLon) //get all organizations with lat lon and distance
          server.get({path : ORGANIZATION_PATH + '/organizationId/:organizationId'} , organization.getOrganizationByOrganizationId) //get organizations by Organization id
          server.get({path : ORGANIZATION_PATH + '/organizationId'} , organization.getOrganizationByOrganizationId) //get organizations by Organization id

          server.post({path : ORGANIZATION_PATH + '/addOrganization'} , organization.addOrganization) //get all organizations
          server.post({path : ORGANIZATION_PATH + '/organizationId/:organizationId'} , organization.updateOrganizationByOrganizationId) //update organization by organization id
          //server.del({path : PATH +'/:scheduleId' , version: '0.0.1'} , deleteSchedule);

  }

start = function() {
    server.use(restify.queryParser())
    server.use(restify.bodyParser())
    server.listen(nodejs_port, nodejs_ip_address, function() {
              console.log('%s: Node server started on %s:%d ...',
                  Date(Date.now() ), nodejs_ip_address, nodejs_port)
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
