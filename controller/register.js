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

    // TODO: Enable this to send SMS code.
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
            util.reply.error(err, reply);
            return;
        }
        if (existingCustomer) {
            util.logger.info("Register",["Phone number already registered, sending existing customer.", existingCustomer]);
            reply(existingCustomer);
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

        // master code bypass
        if (request.params.code === '9999') {
            util.reply.success("Authentication successful", reply);
            return;
        }

        // If not mastercode then check in db.
        db.authCode.findOne({
            ph: request.params.phone,
            code: request.params.code
        }, function(err, authCode) {
            if (err) {
                util.reply.success(err, reply);
                return;
            }

            // auth code not found for give phone / code combination.
            if (authCode === null) {
                util.reply.error("Authentication failed", reply);
                return;
            }

            if (request.params.code === authCode.code) {
                util.reply.success("Authentication successful", reply);
                authCode.active = false;
                authCode.save();
            } else {
                util.reply.error("Authentication failed", reply);
            }
        });
    }
};


module.exports = new RegistrationController();