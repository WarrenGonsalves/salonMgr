var db = require('../db');
var _ = require('underscore');
var util = require('../util');

function CatalogController() {};

CatalogController.prototype.getAllCatalog = {
    handler: function (request, reply) {

        var query_param = {'delete_status': 0}

        // TODO sort by book date.
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

        // TODO sort by book date.
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
        var reqObj = request.payload;
        console.log(reqObj.specialist_id);
        if (reqObj.specialist_id === undefined) {
            return util.reply.error("Invalid specialist id", reply);
        }
        db.catalog.count({ specialist_id: reqObj.specialist_id }, function (err, c) {
            if (err) return util.reply.error("Error while adding catalog: ", err);
            //max count = 50
            if (c < 50) {
                if (reqObj.name === undefined) {
                    return util.reply.error("Invalid catalog name", reply);
                }

                if (reqObj.detail === undefined) {
                    return util.reply.error("Invalid catalog detail", reply);
                }

                if (reqObj.price === undefined) {
                    return util.reply.error("Invalid catalog detail", reply);
                }

                if (reqObj.icon_size_image === undefined) {
                    return util.reply.error("Invalid catalog icon size image", reply);
                }

                if (reqObj.medium_image === undefined) {
                    return util.reply.error("Invalid catalog medium image", reply);
                }

                var catalog = new db.catalog();
                catalog.specialist_id = reqObj.specialist_id;
                catalog.name = reqObj.name;
                catalog.detail = reqObj.detail;
                catalog.price = reqObj.price;
                catalog.icon_size_image = reqObj.icon_size_image;
                catalog.medium_image = reqObj.medium_image;
                catalog.delete_status = 0;
                catalog.save();

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
        if (request.payload.catalogObj.catalog_id === undefined) {
            return util.reply.error("Invalid catalog id", reply);
        }
        console.log(__filename + "update catalog by id: " + request.payload.catalogObj.catalog_id);
        var catalogObject = request.payload.catalogObj;
        delete catalogObject.catalog_id;
        db.catalog.update({ '_id': request.payload.catalogObj.catalog_id },
            catalogObject,
            function (err, data) {
                util.reply.error(err, reply);
                reply({
                    success: true
                });
            });
    }
};

CatalogController.prototype.deleteCatalog = {
    handler: function (request, reply) {
        if (request.params.catalog_id === undefined) {
            return util.reply.error("Invalid catalog id", reply);
        }
        console.log(__filename + "delete catalog by id: " + request.params.catalog_id);
        db.catalog.update({ '_id': request.params.catalog_id },
            { $set: { delete_status: 1 } },
            function (err, data) {
                util.reply.error(err, reply);
                reply({
                    success: true
                });
        });
    }
};

module.exports = new CatalogController();