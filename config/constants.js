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


if (process.env.NODE_ENV == 'prod') {
    config.env = 'prod';
    config.server.ip = '127.0.0.1';
    config.server.port = '8081';
    // Mongo
    //config.mongo.connecturl = "mongodb://dbuser2:admin@127.0.0.1:27017/optimus";
    config.mongo.connecturl = process.env.MONGO_URL;
    // Data dir
    // '/var/data/handz'
    config.dataDir = process.env.DATA_DIR;

    //config.imgURL = 'http://handz-api.elasticbeanstalk.com' + '/img/';
    config.imgURL = process.env.DOMAIN_URL + '/img/';

    //shopify
    config.shopify_url = "https://cb17c02512c49edbdff2c5a56cb8f3f1:63d249fc225678150b9518fe9988c034@handsforhome-prod.myshopify.com/"
    
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

    //shopify
    config.shopify_url = "https://5c836e6567c765665a2aab4e434493ff:83b8525775eac64994c7cfb95d7ea9c9@handsforhome.myshopify.com/";
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

    //shopify
    config.shopify_url = "https://5c836e6567c765665a2aab4e434493ff:83b8525775eac64994c7cfb95d7ea9c9@handsforhome.myshopify.com/";
}

config.imgDir = config.dataDir + "/img/";
console.log("ENV_MONGO: " + config.mongo.connecturl);
//util.logger.info("Config",[], config);

