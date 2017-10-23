var passport = require("passport");
var request = require("request");

module.exports = function (app) {
    app.get('/', authController.signup);
    app.get('/signin', authController.signin);
    app.get('/selection', isLoggedIn, authController.selection);
    app.get('/logout', authController.logout);
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/selection',
        failureRedirect: '/',
        failureFlash:true
    }));

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
    }
    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/selection',
        failureRedirect: '/',
        failureFlash:true
    }));
}