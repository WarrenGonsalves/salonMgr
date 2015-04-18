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
    payload: {
        output: 'stream',
        allow: 'multipart/form-data'
    },
    handler: function(request, reply) {

        var image = new db.image()
        var image_payload = request.payload["img"]
        console.log(image_payload.hapi.filename)
        var fileName = image_payload.hapi.filename
        var path = config.imgDir + "hands_" + fileName
        console.log(path)
        imageController.uploadImg(image_payload, path, function(err, data) {
            if (err) {
                util.reply.error(err, reply)
                return
            }

            image.name = fileName
            image.url = config.imgURL + "hands_" + fileName
            image.save()
            reply(image)
        })
    }
}

ImageController.prototype.uploadImg = function(img, path, cb) {
    console.log('image upload', path)
    img.pipe(fs.createWriteStream(path))
    img.on('end', cb)
}

imageController = new ImageController();
module.exports = imageController