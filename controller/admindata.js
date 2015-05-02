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

        if (request.params.entity === undefined) {
            util.reply.error("requires a valid entity to query.", reply);
            return;
        }

        var model = db[request.params.entity];
        data = new model();

        controller.decorateModel(model, data, request.payload)

        data.save();

        reply({
            data: data
        });
    }
};


AdminDataController.prototype.putHandler = {
    handler: function(request, reply) {

        if (request.params.entity === undefined) {
            util.reply.error("requires a valid entity to query.", reply);
            return;
        }

        if (request.params.id === undefined) {
            util.reply.error("requires a valid id to query.", reply);
            return;
        }

        var model = db[request.params.entity];
        model.findById(request.params.id).exec(function(err, data) {

            if (err) {
                util.reply.error(err, reply);
                return;
            }

            if (null == data) {
                util.reply.error("No data for given id", reply);
                return;
            }

            controller.decorateModel(model, data, request.payload)

            data.save()

            reply({
                data: data
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

AdminDataController.prototype.metaHandler = {
    handler: function(request, reply) {
        var model = db[request.params.entity]
        var model_metadata = model.schema.paths

        var field_metadata = {}

        _.each(model_metadata, function(field){
            //var datatype = String(model_metadata[field.path].options.type);
            field_metadata[field.path] = String(model_metadata[field.path].options.type)
            console.log("------- ", field)
        })
        model_metadata.field_metadata = field_metadata
        reply(model_metadata)
    }
};

AdminDataController.prototype.decorateModel = function(model, modelInstance, fieldMap) {

    var model_metadata = model.schema.paths;

    // process all updates fields.
    _.each(fieldMap, function(field_value, field_key) {
        console.log("decorateModel", field_key, field_value);

        if (model_metadata[field_key]) {

            var datatype = String(model_metadata[field_key].options.type);

            if ("String" == model_metadata[field_key].instance) {
                console.log(field_key, "is a string");
                modelInstance[field_key] = field_value;
            } else if (datatype.indexOf("Boolean") != -1) {
                console.log(field_key, "is a boolean");
                modelInstance[field_key] = field_value;
            } else if (datatype.indexOf("Number") != -1) {
                console.log(field_key, "is a Number");
                modelInstance[field_key] = field_value;
            }

        } else {
            console.log("decorateModel ", "cannot find key ", field_key)
        }

        return modelInstance;
    });

}

var controller = new AdminDataController();
module.exports = controller;