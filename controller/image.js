var db = require("../db");
var util = require("../util");
var config = require("../config/constants");
var fs = require('fs');
var _ = require('underscore');

var TAG = "Images"

function ImageController() {};

ImageController.prototype.getHandler = {
    handler: function(request, reply) {

        var query_params = {}
        query_params.active = {
            '$ne': false
        }

        _.extend(query_params, request.query)
        console.log(TAG, query_params)

        db.image.find(query_params).exec(function(err, list) {

            reply({
                list: list
            })
        })

    }
};

ImageController.prototype.postHandler = {
    handler: function(request, reply) {

        var image = new db.image()


        var image_payload = request.payload["img"];
        var fileName = "hands_" + image._id;
        var path = config.imgDir + fileName;
        console.log(path);

    }
}

ImageController.prototype.uploadImg = function(img, path, cb) {
    console.log('image upload', path)
    img.pipe(fs.createWriteStream(path))
    img.on('end', cb)
}

exports = new ImageController();