const passport = require('passport');
const Authentication = require('../controllers/authentication');

module.exports = (app) => {
  app.post('/signup', Authentication.signup);

  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));
};
