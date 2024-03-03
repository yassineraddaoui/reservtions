const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwtHelper = require('../utils/JWTUtils')

exports.loginForm = async (req, res) => {
  try {
    res.render('sign-in',{loggedIn:false});
  } catch (err) {
    next(err)
  }
}
exports.signupForm = async (req, res) => {
  try {
    res.render('sign-up',{loggedIn:false});
  } catch (err) {
    next(err)
  }
}
exports.logout = (req, res, next) => {
  try {
    res.clearCookie('token');
    res.render('sign-in',{loggedIn:false})
    } catch (err) {
    next(err)
  }
}
exports.signup = (req, res, next) => {

  bcrypt.hash(req.body.password, 10).then(
    (hash) => {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        role: req.body.role
      });
      user.save().then(
        () => {
          let tk = jwtHelper.generateToken(user);
          res.cookie('token', tk).render('index',{loggedIn:true});
      }
      ).catch(
        (error) => {
          res.render('sign-up',{loggedIn:false,message:'Invalide Data'});
        }
      );
    }
  );
};

exports.login = (req, res, next) => {
  let jwtToken;
  User.findOne({ email: req.body.email }).then(
    (user) => {
      if (!user) {
        res.render('sign-in',{loggedIn:false});
      }
      bcrypt.compare(req.body.password, user.password).then(
        (valid) => {
          if (!valid) {
            return res.render('sign-in',{loggedIn:false,message:'Invalide Data'})
          }
            jwtToken = jwtHelper.generateToken(user);
            res.cookie('token', jwtToken).render('index',{loggedIn:true}); 
        }
      ).catch(
        (error) => {
          next(error);
        }
      );
    }
  ).catch(
    (error) => {
      next(error);
    }
  );
}
