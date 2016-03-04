var passport = require('passport');
module.exports = function (app, User) {

    // authnetication routes ======================================

    // register route
    app.post('/register', function(req, res) {
      User.register(new User({ username: req.body.username }),
        req.body.password, function(err, account) {
        if (err) {
          return res.status(500).json({
            err: err
          });
        }
        passport.authenticate('local')(req, res, function () {
          return res.status(200).json({
            status: 'Registration successful!'
          });
        });
      });
    });

    // login route
    app.post('/login', function(req, res, next) {
      passport.authenticate('local', function(err, user, info) {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(401).json({
            err: info
          });
        }
        req.logIn(user, function(err) {
          if (err) {
            return res.status(500).json({
              err: 'Could not log in user'
            });
          }
          res.status(200).json({
            status: 'Login successful!'
          });
        });
      })(req, res, next);
    });

    app.get('/logout', function(req, res) {
      req.logout();
      res.status(200).json({
        status: 'Bye!'
      });
    });



};