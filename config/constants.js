/*
*   Stores configuration for server / db
*   Overide necessary properties for local developement
*/
var config = module.exports = {};
 
console.log(process.env.OPENSHIFT_NODEJS_IP)
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
config.mongo.port = process.env.BUMBLEBEE_MONGODB_DB_PORT || "8989";
config.mongo.dbname = process.env.BUMBLEBEE_MONGODB_DB_NAME || "nodeplay";
config.mongo.user = process.env.BUMBLEBEE_MONGODB_DB_USER || "root";
config.mongo.pass = process.env.BUMBLEBEE_MONGODB_DB_PWD || "root";
