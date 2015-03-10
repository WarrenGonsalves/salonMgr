var db = require("../db");
var fs = require('fs');
var config = require("../config/constants");
var util = require("../util");
var _ = require('underscore');

function ContractController() {};

ContractController.prototype.getHandler = {

    handler: function(request, reply) {
        //empty
    }
};

ContractController.prototype.postHandler = {
    payload: {
        output: 'stream',
        allow: 'multipart/form-data'
    },
    handler: function(request, reply) {

        var contract = new db.contract();
        contract.customer_id = request.payload.customer_id;
        contract.save();

        var img = request.payload["img"];
        var fileName = "contract_" + contract._id;
        var path = config.imgDir + fileName;
        console.log(path);
        img.pipe(fs.createWriteStream(path));

        img.on('end', function(err) {
            contract.contract_img = config.imgURL + fileName;
            contract.save();
            reply(contract);
        });
    }
};

module.exports = new ContractController();