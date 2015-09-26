var BASE_URL = '/bookings';
var BookingController = require('../controller/booking');

module.exports = function() {
  return [
    {
      method: 'GET',
      path: BASE_URL,
      config: BookingController.getConfigHandler
    }
  ];
}();