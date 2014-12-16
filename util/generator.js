var hat = require('hat');

/**
 * Helper method to return a random UUID
 * @return - random id - 0c82a54f22f775a3ed8b97b2dea74036
 */
module.exports.getUUID = function() {
    return hat();
}