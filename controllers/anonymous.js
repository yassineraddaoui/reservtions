const Room = require('../models/room');

exports.getAbout = async (req, res) => {
    try {
        res.render('about',{loggedIn: req.cookies.token });
    } catch (err) {
        next(err)
    }
}

exports.getContact = async (req, res) => {
    try {
        res.render('contact',{loggedIn: req.cookies.token });
    } catch (err) {
        next(err)
    }
}

exports.getSignIn = async (req, res) => {
    try {
        res.render('sign-in',{loggedIn: false});
    } catch (err) {
        next(err)
    }
}
exports.getSignUp = async (req, res) => {
    try {
        res.render('sign-up',{loggedIn : false});
    } catch (err) {
        next(err)
    }
}
exports.getIndex = async (req, res) => {
    try {
        res.render('index.ejs',{loggedIn: req.cookies.token});
    } catch (err) {
        next(err)
    }
}