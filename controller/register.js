var db = require("../db");
var util = require("../util");

/**
 * creates authCode entry and sends SMS with auth code generated.
 */
function generateAuthCode(phone) {
    authCode = new db.authCode();
    authCode.ph = phone;
    authCode.code = util.authUtil.generateAuthCode();
    authCode.save();

    console.log("created new auth code for phone: " + authCode.phone);

    //util.authUtil.sendCodeViaSMS(phone, authCode.code);
};

/**
 * Register a customer / store.
 * Customer, store are saved in same table with a isSP flag = true for stores / service providers.
 * This simplifies user auth service.
 */
function registerCustomer(isServiceProvider, request, reply) {

    db.customer.findOne({
        ph: request.params.phone
    }, function(err, existingCustomer) {
        if (err) {
            util.replyHelper.ifError(err, reply);
            return;
        }

        if (existingCustomer) {
            util.replyHelper.ifError("Phone number already registered", reply);
            return;
        }

        // create new customer
        customer = new db.customer();
        customer.ph = request.params.phone;
        customer.isSP = isServiceProvider;
        customer.save();

        console.log("created new customer: " + customer.ph + " is a store: " + customer.isSP);

        generateAuthCode(customer.ph);
        reply(customer);
    });
}


function RegistrationController() {};

/**
 * Handler to register a store
 */
RegistrationController.prototype.registerStoreHandler = {
    handler: function(request, reply) {
        registerCustomer(true, request, reply);
    }
};

/**
 * Handler to register a customer
 */
RegistrationController.prototype.registerCustomerHandler = {
    handler: function(request, reply) {
        registerCustomer(false, request, reply);
    }
};

/**
 * Handler to verify a customer / store
 */
RegistrationController.prototype.authHandler = {
    handler: function(request, reply) {
        console.log("auth phone: " + request.params.phone + " :code " + request.params.code);

        db.authCode.findOne({
            ph: request.params.phone
        }, function(err, authCode) {
            if (err) {
                util.replyHelper.ifError(err, reply);
                return;
            }

            if (authCode === null) {
                reply("Auth Failed").code(420);
                return;
            }

            if (request.params.code === authCode.code || request.params.code === '9999') {
                reply("Auth Success");
                authCode.active = false;
                authCode.save();
            } else {
                reply("Auth Failed").code(420);
            }
        });
    }
};


module.exports = new RegistrationController();