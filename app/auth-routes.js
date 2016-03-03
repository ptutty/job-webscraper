


// authentication stuff =================================================
var secret = 'this is the secret secret secret 12356';
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');


module.exports = function (app) {

    // authentication routes =================================================

    // We are going to protect /api routes with JWT
    app.use('/api', expressJwt({secret: secret}) );

    app.post('/authenticate', function (req, res) {
      // todo - validate req.body.username and req.body.password
      //if is invalid, return 401
      if (!(req.body.username === 'john.doe' && req.body.password === 'foobar')) {
        res.send(401, 'Wrong user or password');
        return;
      }

      var profile = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@doe.com',
        id: 123
      };

      // We are sending the profile inside the token
      var token = jwt.sign(profile, secret, { expiresIn: 6000*5 });
      // session expires in 5 minutes
      res.json({ token: token });
    });

    app.get('/api/restricted', function (req, res) {
      console.log('user ' + req.user.email + ' is calling /api/restricted');
      res.json({
        name: 'foo'
      });
    });


};
