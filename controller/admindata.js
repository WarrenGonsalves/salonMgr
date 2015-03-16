var db = require("../db");
var fs = require('fs');
var config = require("../config/constants");
var util = require("../util");
var _ = require('underscore');

function AdminDataController() {};

AdminDataController.prototype.getHandler = {
    handler: function(request, reply) {

        console.log(request.params.entity, request.query);

        if (request.params.entity === undefined) {
            util.reply.error("requires a valid entity to query.", reply);
            return;
        }

        db[request.params.entity].find(request.query).exec(function(err, dataList) {

            if (err) {
                util.reply.error(err, reply);
                return;
            }

            reply({
                data: dataList
            });
        });
    }
};

AdminDataController.prototype.postHandler = {
    handler: function(request, reply) {

        db["contract"].find(request.query).exec(function(err, contracts) {
            reply({
                contracts: contracts
            });
        });
    }
};


AdminDataController.prototype.putHandler = {
    handler: function(request, reply) {

        db["contract"].find(request.query).exec(function(err, contracts) {
            reply({
                contracts: contracts
            });
        });
    }
};

AdminDataController.prototype.deleteHandler = {
    handler: function(request, reply) {

        console.log(request.params.entity, request.query);

        if (request.params.entity === undefined) {
            util.reply.error("requires a valid entity to remove.", reply);
            return;
        }

        db[request.params.entity].remove(request.query).exec(function(err, data) {

            if (err) {
                util.reply.error(err, reply);
                return;
            }

            reply({
                data: data
            });
        });
    }
};

var controller = new AdminDataController();
module.exports = controller;