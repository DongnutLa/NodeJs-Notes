const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'not authorized');
    res.redirect('/users/login');
};

module.exports = helpers;