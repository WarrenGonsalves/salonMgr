var db = require("../db");
var util = require("../util");
var config = require("../config/constants");
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../config/constants');
// var bcrypt = require('bcrypt-nodejs');

function AuthController() {};

/*
 |-----------------------------------------------------------
 | Generate JSON Web Token
 |-----------------------------------------------------------
 */
function createJWT(studio) {
  var payload = {
    sub: studio._id,
    admin: studio.isAdmin,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, config.tokenSecret);
}

/*
 |-----------------------------------------------------------
 | @Function postLogin
 | POST /auth/login
 | Log in with Email 
 |-----------------------------------------------------------
 */
AuthController.prototype.postLogin = {
    handler: function(request, reply) {
      var query_param = {};
      var key = request.payload.key;
      if (key.indexOf('@') > 0) {
          query_param['email'] = key;
      } else if (!isNaN(key)) {
          query_param['phone'] = key;
      } else return util.reply.authError('Email or mobile required', reply);
      
      db.studio.findOne(query_param, '+password', function(err, studio) {
        if (!studio) {
          return util.reply.authError('Wrong access credentials', reply);
        }
        // console.log(studio);
        // bcrypt.genSalt(10, function(err, salt) {
        //   if (err) return next(err);
        //   bcrypt.hash("sassy", salt, null, function(err, hash) {
        //     console.log(hash);
        //   });
        // });
        studio.comparePassword(request.payload.password, function(err, isMatch) {
          if (!isMatch) {
            return util.reply.authError('Wrong access credentials', reply);
          }
          else{
            console.log("LOGIN SUCCESS");
            reply({ token: createJWT(studio)});
          }
          
        });
      });
        
    }
};

AuthController.prototype.changePassword = function(request, reply) {
  db.studio.findById(request.pre.user,'+password', function(err, studio){
      if(err)
          util.reply.error(err, reply);
      else if(!studio){
          util.reply.authError('Wrong email and/or password', reply);
      }
      else{
          studio.comparePassword(request.payload.oldPassword, function(err, isMatch){
              if(err)
                  util.reply.error(err, reply);
              else if(!isMatch){
                  util.reply.authError("Invalid old password", reply);
              }
              else{
                  studio.password = request.payload.newPassword;
                  studio.save(function(err, studio){
                      if(err)
                          util.reply.error(err, reply);
                      else{
                        if (studio.email)
                          util.email.sendPasswordChange(studio.name, studio.phone);
                        if (studio.phone) 
                          util.sms.sendPasswordChange(studio.name, studio.phone);
                        var result = {
                          message: "Password changed"
                        }
                        reply(result);
                      }
                  });
              }
          });

      }
  });
};

AuthController.prototype.resetStudioPassword = {
  handler: function(request, reply) {
    var query_param = {};
    var key = request.payload.key;
    if (key.indexOf('@') > 0) {
        query_param['email'] = key;
    } else if (!isNaN(key)) {
        query_param['phone'] = key;
    } else return util.reply.authError('Email or mobile required', reply);
    console.log(query_param)
    db.studio.findOne(query_param,'+password', function(err, studio){
      console.log(studio)
      if(err)
          util.reply.error(err, reply);
      else if(!studio){
          util.reply.authError('Wrong credentials', reply);
      }
      else{
        var newPassword = makeRandomString(7); 
        studio.password = newPassword;
        console.log(newPassword);
        studio.save(function(err, studio){
            if(err)
                util.reply.error(err, reply);
            else{
              if (studio.email)
                util.email.sendPasswordReset(studio.name, studio.phone, newPassword);
              if (studio.phone) 
                util.sms.sendPasswordReset(studio.name, studio.phone, newPassword);
              var result = {
                message: "Password reset"
              }
              reply(result);
            }
        });
              

      }
    });
  }
}



/*
 |-----------------------------------------------------------
 | Login Required Middleware
 |-----------------------------------------------------------
 */
AuthController.prototype.ensureAuthenticated = function (request, reply) {
  if (!request.headers.authorization) {
    return util.reply.authFail('You need to login to do that', reply);
  }
  var token = request.headers.authorization.split(' ')[1];

  var payload = null;
  try {
    payload = jwt.decode(token, config.tokenSecret);
  }
  catch (err) {
    return util.reply.authFail("Invalid token", reply);
  }

  if (payload.exp <= moment().unix()) {
    return util.reply.authFail('Token has expired. Please login again.', reply);
  }
  user = payload.sub;
  
  // util.reply.authFail('Wrong email and/or password', reply);
  reply(user);
};

AuthController.prototype.isAdmin = function (request, reply) {
  db.studio.findById(request.pre.user, function(err, studio){
    if(err)
        util.reply.authFail(err, reply);
    else if(!studio){
        util.reply.authFail('User invalid', reply);
    }
    else{
      reply(studio.isAdmin);
    }
  });
};

function makeRandomString(length)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

module.exports = new AuthController();