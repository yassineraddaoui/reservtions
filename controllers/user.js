const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwtHelper = require('../utils/JWTUtils')

exports.loginForm = async (req, res) => {
  try {
      res.render('sign-in');
  } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error 500');
  }
}
exports.signupForm = async (req, res) => {
  try {
      res.render('sign-up');
  } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
  }
}
exports.signup = (req, res, next) => {
  
    bcrypt.hash(req.body.password, 10).then(
      (hash) => {
        const user = new User({
          username:req.body.username,
          email: req.body.email,
          password: hash,
          role: req.body.role
        });
        user.save().then(
          () => {
            res.status(201).json({
              message: 'User added successfully!',
              token:jwtHelper.generateToken(user)
            });
          }
        ).catch(
          (error) => {
            res.status(500).json({
              error: error
            });
          }
        );
      }
    );
  };

  exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }).then(
      (user) => {
        if (!user) {
          return res.status(401).json({
            error: new Error('User not found!')
          });
        }
        bcrypt.compare(req.body.password, user.password).then(
          (valid) => {
            if (!valid) {
              return res.status(401).json({
                error: new Error('Incorrect password!')
              });
            }
            let tk;
        try {
            tk = jwtHelper.generateToken(user)
            res.cookie('token', tk)
          } catch (err) {
            console.log(err);
            const error =
                new Error("Error! Something went wrong.");
            return next(error);
        }
            res.status(200).json({
              userId: user._id,
              token: tk
            });
          }
        ).catch(
          (error) => {
            res.status(500).json({
              error: error
            });
          }
        );
      }
    ).catch(
      (error) => {
        res.status(500).json({
          error: error
        });
      }
    );
  }
  