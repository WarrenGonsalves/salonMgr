var db = require("../db");
var util = require("../util");

function RegistrationController() {};

RegistrationController.prototype.registerStoreHandler = {
    handler: function(request, reply) {

        db.store.findOne({
            ph: request.params.phone
        }, function(err, store) {
            util.replyHelper.ifError(err, reply);
            if (store) {
                util.replyHelper.ifError("Store already registered", reply);
                return;
            }

            // create new store
            store = new db.store();
            store.ph = request.params.phone;
            store.save();
            reply(store);
        });
    }
};

module.exports = new RegistrationController();