var db = require('../db');
var _ = require('underscore');
var util = require('../util');
var fs = require('fs');
var config = require("../config/constants");

function CatalogController() {};

CatalogController.prototype.getAllCatalog = {
    handler: function (request, reply) {
        if (request.query.catalogId === undefined) {
            var query_param = { 'delete_status': 0 }

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
        else
        {
            var query_param = { '_id': request.query.catalogId, 'delete_status': 0 }

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

/**
 * add new catalog for a given vendor
 * @params -
 *      specialist_id, name, detail, price, icon_size_image, medium_image
 *      
 */
CatalogController.prototype.addCatalog = {
    payload: {
        output: 'stream',
        allow: 'multipart/form-data'
    },
    handler: function (request, reply) {
        //console.log(request.payload.specialist_id);
        //console.log(request.payload.icon_size_image);

        if (request.payload.icon_size_image === undefined) {
            return util.reply.error("Invalid catalog icon size image", reply);
        }

        if (request.payload.medium_image === undefined) {
            return util.reply.error("Invalid catalog medium image", reply);
        }

        console.log("Adding new catalog: specialist_id= " + request.payload.specialist_id + " catalog name= " + request.payload.name);
        var catalog = new db.catalog();
        catalog.specialist_id = request.payload.specialist_id;
        catalog.name = request.payload.name;
        catalog.detail = request.payload.detail;
        catalog.price = request.payload.price;
        //catalog.icon_size_image = request.payload.icon_size_image;
        //catalog.medium_image = request.payload.medium_image;
        //catalog.delete_status = 0;       
        /*catalog.save(function(err) {
            if(err) return util.reply.error(err, reply);
        });*/
        //console.log("new entry added to catalog");
        //reply(catalog);

        //new
        //console.log(request.payload.icon_size_image.hapi.filename);
        var count = 0;
        //var re = /(?:\.([^.]+))?$/;
        //Upload icon image
        var icon_size_image = request.payload.icon_size_image;
        var iconFileName = "catalogIcon_" + catalog._id; //+ "." + re.exec(request.payload.icon_size_image.hapi.filename)[1];
        var iconPath = config.imgDir + iconFileName;
        console.log(iconPath);
        icon_size_image.pipe(fs.createWriteStream(iconPath));

        icon_size_image.on('end', function (err) {
            catalog.icon_size_image = config.imgURL + iconFileName;
            
            if (++count > 1) {
                catalog.save(function(err) {
                    if(err) return util.reply.error(err, reply);
                    console.log("New catalog added");
                    reply(catalog);
                });
            }
        });
        //Upload medium image
        var medium_image = request.payload.medium_image;
        var medImgFileName = "catalogMedImg_" + catalog._id; //+ "." + re.exec(request.payload.medium_image.hapi.filename)[1];
        var medImgPath = config.imgDir + medImgFileName;
        console.log(medImgPath);
        medium_image.pipe(fs.createWriteStream(medImgPath));

        medium_image.on('end', function (err) {
            catalog.medium_image = config.imgURL + medImgFileName;

            if (++count > 1) {
                catalog.save(function(err) {
                    if(err) return util.reply.error(err, reply);
                    console.log("New catalog added");
                    reply(catalog);
                });
            }
        })
        /*db.catalog.count({ specialist_id: request.payload.specialist_id, delete_status: 0 }, function (err, c) {
            if (err) return util.reply.error("Error while adding catalog: ", err);
            //max count = 50
            if (c < 50) {
            }
            else {
                util.reply.error("Cannot add more catalog", reply);
            }
        });*/
    }
};

CatalogController.prototype.updateCatalog = {
    payload: {
        output: 'stream',
        allow: 'multipart/form-data'
    },
    handler: function (request, reply) {
        //console.log(request.payload._id);

        if (request.payload._id === undefined) {
            return util.reply.error("Invalid catalog id", reply);
        }
        console.log(__filename + "update catalog by id: " + request.payload._id);
        
        delete request.payload.specialist_id;
        if(request.payload.icon_size_image !== undefined || request.payload.medium_image !== undefined)
        {
            var count = 0;
            //var re = /(?:\.([^.]+))?$/;
            if(request.payload.icon_size_image !== undefined) {
                //Update icon image
                var icon_size_image = request.payload.icon_size_image;
                var iconFileName = "catalogIcon_" + request.payload._id; //+ "." + re.exec(request.payload.icon_size_image.hapi.filename)[1];
                var iconPath = config.imgDir + iconFileName;
                console.log(iconPath);
                icon_size_image.pipe(fs.createWriteStream(iconPath));

                icon_size_image.on('end', function (err) {
                    request.payload.icon_size_image = config.imgURL + iconFileName;
                    console.log('icon image uploaded');
                    if (++count > 1) updateCatalogDb(request.payload, request, reply);
                });
            }
            else ++count;
            if(request.payload.medium_image !== undefined) {
                var medium_image = request.payload.medium_image;
                var medImgFileName = "catalogMedImg_" + request.payload._id; //+ "." + re.exec(request.payload.medium_image.hapi.filename)[1];
                var medImgPath = config.imgDir + medImgFileName;
                console.log(medImgPath);
                medium_image.pipe(fs.createWriteStream(medImgPath));

                medium_image.on('end', function (err) {
                    request.payload.medium_image = config.imgURL + medImgFileName;
                    console.log('medium image uploaded');
                    if (++count > 1) updateCatalogDb(request.payload, request, reply);
                })
            }
            else ++count;
        }
        else {
            updateCatalogDb(request.payload, request, reply);
        }
    }
};

var updateCatalogDb = function(catalog, request, reply)
{
    var catalogId = request.payload._id;
    delete catalog._id;
    db.catalog.update({ '_id': catalogId },
        request.payload,
        function (err, data) {
            if (err) util.reply.error(err, reply);
            reply({
                success: true
            });
        }
    );
}

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