var db = require('../db');
var _ = require('underscore');
var util = require('../util');

function CatalogController() {};

CatalogController.prototype.getAllCatalog = {
    handler: function (request, reply) {
        var query_param = {'delete_status': 0}

        db.catalog.find(query_param).exec(function (err, catalogList) {
            if (err) {
                util.reply.error(err, reply);
                return;
            }

            reply({
                catalogList: catalogList
            });
        });
    }
};

CatalogController.prototype.getVendorCatalog = {
    handler: function (request, reply) {
        
        var query_param = { 'specialist_id': request.params.specialist_id, 'delete_status': 0 }

        db.catalog.find(query_param).exec(function (err, catalogList) {
            if (err) {
                util.reply.error(err, reply);
                return;
            }

            reply({
                catalogList: catalogList
            });
        });
    }
};

CatalogController.prototype.getCatalog = {
    handler: function (request, reply) {

        var query_param = { '_id': request.params._id, 'delete_status': 0 }

        db.catalog.find(query_param).exec(function (err, catalogList) {
            if (err) {
                util.reply.error(err, reply);
                return;
            }

            reply({
                catalogList: catalogList
            });
        });
    }
};

/**
 * add new catalog for a given vendor
 * @params -
 *      specialist_id, name, detail, price, icon_size_image, medium_image
 *      
 */
CatalogController.prototype.addCatalog = {
    handler: function (request, reply) {
        //console.log(request.payload);
        //console.log(request.payload.specialist_id);
        if (request.payload.specialist_id === undefined) {
            return util.reply.error("Invalid specialist id", reply);
        }
        db.catalog.count({ specialist_id: request.payload.specialist_id }, function (err, c) {
            if (err) return util.reply.error("Error while adding catalog: ", err);
            //max count = 50
            if (c < 50) {
                if (request.payload.name === undefined) {
                    return util.reply.error("Invalid catalog name", reply);
                }

                if (request.payload.detail === undefined) {
                    return util.reply.error("Invalid catalog detail", reply);
                }

                if (request.payload.price === undefined) {
                    return util.reply.error("Invalid catalog detail", reply);
                }

                if (request.payload.icon_size_image === undefined) {
                    return util.reply.error("Invalid catalog icon size image", reply);
                }

                if (request.payload.medium_image === undefined) {
                    return util.reply.error("Invalid catalog medium image", reply);
                }

                var catalog = new db.catalog();
                catalog.specialist_id = request.payload.specialist_id;
                catalog.name = request.payload.name;
                catalog.detail = request.payload.detail;
                catalog.price = request.payload.price;
                catalog.icon_size_image = request.payload.icon_size_image;
                catalog.medium_image = request.payload.medium_image;
                catalog.delete_status = 0;
                catalog.save();
                //console.log("new entry added to catalog");
                reply(catalog);
            }
            else {
                reply(0);
                return util.reply.error("Cannot add more catalog", reply);
            }
        });
    }
};

CatalogController.prototype.updateCatalog = {
    handler: function (request, reply) {
        //console.log(request.payload._id);

        if (request.payload._id === undefined) {
            return util.reply.error("Invalid catalog id", reply);
        }
        console.log(__filename + "update catalog by id: " + request.payload._id);
        
        var catalogId = request.payload._id;
        delete request.payload._id;
        delete request.payload.specialist_id;
        db.catalog.update({ '_id': catalogId },
            request.payload,
            function (err, data) {
                if (err) util.reply.error(err, reply);
                reply({
                    success: true
                });
            });
    }
};

CatalogController.prototype.deleteCatalog = {
    handler: function (request, reply) {
        console.log(request.payload._id);
        if (request.payload._id === undefined) {
            return util.reply.error("Invalid catalog id", reply);
        }
        console.log(__filename + "delete catalog by id: " + request.payload._id);
        var updateDeleteFlag = {
            delete_status: 1
        };
        db.catalog.update({ '_id': request.payload._id },
            updateDeleteFlag,
            function (err, data) {
                if (err) util.reply.error(err, reply);
                reply({
                    success: true
                });
        });
    }
};

module.exports = new CatalogController();