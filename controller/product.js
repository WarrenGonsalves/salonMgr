var db = require('../db')
var _ = require('underscore')
var util = require('../util')
var async = require('async')
var config = require('../config/constants')
var fs = require('fs')

var TAG = "Product"

function Controller() {}

Controller.prototype.getHandler = {
    handler: function(request, reply) {

        var query_params = {}
        query_params.active = {
            '$ne': false
        }

        _.extend(query_params, request.query)
        console.log(TAG, query_params)

        db.product.find(query_params).exec(function(err, list) {

            reply({
                list: list
            })
        })
    }
}

Controller.prototype.postHandler = {
    handler: function(request, reply) {

        var product = new db.product()
        db.decorateModel(db.product, product, request.payload)
        product.save(function(err, data) {
            if (err) {
                util.reply.error(err, reply)
                return;
            }
            reply(data);
        })
    }
}

Controller.prototype.putHandler = {
    handler: function(request, reply) {

        db.product.findById(request.params.id).exec(function(err, product) {

            if (err) {
                util.reply.error(err, reply)
                return;
            }

            if (null == product) {
                util.reply.error("No data for given id", reply)
                return;
            }

            db.decorateModel(db.product, product, request.payload)
            product.save(function(err, data) {
                if (err) {
                    util.reply.error(err, reply)
                    return
                }
                reply(data)
            })

        })
    }
}

Controller.prototype.deleteHandler = {
    handler: function(request, reply) {

        db.product.findById(request.params.id).exec(function(err, product) {

            if (err) {
                util.reply.error(err, reply);
                return;
            }

            if (null == product) {
                util.reply.error("No data for given id", reply);
                return;
            }

            product.active = false
            product.save()
            reply(product)
        })
    }
}

Controller.prototype.imgHandler = {
    payload: {
        output: 'stream',
        allow: 'multipart/form-data'
    },
    handler: function(request, reply) {

        if (!request.payload.img_s) {
            util.reply.error("img_s is required", reply)
            return;
        }

        if (!request.payload.img_l) {
            util.reply.error("img_l is required", reply)
            return;
        }

        db.product.findById(request.params.id).exec(function(err, product) {
            if (err) {
                util.reply.error(err, reply);
                return;
            }

            if (null == product) {
                util.reply.error("No data for given id", reply);
                return;
            }

            var img = request.payload["img"];
            var fileName = "profile_" + request.params.spc_id;
            var path = config.imgDir + fileName;
            console.log(path);

            async.parallel([function(callback) {
                    controller.uploadImg(request.payload.img_s, config.imgDir + "product_img_s_" + request.params.id, callback)
                },
                function(callback) {
                    controller.uploadImg(request.payload.img_l, config.imgDir + "product_img_l_" + request.params.id, callback)
                },
                function(err) {
                    if (err) {
                        util.reply.error(err, reply);
                        return;
                    }
                    reply("all ok")
                }
            ])

        })
    }
}

Controller.prototype.uploadImg = function(img, path, cb) {
    console.log('image upload', path)
    img.pipe(fs.createWriteStream(path))
    img.on('end', cb)
}

var controller = new Controller()
module.exports = controller