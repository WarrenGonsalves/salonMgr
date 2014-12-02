/*
 *   Stores configuration for server / db
 *   Overide necessary properties for local developement
 */
var config = module.exports = {};

console.log("OpenShift Ip: " + process.env.OPENSHIFT_NODEJS_IP)
if (process.env.OPENSHIFT_NODEJS_IP === undefined) {
    config.env = 'development';
} else {
    config.env = 'production';
}
config.hostname = 'dev.example.com';

// server config
config.server = {};
config.server.ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
config.server.port = process.env.OPENSHIFT_NODEJS_PORT || '5000';

// mongodb
config.mongo = {};
config.mongo.host = process.env.BUMBLEBEE_MONGODB_DB_HOST || "127.0.0.1";
config.mongo.port = process.env.BUMBLEBEE_MONGODB_DB_PORT || "27017";
config.mongo.dbname = process.env.BUMBLEBEE_MONGODB_DB_NAME || "fixers";
config.mongo.user = process.env.BUMBLEBEE_MONGODB_DB_USER || "dbuser";
config.mongo.pass = process.env.BUMBLEBEE_MONGODB_DB_PWD || "dbuser";

config.mongo.connecturl = process.env.OPENSHIFT_MONGODB_DB_URL || "mongodb://" + config.mongo.user + ":" + config.mongo.pass + "@" + config.mongo.host + ":" + config.mongo.port + "/" + config.mongo.dbname;
console.log("ENV_MONGO: " + config.mongo.connecturl);