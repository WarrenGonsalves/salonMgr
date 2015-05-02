var db = require("../db");
var fs = require('fs');
var config = require("../config/constants");
var util = require("../util");
var _ = require('underscore');
var async = require('async');

function ContractController() {};

ContractController.prototype.getHandler = {

    handler: function(request, reply) {
        db.contract.find(request.query).populate('visits').exec(function(err, contracts) {

            _.each(contracts, function(contract) {
                var pending_visits = 0
                _.each(contract.visits, function(visit) {
                    if (visit.status == 'Pending' || visit.status == 'Next') {
                        pending_visits++
                    }
                })
                contract.visits_remaining = contract.getVisitsRemaining(pending_visits)
            })

            reply({
                contracts: contracts
            })
        })
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
            contract.save(function(err, contract) {
                console.log(err)
                if (err) {
                    console.log("---- inside error ")
                    util.reply.error(err, reply)
                    return
                }

                reply(contract);

                // send email
                db.customer.findById(contract.customer_id).exec(function(err, customer) {
                    util.email.sendContractNotification(contract, customer);
                });
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

            db.decorateModel(db.contract, contract, request.payload)

            if (request.payload.start_date) {
                contract.start_date = new Date(Date.parse(request.payload.start_date))
            }

            if (request.payload.end_date) {
                contract.end_date = new Date(Date.parse(request.payload.end_date))
            }

            if (request.payload.visits) {
                async.each(request.payload.visits, function(visit_date, cb) {
                    var visit = new db.visit()

                    if (!Date.parse(visit_date)) {
                        cb("invalid date")
                        return
                    }

                    visit.date = new Date(Date.parse(visit_date));
                    console.log(visit)
                    contract.visits.push(visit.toJSON())
                    visit.contract_id = contract._id
                    visit.save()
                    cb()

                }, function(err) {
                    if (err) {
                        util.reply.error(err, reply)
                        return
                    }

                    contract.save(function(err, contract) {
                        if (err) {
                            util.reply.error(err, reply)
                            return
                        }

                        reply(contract);
                    })

                })
            } else {
                contract.save(function(err, contract) {
                    if (err) {
                        util.reply.error(err, reply)
                        return
                    }

                    reply(contract);
                })
            }
        })
    }
};

module.exports = new ContractController();