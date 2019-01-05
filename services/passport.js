const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;
const keys = require('../config/keys');

const localOptions = { usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
  User.findOne({ email: email }, function(err, user) {
    if(err) { return done(err, false); }
    if(!user) { return done(null, false); }
    user.comparePassword(password, function(err, isMatch) {
      if(err) { return done(err); }
      if(!isMatch) { return done(null, false); }
      return done(null, user);
    });
  });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload.sub, function(err, user) {
    if(err) { return done(err, false); }
    if(user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id }).then((existingUser) => {
        if(existingUser) {
          done(null, existingUser);
        } else {
          new User({ googleId: profile.id })
          .save()
          .then(user => done(null, user));
        }
      })
    }
  )
);

passport.use(new LinkedinStrategy({
  clientID: keys.linkedinClientID,
  clientSecret: keys.linkedinClientSecret,
  callbackURL: '/auth/linkedin/callback'
  }, (accessToken, refreshToken, profile, done) => {
    process.nextTick(function() {
      console.log('access token', accessToken);
      console.log('refresh token', refreshToken);
      console.log('profile', profile);

      return done(null, profile);
    });
  })
);
