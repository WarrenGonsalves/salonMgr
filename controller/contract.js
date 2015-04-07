var db = require("../db");
var fs = require('fs');
var config = require("../config/constants");
var util = require("../util");
var _ = require('underscore');
var adminData = require('./admindata');

function ContractController() {};

ContractController.prototype.getHandler = {

    handler: function(request, reply) {
        db.contract.find(request.query).exec(function(err, contracts) {
            reply({
                contracts: contracts
            });
        });
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

            // send email
            db.customer.findById(contract.customer_id).exec(function(err, customer) {
                util.email.sendContractNotification(contract, customer);
            });
        });
    }
};

ContractController.prototype.putHandler = {
    handler: function(request, reply) {
        db.contract.findById(request.params.id).exec(function(err, contract) {

            if (err) {
                util.reply.error(err, reply);
                return;
            }

            if (null == contract) {
                util.reply.error("No data for given id", reply);
                return;
            }

            adminData.decorateModel(db.contract, contract, request.payload)

            // //contract.
            // _.each(visits, function(visitDate){
            //     contract.visits.push({data: })
            // })

            reply(contract)
        })
    }
};

module.exports = new ContractController();