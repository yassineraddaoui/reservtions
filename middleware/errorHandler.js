
const ErrorHandler = (err, req, res, next) => {
    console.log(err)
    res.render('404',{loggedIn: req.cookies.token });
}

module.exports = ErrorHandler;

