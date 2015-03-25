var db = require('../db');
var _ = require('underscore');
var util = require('../util');

function CatalogController() { };

CatalogController.prototype.getAllCatalog = {
    handler: function (request, reply) {

        var query_param = {'catalog.delete_status': 0}

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

        var query_param = { 'vendor_id': request.params.vendor_id, 'catalog.delete_status': 0 }

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

CatalogController.prototype.addCatalog = {
    handler: function (request, reply) {
        if (request.payload.vender_id === undefined) {
            return util.reply.error("Invalid vender id", reply);
        }
        db.catalog.count({ vendor_id: request.payload.vender_id }, function (err, c) {
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
                catalog.vender_id = request.payload.vender_id;
                catalog.name = request.payload.name;
                catalog.detail = request.payload.detail;
                catalog.price = request.payload.price;
                catalog.icon_size_image = request.payload.icon_size_image;
                catalog.medium_image = request.payload.medium_image;
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
        var catalogObject = request.payload.catalogObj.catalog_id;
        delete catalogObject.catalog_id;
        db.catalog.update({ 'catalog._id': request.payload.catalogObj.id },
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
        db.catalog.update({ 'catalog._id': request.params.catalog_id },
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