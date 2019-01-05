const passport = require('passport');
const Authentication = require('../controllers/authentication');

const requireAuth = passport.authenticate('jwt', { session: false});
const requireSignin = passport.authenticate('local', { session: false });

module.exports = (app) => {
  app.get('/', requireAuth, function(req, res) {
    res.send({ hi: 'there' });
  });

  app.post('/signin', requireSignin, Authentication.signin);

  app.post('/signup', Authentication.signup);

  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/auth/linkedin', passport.authenticate('linkedin', {
    scope: ['r_basicprofile', 'r_emailaddress']
    })
  );

  app.get('/auth/linkedin/callback', passport.authenticate('linkedin'));
  
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
