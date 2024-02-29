
const ErrorHandler = (err, req, res, next) => {
    console.log(err)
    res.render('404');
}

module.exports = ErrorHandler;

