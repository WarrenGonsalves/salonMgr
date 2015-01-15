/*
 *   Stores configuration for server / db
 *   Overide necessary properties for local developement
 */
var util = require('../util');

var config = module.exports = {};

// server config
config.server = {};

// mongodb
config.mongo = {};


if (process.env.PARAM1 == 'prod') {
    config.env = 'production';
    config.server.ip = '127.0.0.1';
    config.server.port = '8081';
    // Mongo
    config.mongo.connecturl = "mongodb://dbuser2:admin@127.0.0.1:27017/optimus";
    // Data dir
    // '/var/data/handz'
    config.dataDir = process.env.PARAM2;

    config.imgURL = 'http://handz-api.elasticbeanstalk.com' + '/img/';
}

if (process.env.OPENSHIFT_APP_NAME == "bumblebee") {
    config.env = 'development';
    config.server.ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
    config.server.port = process.env.OPENSHIFT_NODEJS_PORT || '5000';
    // Mongo
    config.mongo.connecturl = "mongodb://" + process.env.BUMBLEBEE_MONGODB_DB_USER + ":" + process.env.BUMBLEBEE_MONGODB_DB_PWD + "@" + process.env.BUMBLEBEE_MONGODB_DB_HOST + ":" + process.env.BUMBLEBEE_MONGODB_DB_PORT + "/" + process.env.BUMBLEBEE_MONGODB_DB_NAME;
    // Data dir
    config.dataDir = process.env.OPENSHIFT_DATA_DIR || (__dirname + "/../data");

    config.imgURL = 'http://' + process.env.OPENSHIFT_APP_DNS + '/img/';
}

if (process.env.NODE_ENV == 'local') {
    config.env = 'local';
    config.server.ip = '127.0.0.1';
    config.server.port = '5000';
    // Mongo
    config.mongo.connecturl = "mongodb://dbuser:dbuser@127.0.0.1:27017/fixers";
    // Data dir
    config.dataDir = __dirname + "/../data";

    config.imgURL = 'http://' + (process.env.OPENSHIFT_APP_DNS || '127.0.0.1:5000') + '/img/';
}

config.imgDir = config.dataDir + "/img/";
config.imgURL = 'http://' + (process.env.OPENSHIFT_APP_DNS || '127.0.0.1:5000') + '/img/';


console.log("ENV_MONGO: " + config.mongo.connecturl);
//util.logger.info("Config",[], config);

