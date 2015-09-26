var BASE_URL = '/auth';
var AuthController = require('../controller/auth');

module.exports = function() {
  return [
    {
      method: 'POST',
      path: BASE_URL + '/login',
      config: AuthController.postLogin
    },
    {
      method: 'POST',
      path: BASE_URL + '/changePassword',
      config: {
        pre: [
          { method: AuthController.ensureAuthenticated, assign: 'user'}
        ]
      },
      handler: AuthController.changePassword
    },
    {
      method: 'POST',
      path: BASE_URL + '/resetStudioPassword',
      config: AuthController.resetStudioPassword
    }
  ];
}();