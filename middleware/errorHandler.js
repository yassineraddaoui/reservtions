
const ErrorHandler = (err, req, res, next) => {
    console.log('Error Handler !');
    res.render('404');
}

module.exports = ErrorHandler;

