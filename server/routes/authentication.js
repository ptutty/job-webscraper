var passport = require('passport');
module.exports = function (app, User) {

    // authnetication routes ======================================

    // register route
    app.post('/user/register', function(req, res) {
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
    app.post('/user/login', function(req, res, next) {
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
            status: 'Login successful!',
            username: user.username
          });
        });
      })(req, res, next);
    });

    // logout
    app.get('/user/logout', function(req, res) {
      req.logout();
      res.status(200).json({
        status: 'Bye!'
      });
    });

    // persists users state in frontend - called every time routes changes
    app.get('/user/status', function(req, res) {

      if (!req.isAuthenticated() ) {
        return res.status(200).json({
          status: false
        });
      }
      res.status(200).json({
        status: true,
        user: req.user
      });

    });



};
