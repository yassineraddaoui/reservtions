const Room = require('../models/room');

exports.getAbout = async (req, res) => {
    try {
        res.render('about',{loggedIn: req.cookies.token });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

exports.getContact = async (req, res) => {
    try {
        res.render('contact',{loggedIn: req.cookies.token });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

exports.getSignIn = async (req, res) => {
    try {
        res.render('sign-in',{loggedIn: false});
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error 500');
    }
}
exports.getSignUp = async (req, res) => {
    try {
        res.render('sign-up',{loggedIn : false});
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}
exports.getIndex = async (req, res) => {
    try {
        res.render('index.ejs',{loggedIn: req.cookies.token});
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}