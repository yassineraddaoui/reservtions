const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
      (hash) => {
        const user = new User({
          username:req.body.username,
          email: req.body.email,
          password: hash
        });
        user.save().then(
          () => {
            res.status(201).json({
              message: 'User added successfully!'
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
            //Creating jwt token
            tk = jwt.sign(
                {
                    email: user.email
                },
                process.env.SECRET_KEY,
                { expiresIn: "1h" }
            );
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
  