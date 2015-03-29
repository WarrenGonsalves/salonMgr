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

        model_metadata = model.schema.paths;
        data = new model();

        // process all set fields
        _.each(request.payload, function(field_value, field_key) {
            console.log("--", field_key, field_value);

            if (model_metadata[field_key]) {

                var datatype = String(model_metadata[field_key].options.type);

                if ("String" == model_metadata[field_key].instance) {
                    console.log(field_key, "is a string");
                    data[field_key] = field_value;
                } else if (datatype.indexOf("Boolean") != -1) {
                    console.log(field_key, "is a boolean");
                    data[field_key] = field_value;
                } else if (datatype.indexOf("Number") != -1) {
                    console.log(field_key, "is a Number");
                    data[field_key] = field_value;
                }

            } else {
                console.log("xxxx --- ", "cannot find key ", field_key)
            }

        });

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

            model_metadata = model.schema.paths;

            // process all updates fields.
            _.each(request.payload, function(field_value, field_key) {
                console.log("--", field_key, field_value);

                if (model_metadata[field_key]) {

                    var datatype = String(model_metadata[field_key].options.type);

                    if ("String" == model_metadata[field_key].instance) {
                        console.log(field_key, "is a string");
                        data[field_key] = field_value;

                    } else if (datatype.indexOf("Boolean") != -1) {
                        console.log(field_key, "is a boolean");
                        data[field_key] = field_value;

                    }

                } else {
                    console.log("xxxx --- ", "cannot find key ", field_key)
                }

            });

            data.save();

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

var controller = new AdminDataController();
module.exports = controller;